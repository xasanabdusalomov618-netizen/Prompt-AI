import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Key, type Lang } from "./i18n";
import type { MediaType } from "./data";
export interface SavedPrompt {
  id: string;
  title: string;
  prompt: string;
  type: MediaType;
  created: number;
}
function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
interface AppState {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: string;
  setTheme: (t: string) => void;
  t: (k: Key) => string;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  saved: SavedPrompt[];
  savePrompt: (p: SavedPrompt) => void;
  removeSaved: (id: string) => void;
  resetFavorites: () => void;
  notify: (msg: string, error?: boolean) => void;
  copy: (s: string) => Promise<void>;
}
const Context = createContext<AppState>(null!);
export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const l = load<Lang>("promptora-language", "en");
    return ["en", "uz", "ru"].includes(l) ? l : "en";
  });
  const [theme, setTheme] = useState(() =>
    load<string>("promptora-theme", "dark") === "light" ? "light" : "dark",
  );
  const [favorites, setFavorites] = useState<string[]>(() => {
    const v = load<unknown>("promptora-favorites", []);
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  });
  const [saved, setSaved] = useState<SavedPrompt[]>(() => {
    const v = load<unknown>("promptora-saved", []);
    return Array.isArray(v)
      ? v.filter(
          (x) => x && typeof x.prompt === "string" && typeof x.id === "string",
        )
      : [];
  });
  const [toast, setToast] = useState<{ msg: string; error: boolean } | null>(
    null,
  );
  const t = (k: Key) => dictionaries[lang][k];
  const notify = (msg: string, error = false) => setToast({ msg, error });
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("promptora-language", JSON.stringify(lang));
    } catch {
      notify(t("storageError"), true);
    }
  }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("promptora-theme", JSON.stringify(theme));
    } catch {}
  }, [theme]);
  useEffect(() => {
    try {
      localStorage.setItem("promptora-favorites", JSON.stringify(favorites));
      localStorage.setItem("promptora-saved", JSON.stringify(saved));
    } catch {
      notify(t("favoritesError"), true);
    }
  }, [favorites, saved]);
  const toggleFavorite = (id: string) => {
    const exists = favorites.includes(id);
    setFavorites((prev) =>
      exists ? prev.filter((x) => x !== id) : [...prev, id],
    );
    notify(t(exists ? "removedToast" : "savedToast"));
  };
  const copy = async (s: string) => {
    try {
      if (!s.trim()) return;
      await navigator.clipboard.writeText(s);
      notify(t("copySuccess"));
    } catch {
      notify(t("copyError"), true);
    }
  };
  return (
    <Context.Provider
      value={{
        lang,
        setLang,
        theme,
        setTheme,
        t,
        favorites,
        toggleFavorite,
        saved,
        savePrompt: (p) => {
          setSaved((prev) => [p, ...prev]);
          notify(t("savedToast"));
        },
        removeSaved: (id) => {
          setSaved((prev) => prev.filter((x) => x.id !== id));
          notify(t("removedToast"));
        },
        resetFavorites: () => {
          setFavorites([]);
          setSaved([]);
          notify(t("resetSuccess"));
        },
        notify,
        copy,
      }}
    >
      {children}
      {toast && (
        <div className={`toast ${toast.error ? "error" : ""}`} role="status">
          <span>{toast.error ? "!" : "✓"}</span>
          {toast.msg}
          <button onClick={() => setToast(null)} aria-label={t("close")}>
            ×
          </button>
        </div>
      )}
    </Context.Provider>
  );
}
export const useApp = () => useContext(Context);
