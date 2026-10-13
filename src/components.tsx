import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Heart,
  Copy,
  X,
  Menu,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Sparkles,
  Image,
  Video,
  Check,
  Settings,
  Play,
  SlidersHorizontal,
  ExternalLink,
} from "lucide-react";
import { useApp } from "./context";
import { languages } from "./i18n";
import {
  tools,
  imageUrl,
  imageFallback,
  categoryName,
  optionName,
  type Template,
  type ToolId,
} from "./data";
export function Logo() {
  return (
    <Link to="/" className="logo">
      <span className="logo-icon">
        <Sparkles size={21} strokeWidth={1.8} />
      </span>
      <span>
        promptora<span className="logo-ai">AI</span>
      </span>
    </Link>
  );
}
export function Navbar() {
  const { t, lang, setLang, theme, setTheme, favorites, saved } = useApp();
  const [menu, setMenu] = useState(false);
  const [locale, setLocale] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setMenu(false);
    setLocale(false);
  }, [location]);
  const nav = [
    ["/discover", "discover"],
    ["/images", "images"],
    ["/videos", "videos"],
    ["/tools", "tools"],
    ["/favorites", "favorites"],
  ] as const;
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Logo />
        <nav className="desktop-nav">
          {nav.map(([url, key]) => (
            <NavLink key={url} to={url}>
              {t(key)}
              {key === "favorites" && favorites.length + saved.length > 0 && (
                <span className="nav-count">
                  {favorites.length + saved.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-btn nav-search"
            aria-label={t("searchNav")}
            onClick={() => navigate("/discover?focus=search")}
          >
            <Search size={18} />
          </button>
          <span className="nav-divider" />
          <div className="locale-wrap">
            <button
              className="locale-button"
              onClick={() => setLocale(!locale)}
              aria-expanded={locale}
            >
              <Globe size={15} />
              {languages.find((l) => l.id === lang)?.short}
              <ChevronDown size={12} />
            </button>
            {locale && (
              <>
                <button
                  className="dropdown-dismiss"
                  aria-label={t("close")}
                  onClick={() => setLocale(false)}
                />
                <div className="locale-menu">
                  {languages.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        setLang(l.id);
                        setLocale(false);
                      }}
                    >
                      {l.name}
                      {l.id === lang && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            className="icon-btn theme-toggle"
            aria-label={t("toggleTheme")}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link className="btn btn-primary nav-create" to="/generator">
            {t("start")}
            <ArrowUpRight size={15} />
          </Link>
          <button
            className="icon-btn mobile-toggle"
            aria-label={t("menu")}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {menu && (
        <nav className="mobile-nav">
          {nav.map(([url, key]) => (
            <NavLink key={url} to={url}>
              {t(key)}
            </NavLink>
          ))}
          <Link to="/generator">
            {t("generator")}
            <Sparkles size={16} />
          </Link>
          <Link to="/settings">
            {t("settings")}
            <Settings size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}
export function ToolLogo({ id }: { id: ToolId }) {
  const tool = tools.find((x) => x.id === id)!;
  return (
    <span className={`tool-logo tool-${id}`} style={{ color: tool.color }}>
      {id === "flow" ? (
        <span className="flow-mark">
          f<span>l</span>ow
        </span>
      ) : id === "midjourney" ? (
        <svg
          width="30"
          height="30"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M20 3v26M18 7L7 26h11V7ZM23 12l10 14H23V12ZM5 30h31l-7 5H13zM4 37c4-2 6 2 10 0s6 2 10 0 6 2 10 0" />
        </svg>
      ) : (
        tool.symbol
      )}
    </span>
  );
}
export function ToolSelector({
  selected,
  onSelect,
  compact = false,
}: {
  selected?: ToolId;
  onSelect?: (id: ToolId) => void;
  compact?: boolean;
}) {
  const { t } = useApp();
  const navigate = useNavigate();
  return (
    <div className={`tool-grid ${compact ? "compact" : ""}`}>
      {tools.map((tool) => (
        <button
          key={tool.id}
          className={`tool-card ${selected === tool.id ? "active" : ""}`}
          onClick={() =>
            onSelect
              ? onSelect(tool.id)
              : navigate(`/generator?tool=${tool.id}`)
          }
        >
          <div className="tool-card-top">
            <ToolLogo id={tool.id} />
            {selected === tool.id && <Check size={14} />}
          </div>
          <strong>{tool.id === "other" ? t("otherTools") : tool.name}</strong>
          <span className="tool-supported">
            {t(tool.types.length === 2 ? "both" : tool.types[0])}
          </span>
          {!compact && (
            <span className="tool-action">
              {t(selected === tool.id ? "selected" : "chooseTool")}
              <ArrowUpRight size={13} />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
export function PromptCard({
  template,
  onOpen,
}: {
  template: Template;
  onOpen: (t: Template) => void;
}) {
  const { t, lang, favorites, toggleFavorite, copy } = useApp();
  const active = favorites.includes(template.id);
  return (
    <article className="prompt-card">
      <div className="card-preview">
        <button
          className="preview-open"
          onClick={() => onOpen(template)}
          aria-label={`${t("viewDetails")}: ${template.title}`}
        >
          <img
            src={imageUrl(template.photo)}
            alt={template.title}
            loading="lazy"
            onError={(e) => imageFallback(e.currentTarget, template.photo)}
          />
          {template.type === "video" && (
            <span className="play-overlay">
              <Play size={20} fill="currentColor" />
            </span>
          )}
        </button>
        <span className={`media-badge ${template.type}`}>
          {template.type === "image" ? (
            <Image size={11} />
          ) : (
            <Video size={11} />
          )}{" "}
          {t(template.type)}
        </span>
        <button
          className={`favorite-btn ${active ? "active" : ""}`}
          aria-label={t(active ? "remove" : "save")}
          aria-pressed={active}
          onClick={() => toggleFavorite(template.id)}
        >
          <Heart size={16} fill={active ? "currentColor" : "none"} />
        </button>
        {template.type === "video" && (
          <span className="duration-badge">0:{template.duration}</span>
        )}
      </div>
      <div className="card-body">
        <span className="card-category">
          {categoryName(template.category, lang)}
        </span>
        <button className="card-title" onClick={() => onOpen(template)}>
          {template.title}
          <ArrowUpRight size={14} />
        </button>
        <p>{template.description}</p>
        <div className="tool-tags">
          {template.tools.slice(0, 3).map((id) => (
            <span key={id}>
              {id === "other"
                ? t("otherTools")
                : tools.find((x) => x.id === id)?.name}
            </span>
          ))}
        </div>
        <div className="card-bottom">
          <button onClick={() => copy(template.prompt)}>
            <Copy size={13} />
            {t("copy")}
          </button>
          <button
            onClick={() => onOpen(template)}
            aria-label={t("viewDetails")}
          >
            <SlidersHorizontal size={14} />
            <span>{t("viewDetails")}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
export function TemplateModal({
  template,
  onClose,
}: {
  template: Template;
  onClose: () => void;
}) {
  const { t, lang, favorites, toggleFavorite, copy } = useApp();
  const [prompt, setPrompt] = useState(template.prompt);
  const [translation, setTranslation] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previous = document.activeElement as HTMLElement;
    modalRef.current?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const elements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button,textarea,a,[tabindex="0"]',
        );
        if (!elements?.length) return;
        const first = elements[0],
          last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", handle);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="template-title"
        tabIndex={-1}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close icon-btn"
          aria-label={t("close")}
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <div className="detail-cover">
          <img
            src={imageUrl(template.photo, 1200)}
            onError={(e) => imageFallback(e.currentTarget, template.photo)}
            alt={template.title}
          />
          <span className="media-badge">
            {template.type === "image" ? (
              <Image size={13} />
            ) : (
              <Video size={13} />
            )}{" "}
            {t(template.type)}
          </span>
          <div className="detail-cover-title">
            <span className="eyebrow">{t("featured")}</span>
            <h2 id="template-title">{template.title}</h2>
          </div>
        </div>
        <div className="detail-content">
          <p className="detail-description">{template.description}</p>
          <div className="detail-meta">
            <div>
              <span>{t("aspect")}</span>
              <strong>{template.aspect}</strong>
            </div>
            <div>
              <span>{t("style")}</span>
              <strong>{optionName(template.style, lang)}</strong>
            </div>
            <div>
              <span>{t("cameraSettings")}</span>
              <strong>{optionName(template.camera, lang)}</strong>
            </div>
            {template.type === "video" && (
              <div>
                <span>{t("duration")}</span>
                <strong>
                  {template.duration} {t("seconds")}
                </strong>
              </div>
            )}
          </div>
          <div className="recommended">
            <span>{t("recommended")}</span>
            <div className="tool-tags">
              {template.tools.map((id) => (
                <button
                  key={id}
                  onClick={() =>
                    navigate(`/generator?template=${template.id}&tool=${id}`)
                  }
                >
                  {id === "other"
                    ? t("otherTools")
                    : tools.find((x) => x.id === id)?.name}
                  <ExternalLink size={10} />
                </button>
              ))}
            </div>
          </div>
          <div className="detail-prompt-header">
            <h3>{t("prompt")}</h3>
            <button
              className="text-button"
              onClick={() => setTranslation(!translation)}
            >
              {t("translation")}
              <ChevronDown size={13} />
            </button>
          </div>
          {translation && (
            <p className="translation-text">{template.uzPrompt}</p>
          )}
          <textarea
            aria-label={t("prompt")}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="detail-prompt"
          />
          <div className="detail-actions">
            <button
              className="btn btn-primary"
              disabled={!prompt.trim()}
              onClick={() => copy(prompt)}
            >
              <Copy size={16} />
              {t("copy")}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate(`/generator?template=${template.id}`)}
            >
              <SlidersHorizontal size={16} />
              {t("customize")}
            </button>
            <button
              className={`btn btn-secondary ${favorites.includes(template.id) ? "is-saved" : ""}`}
              onClick={() => toggleFavorite(template.id)}
            >
              <Heart
                size={16}
                fill={favorites.includes(template.id) ? "currentColor" : "none"}
              />
              {t(favorites.includes(template.id) ? "saved" : "save")}
            </button>
          </div>
          <button className="text-button back-link" onClick={onClose}>
            ← {t("backLibrary")}
          </button>
        </div>
      </div>
    </div>
  );
}
export function SectionHeading({
  label,
  title,
  subtitle,
  link,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  link?: string;
}) {
  const { t } = useApp();
  return (
    <div className="section-heading">
      <div>
        {label && <span className="eyebrow">{label}</span>}
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {link && (
        <Link className="section-link" to={link}>
          {t("viewAll")}
          <ArrowUpRight size={15} />
        </Link>
      )}
    </div>
  );
}
export function Footer() {
  const { t } = useApp();
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Logo />
          <p>{t("footerDesc")}</p>
          <span className="footer-status">
            <i />
            {t("freeStat")}
          </span>
        </div>
        <div className="footer-links">
          <h4>{t("platform")}</h4>
          <Link to="/discover">{t("discover")}</Link>
          <Link to="/generator">{t("generator")}</Link>
          <Link to="/tools">{t("tools")}</Link>
        </div>
        <div className="footer-links">
          <h4>{t("resources")}</h4>
          <Link to="/about">{t("about")}</Link>
          <Link to="/favorites">{t("favorites")}</Link>
          <Link to="/settings">{t("settings")}</Link>
        </div>
        <div className="footer-note">
          <Sparkles size={18} />
          <p>{t("noSignup")}</p>
          <Link to="/generator">
            {t("start")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t("copyright")}</span>
        <span>{t("demo")}</span>
      </div>
    </footer>
  );
}
