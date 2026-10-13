import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Sparkles,
  Play,
  Image,
  Video,
  ChevronRight,
  Heart,
  SlidersHorizontal,
  X,
  RotateCcw,
  Copy,
  Trash2,
  Check,
  Sun,
  Moon,
  Globe,
  Shield,
  Layers,
  Compass,
  Car,
  Camera,
  Building2,
  Palette,
  Leaf,
  Gamepad2,
  Shirt,
  Mountain,
  Clapperboard,
  Mic,
  ShoppingBag,
  Film,
  Radio,
  BookOpen,
  WandSparkles,
  LayoutGrid,
} from "lucide-react";
import { AppProvider, useApp } from "./context";
import {
  Navbar,
  Footer,
  ToolSelector,
  PromptCard,
  TemplateModal,
  SectionHeading,
  ToolLogo,
} from "./components";
import { Generator } from "./Generator";
import {
  templates,
  tools,
  categories,
  categoryName,
  imageUrl,
  imageFallback,
  type Template,
  type ToolId,
} from "./data";
import { languages, type Lang } from "./i18n";
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
function CardSection({
  title,
  subtitle,
  label,
  items,
  link,
}: {
  title: string;
  subtitle: string;
  label?: string;
  items: Template[];
  link: string;
}) {
  const [detail, setDetail] = useState<Template | null>(null);
  return (
    <section className="container content-section">
      <SectionHeading
        title={title}
        subtitle={subtitle}
        label={label}
        link={link}
      />
      <div className="prompt-grid">
        {items.map((x) => (
          <PromptCard key={x.id} template={x} onOpen={setDetail} />
        ))}
      </div>
      {detail && (
        <TemplateModal
          key={detail.id}
          template={detail}
          onClose={() => setDetail(null)}
        />
      )}
    </section>
  );
}
const categoryIcons = [
  Camera,
  Car,
  ShoppingBag,
  Shirt,
  Palette,
  Sparkles,
  Building2,
  Leaf,
  Gamepad2,
  Image,
  Clapperboard,
  Car,
  ShoppingBag,
  Mic,
  Mountain,
  Radio,
  WandSparkles,
  BookOpen,
  Film,
  Building2,
];
function Home() {
  const { t, lang } = useApp();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [catType, setCatType] = useState<"image" | "video">("image");
  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="container hero-main">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span>
                <Sparkles size={11} />
              </span>
              {t("newBadge")}
            </div>
            <h1>
              {t("hero1")}
              <br />
              {t("hero2")}
              <br />
              <span>{t("hero3")}</span>
              <span className="headline-spark">✳</span>
            </h1>
            <p>{lang === "uz" ? t("heroUz") : t("heroSub")}</p>
            <form
              className="hero-search"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/discover?q=${encodeURIComponent(query)}`);
              }}
            >
              <Search size={19} />
              <input
                aria-label={t("searchPlaceholder")}
                placeholder={t("searchPlaceholder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" aria-label={t("search")}>
                <ArrowRight size={19} />
              </button>
            </form>
            <div className="hero-buttons">
              <Link to="/discover" className="btn btn-primary">
                {t("explore")}
                <ArrowUpRight size={16} />
              </Link>
              <Link to="/generator" className="btn btn-secondary">
                <Sparkles size={16} />
                {t("create")}
              </Link>
            </div>
            <div className="hero-social">
              <div className="avatar-stack">
                {["portrait", "face", "fashion"].map((p, i) => (
                  <img
                    key={p}
                    src={imageUrl(p as "portrait", 100)}
                    alt=""
                    onError={(e) => imageFallback(e.currentTarget, p as "face")}
                    style={{ zIndex: 3 - i }}
                  />
                ))}
              </div>
              <span>
                <span className="star-line">✦ ✦ ✦ ✦ ✦</span>
                <span>{t("noSignup")}</span>
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-orbit" />
            <div className="hero-preview hero-preview-main">
              <img
                src={imageUrl("car", 1100)}
                alt="A red supercar on a neon-lit Tokyo street"
              />
              <div className="hero-image-shade" />
              <span className="hero-preview-badge">
                <span className="pulse-dot" />
                {t("previewType")}
              </span>
              <div className="hero-preview-caption">
                <span className="small-caps">MIDJOURNEY · GROK</span>
                <h3>{t("artDriven")}</h3>
                <span>
                  <Image size={12} /> {t("imageMode")}
                  <span className="caption-arrow">
                    <ArrowUpRight size={15} />
                  </span>
                </span>
              </div>
            </div>
            <button
              className="hero-preview hero-preview-small"
              onClick={() => navigate("/videos")}
            >
              <img
                src={imageUrl("mountains", 550)}
                alt="Cinematic mountain landscape"
              />
              <span className="mini-play">
                <Play size={14} fill="currentColor" />
              </span>
              <div>
                <span>{t("videoMode")}</span>
                <strong>{t("artBeyond")}</strong>
              </div>
            </button>
            <button
              className="hero-preview hero-preview-portrait"
              onClick={() => navigate("/images?category=portraits")}
            >
              <img
                src={imageUrl("portrait", 450)}
                alt="Editorial portrait in natural light"
              />
              <span className="portrait-label">
                <Sparkles size={12} /> {t("featured")}
              </span>
            </button>
            <div className="floating-prompt">
              <span className="floating-icon">
                <Sparkles size={16} />
              </span>
              <div>
                <strong>{t("ready")}</strong>
                <span>{t("artTailored")}</span>
              </div>
              <Check size={16} />
            </div>
            <div className="art-label">
              <span />
              {t("artImagine")}
            </div>
          </div>
        </div>
        <div className="container hero-stats">
          {[
            ["1,200+", t("templatesStat")],
            ["20+", t("categoriesStat")],
            ["8+", t("toolsStat")],
            ["100%", t("freeStat")],
          ].map(([number, label]) => (
            <div key={label}>
              <strong>{number}</strong>
              <span>{label}</span>
            </div>
          ))}
          <small title={t("demoStats")}>* {t("demoStats")}</small>
        </div>
      </section>
      <section className="container tools-section">
        <div className="center-heading">
          <span className="eyebrow">{t("worksWith")}</span>
          <h2>{t("toolsHeading")}</h2>
          <p>{t("toolsSub")}</p>
        </div>
        <ToolSelector compact />
        <p className="tool-disclaimer">{t("unofficial")}</p>
      </section>
      <section className="container generator-section">
        <SectionHeading
          label={t("playground")}
          title={t("generatorTitle")}
          subtitle={t("generatorSub")}
        />
        <Generator preview />
      </section>
      <CardSection
        label={t("trendingLabel")}
        title={t("trending")}
        subtitle={t("trendingSub")}
        items={templates.slice(0, 4)}
        link="/discover?sort=popular"
      />
      <section className="category-section">
        <div className="container">
          <SectionHeading
            label={t("categoryLabel")}
            title={t("categoryHeading")}
            subtitle={t("categorySub")}
          />
          <div className="category-tabs">
            <button
              className={catType === "image" ? "active" : ""}
              onClick={() => setCatType("image")}
            >
              <Image size={14} />
              {t("images")}
            </button>
            <button
              className={catType === "video" ? "active" : ""}
              onClick={() => setCatType("video")}
            >
              <Video size={14} />
              {t("videos")}
            </button>
          </div>
          <div className="category-grid">
            {categories
              .filter((c) => c[4] === catType)
              .map((c) => {
                const Icon = categoryIcons[categories.indexOf(c)];
                return (
                  <Link
                    key={c[0]}
                    to={`/${catType === "image" ? "images" : "videos"}?category=${c[0]}`}
                    className="category-card"
                  >
                    <span className="category-icon">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <span>
                      {categoryName(c[0], lang)}
                      <small>
                        {templates.filter((x) => x.category === c[0]).length}{" "}
                        {t("results")}
                      </small>
                    </span>
                    <ArrowUpRight size={14} />
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
      <CardSection
        title={t("popularVideos")}
        subtitle={t("popularVideosSub")}
        label={t("videos").toUpperCase()}
        items={templates.filter((x) => x.type === "video").slice(4, 8)}
        link="/videos"
      />
      <CardSection
        title={t("popularImages")}
        subtitle={t("popularImagesSub")}
        label={t("images").toUpperCase()}
        items={templates.filter((x) => x.type === "image").slice(4, 8)}
        link="/images"
      />
      <section className="container how-section">
        <div className="center-heading">
          <span className="eyebrow">{t("howLabel")}</span>
          <h2>{t("howTitle")}</h2>
        </div>
        <div className="how-grid">
          {[
            [Compass, "step1", "step1Sub"],
            [SlidersHorizontal, "step2", "step2Sub"],
            [Copy, "step3", "step3Sub"],
          ].map(([Icon, title, desc], i) => {
            const I = Icon as typeof Compass;
            return (
              <div className="how-card" key={i}>
                <span className="step-number">0{i + 1}</span>
                <div className="how-icon">
                  <I size={24} />
                </div>
                <h3>{t(title as "step1")}</h3>
                <p>{t(desc as "step1Sub")}</p>
                {i < 2 && <ArrowRight className="step-arrow" size={20} />}
              </div>
            );
          })}
        </div>
      </section>
      <section className="container cta-section">
        <div className="cta-glow" />
        <span className="cta-spark">
          <Sparkles size={24} />
        </span>
        <h2>{t("ctaTitle")}</h2>
        <p>{t("ctaSub")}</p>
        <Link to="/generator" className="btn btn-primary">
          {t("ctaButton")}
          <ArrowUpRight size={17} />
        </Link>
        <small>{t("noSignup")}</small>
      </section>
    </>
  );
}
function Library({
  mode = "all",
  isFavorites = false,
}: {
  mode?: "all" | "image" | "video";
  isFavorites?: boolean;
}) {
  const { t, lang, favorites, saved, removeSaved, copy } = useApp();
  const [params, setParams] = useSearchParams();
  const [detail, setDetail] = useState<Template | null>(null);
  const [mobileFilters, setMobileFilters] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const query = params.get("q") || "";
  const type = mode === "all" ? params.get("type") || "all" : mode;
  const category = params.get("category") || "all";
  const tool = params.get("tool") || "all";
  const sort = params.get("sort") || "popular";
  const setFilter = (key: string, value: string) => {
    const p = new URLSearchParams(params);
    if (value === "all" || !value) p.delete(key);
    else p.set(key, value);
    if (key === "type") p.delete("category");
    setParams(p, { replace: true });
  };
  useEffect(() => {
    if (params.get("focus") === "search") searchRef.current?.focus();
  }, [params]);
  const result = templates
    .filter(
      (x) =>
        (!isFavorites || favorites.includes(x.id)) &&
        (type === "all" || type === x.type) &&
        (category === "all" || x.category === category) &&
        (tool === "all" || x.tools.includes(tool as ToolId)) &&
        `${x.title} ${x.description} ${categoryName(x.category, lang)}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "az"
        ? a.title.localeCompare(b.title)
        : sort === "newest"
          ? b.created - a.created
          : b.popularity - a.popularity,
    );
  const savedResults = isFavorites
    ? saved
        .filter(
          (x) =>
            (type === "all" || type === x.type) &&
            `${x.title} ${x.prompt}`
              .toLowerCase()
              .includes(query.toLowerCase()) &&
            category === "all" &&
            tool === "all",
        )
        .sort((a, b) =>
          sort === "az"
            ? a.title.localeCompare(b.title)
            : b.created - a.created,
        )
    : [];
  const title = isFavorites
    ? t("favoritesTitle")
    : mode === "image"
      ? t("imageLibrary")
      : mode === "video"
        ? t("videoLibrary")
        : t("libraryTitle");
  return (
    <main className="container library-page">
      <div className="page-heading">
        <span className="eyebrow">
          <Sparkles size={12} />
          {t(
            isFavorites
              ? "favorites"
              : mode === "image"
                ? "images"
                : mode === "video"
                  ? "videos"
                  : "discover",
          )}
        </span>
        <h1>{title}</h1>
        <p>{t(isFavorites ? "favoritesSub" : "librarySub")}</p>
      </div>
      <div className="library-toolbar">
        <div className="library-search">
          <Search size={18} />
          <input
            ref={searchRef}
            aria-label={t("search")}
            placeholder={t(isFavorites ? "favoritesSearch" : "librarySearch")}
            value={query}
            onChange={(e) => setFilter("q", e.target.value)}
          />
          {query && (
            <button
              className="icon-btn"
              aria-label={t("clear")}
              onClick={() => setFilter("q", "")}
            >
              <X size={15} />
            </button>
          )}
        </div>
        <button
          className="btn btn-secondary mobile-filter-button"
          onClick={() => setMobileFilters(!mobileFilters)}
        >
          <SlidersHorizontal size={17} />
          {t("filters")}
        </button>
        <label className="sort-label">
          <span>{t("sort")}</span>
          <select
            value={sort}
            onChange={(e) => setFilter("sort", e.target.value)}
          >
            <option value="popular">{t("popular")}</option>
            <option value="newest">{t("newest")}</option>
            <option value="az">{t("az")}</option>
          </select>
        </label>
      </div>
      <div className="library-layout">
        <aside className={`filter-sidebar ${mobileFilters ? "open" : ""}`}>
          <div className="filter-title">
            <h3>
              <SlidersHorizontal size={15} />
              {t("filters")}
            </h3>
            <button
              title={t("reset")}
              aria-label={t("reset")}
              onClick={() => setParams({})}
            >
              <RotateCcw size={14} />
            </button>
          </div>
          {mode === "all" && (
            <div className="filter-group">
              <h4>{t("contentType")}</h4>
              {(["all", "image", "video"] as const).map((v) => (
                <button
                  key={v}
                  className={type === v ? "active" : ""}
                  onClick={() => setFilter("type", v)}
                >
                  {v === "all" ? (
                    <LayoutGrid size={14} />
                  ) : v === "image" ? (
                    <Image size={14} />
                  ) : (
                    <Video size={14} />
                  )}{" "}
                  {t(v === "all" ? "all" : v)}
                  <span>
                    {v === "all"
                      ? templates.length
                      : templates.filter((x) => x.type === v).length}
                  </span>
                </button>
              ))}
            </div>
          )}
          <div className="filter-group">
            <h4>{t("categories")}</h4>
            <button
              className={category === "all" ? "active" : ""}
              onClick={() => setFilter("category", "all")}
            >
              {t("all")}
            </button>
            {categories
              .filter((c) => type === "all" || c[4] === type)
              .map((c) => (
                <button
                  key={c[0]}
                  className={category === c[0] ? "active" : ""}
                  onClick={() => setFilter("category", c[0])}
                >
                  {categoryName(c[0], lang)}
                </button>
              ))}
          </div>
          <div className="filter-group">
            <h4>{t("tool")}</h4>
            <button
              className={tool === "all" ? "active" : ""}
              onClick={() => setFilter("tool", "all")}
            >
              {t("allTools")}
            </button>
            {tools
              .filter(
                (x) => type === "all" || x.types.includes(type as "image"),
              )
              .map((x) => (
                <button
                  key={x.id}
                  className={tool === x.id ? "active" : ""}
                  onClick={() => setFilter("tool", x.id)}
                >
                  <span className="filter-radio">
                    {tool === x.id && <span />}
                  </span>
                  {x.id === "other" ? t("otherTools") : x.name}
                </button>
              ))}
          </div>
          <button
            className="text-button reset-filters"
            onClick={() => setParams({})}
          >
            <RotateCcw size={13} />
            {t("reset")}
          </button>
        </aside>
        <div className="library-results">
          <div className="results-heading">
            <span>
              <strong>{result.length + savedResults.length}</strong>{" "}
              {t("results")}
            </span>
            <div className="active-filters">
              {category !== "all" && (
                <button onClick={() => setFilter("category", "all")}>
                  {categoryName(category, lang)}
                  <X size={11} />
                </button>
              )}
              {tool !== "all" && (
                <button onClick={() => setFilter("tool", "all")}>
                  {tools.find((x) => x.id === tool)?.name}
                  <X size={11} />
                </button>
              )}
            </div>
          </div>
          {result.length + savedResults.length === 0 ? (
            <div className="empty-state">
              <span>
                {isFavorites ? <Heart size={32} /> : <Search size={32} />}
              </span>
              <h2>
                {t(
                  isFavorites && !favorites.length && !saved.length
                    ? "noFavorites"
                    : "noResults",
                )}
              </h2>
              <p>
                {t(
                  isFavorites && !favorites.length && !saved.length
                    ? "noFavoritesSub"
                    : "noResultsSub",
                )}
              </p>
              {isFavorites && !favorites.length && !saved.length ? (
                <Link className="btn btn-primary" to="/discover">
                  {t("explore")}
                  <ArrowRight size={15} />
                </Link>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setParams({})}
                >
                  {t("reset")}
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="prompt-grid library-grid">
                {result.map((x) => (
                  <PromptCard key={x.id} template={x} onOpen={setDetail} />
                ))}
              </div>
              {savedResults.length > 0 && (
                <section className="saved-section">
                  <h2>{t("savedPrompts")}</h2>
                  <div className="saved-grid">
                    {savedResults.map((x) => (
                      <article className="saved-prompt" key={x.id}>
                        <div>
                          <Sparkles size={17} />
                          <span className="media-badge">{t(x.type)}</span>
                          <button
                            className="icon-btn"
                            title={t("remove")}
                            aria-label={t("remove")}
                            onClick={() => removeSaved(x.id)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <h3>{x.title}</h3>
                        <textarea
                          aria-label={t("prompt")}
                          defaultValue={x.prompt}
                          readOnly
                        />
                        <button
                          className="btn btn-secondary"
                          onClick={() => copy(x.prompt)}
                        >
                          <Copy size={14} />
                          {t("copy")}
                        </button>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
      {detail && (
        <TemplateModal
          key={detail.id}
          template={detail}
          onClose={() => setDetail(null)}
        />
      )}
    </main>
  );
}
function GeneratorPage() {
  const { t } = useApp();
  return (
    <main className="container generator-page">
      <div className="page-heading">
        <span className="eyebrow">
          <Sparkles size={12} />
          {t("playground")}
        </span>
        <h1>{t("generatorTitle")}</h1>
        <p>{t("generatorSub")}</p>
      </div>
      <Generator />
      <p className="tool-disclaimer">{t("unofficial")}</p>
    </main>
  );
}
function ToolsPage() {
  const { t } = useApp();
  return (
    <main className="container tools-page">
      <div className="page-heading">
        <span className="eyebrow">{t("tools")}</span>
        <h1>{t("toolPageTitle")}</h1>
        <p>{t("toolPageSub")}</p>
      </div>
      <ToolSelector />
      <div className="tool-tip-grid">
        {tools.map((x) => (
          <article key={x.id}>
            <div>
              <ToolLogo id={x.id} />
              <h3>{x.id === "other" ? t("otherTools") : x.name}</h3>
            </div>
            <span className="eyebrow">{t("tips")}</span>
            <p>
              {t(
                (
                  {
                    flow: "tipsFlow",
                    grok: "tipsGrok",
                    sora: "tipsSora",
                    veo: "tipsVeo",
                    midjourney: "tipsMidjourney",
                    other: "tipsOther",
                  } as const
                )[x.id],
              )}
            </p>
            <Link to={`/discover?tool=${x.id}`}>
              {t("explore")}
              <ArrowUpRight size={14} />
            </Link>
          </article>
        ))}
      </div>
      <p className="tool-disclaimer">{t("unofficial")}</p>
    </main>
  );
}
function About() {
  const { t } = useApp();
  return (
    <main className="container info-page">
      <div className="page-heading">
        <span className="eyebrow">{t("about")}</span>
        <h1>{t("aboutTitle")}</h1>
        <p>{t("aboutSub")}</p>
      </div>
      <div className="about-panel">
        <div className="about-visual">
          <Sparkles size={72} strokeWidth={1} />
          <span>{t("aboutVisual")}</span>
        </div>
        <div>
          <h2>Promptora AI</h2>
          <p>{t("aboutBody")}</p>
          <p className="about-note">
            <Shield size={20} />
            {t("aboutNote")}
          </p>
          <Link to="/generator" className="btn btn-primary">
            {t("start")}
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  );
}
function SettingsPage() {
  const { t, lang, setLang, theme, setTheme, resetFavorites } = useApp();
  return (
    <main className="container info-page">
      <div className="page-heading">
        <span className="eyebrow">{t("settings")}</span>
        <h1>{t("settingsTitle")}</h1>
        <p>{t("settingsSub")}</p>
      </div>
      <div className="settings-panel">
        <section>
          <div className="setting-heading">
            <Globe size={20} />
            <h3>{t("interfaceLanguage")}</h3>
          </div>
          <div className="setting-options">
            {languages.map((l) => (
              <button
                key={l.id}
                className={l.id === lang ? "active" : ""}
                onClick={() => setLang(l.id as Lang)}
              >
                {l.name}
                {l.id === lang && <Check size={16} />}
              </button>
            ))}
          </div>
        </section>
        <section>
          <div className="setting-heading">
            <Sun size={20} />
            <h3>{t("theme")}</h3>
          </div>
          <div className="setting-options">
            {["dark", "light"].map((x) => (
              <button
                key={x}
                className={theme === x ? "active" : ""}
                onClick={() => setTheme(x)}
              >
                {x === "dark" ? <Moon size={16} /> : <Sun size={16} />}{" "}
                {t(x as "dark")}
                {theme === x && <Check size={16} />}
              </button>
            ))}
          </div>
        </section>
        <section>
          <div className="setting-heading">
            <Shield size={20} />
            <h3>{t("localData")}</h3>
          </div>
          <p>{t("localDataSub")}</p>
          <button
            className="btn btn-secondary danger"
            onClick={() => {
              if (window.confirm(t("confirmReset"))) resetFavorites();
            }}
          >
            <Trash2 size={15} />
            {t("resetData")}
          </button>
        </section>
      </div>
    </main>
  );
}
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollReset />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Library />} />
          <Route path="/images" element={<Library mode="image" />} />
          <Route path="/videos" element={<Library mode="video" />} />
          <Route path="/favorites" element={<Library isFavorites />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Library />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}
