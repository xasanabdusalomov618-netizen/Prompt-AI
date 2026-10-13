import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Sparkles,
  Image,
  Video,
  Copy,
  RotateCcw,
  Trash2,
  Heart,
  ArrowUpRight,
  WandSparkles,
  Check,
  ChevronDown,
} from "lucide-react";
import { useApp } from "./context";
import { languages, type Key, type Lang } from "./i18n";
import {
  tools,
  templates,
  optionName,
  imageStyles,
  videoStyles,
  type ToolId,
} from "./data";
import { assemble, initialForm, fromTemplate, type FormState } from "./prompt";
import { ToolLogo } from "./components";
export function Generator({ preview = false }: { preview?: boolean }) {
  const { t, lang, copy, notify, savePrompt, saved } = useApp();
  const [params] = useSearchParams();
  const [form, setForm] = useState<FormState>(initialForm);
  const [output, setOutput] = useState("");
  const [generated, setGenerated] = useState(false);
  const [variant, setVariant] = useState(0);
  const [advanced, setAdvanced] = useState(!preview);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (preview) return;
    const template = templates.find((x) => x.id === params.get("template"));
    const tool = tools.find((x) => x.id === params.get("tool"));
    let f = template ? fromTemplate(template) : { ...initialForm };
    if (tool) {
      f.tool = tool.id;
      if (!tool.types.includes(f.type)) {
        f.type = tool.types[0];
        f.style = f.type === "video" ? videoStyles[0] : imageStyles[0];
      }
    }
    setForm(f);
    setOutput(template ? assemble(f) : "");
    setGenerated(!!template);
    setError(false);
  }, [params, preview]);
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    let next = { ...form, [key]: value };
    if (key === "type") {
      next.style = value === "video" ? videoStyles[0] : imageStyles[0];
      if (!tools.find((x) => x.id === next.tool)?.types.includes(next.type))
        next.tool = next.type === "video" ? "flow" : "midjourney";
    }
    if (key === "tool") {
      const tool = tools.find((x) => x.id === value);
      if (tool && !tool.types.includes(next.type)) {
        next.type = tool.types[0];
        next.style = next.type === "video" ? videoStyles[0] : imageStyles[0];
      }
    }
    setForm(next);
    setError(false);
    if (generated && (next.idea.trim() || next.subject.trim()))
      setOutput(assemble(next, variant));
  };
  const generate = (regen = false) => {
    if (!form.idea.trim() && !form.subject.trim()) {
      setError(true);
      notify(t("validation"), true);
      return;
    }
    const v = regen ? variant + 1 : variant;
    setVariant(v);
    setOutput(assemble(form, v));
    setGenerated(true);
    notify(t("generatedToast"));
  };
  const input = (
    key: keyof FormState,
    label: Key,
    placeholder?: Key,
    full = false,
  ) => (
    <label className={`form-field ${full ? "full" : ""}`}>
      <span>{t(label)}</span>
      <input
        value={String(form[key])}
        placeholder={placeholder ? t(placeholder) : ""}
        onChange={(e) => update(key, e.target.value as never)}
      />
    </label>
  );
  const select = (key: keyof FormState, label: Key, options: string[]) => (
    <label className="form-field">
      <span>{t(label)}</span>
      <div className="select-wrap">
        <select
          value={String(form[key])}
          onChange={(e) => update(key, e.target.value as never)}
        >
          {options.map((v) => (
            <option key={v} value={v}>
              {optionName(v, lang)}
              {key === "duration" ? ` ${t("seconds")}` : ""}
            </option>
          ))}
        </select>
        <ChevronDown size={13} />
      </div>
    </label>
  );
  const tip = (
    {
      flow: "tipsFlow",
      grok: "tipsGrok",
      sora: "tipsSora",
      veo: "tipsVeo",
      midjourney: "tipsMidjourney",
      other: "tipsOther",
    } as const
  )[form.tool];
  const isSaved = saved.some((x) => x.prompt === output);
  return (
    <div className={`generator-panel ${preview ? "generator-preview" : ""}`}>
      <div className="generator-form">
        <div className="mode-switch">
          <button
            className={form.type === "image" ? "active" : ""}
            onClick={() => update("type", "image")}
          >
            <Image size={16} />
            {t("imageMode")}
          </button>
          <button
            className={form.type === "video" ? "active" : ""}
            onClick={() => update("type", "video")}
          >
            <Video size={16} />
            {t("videoMode")}
          </button>
        </div>
        <div className="generator-tool-row">
          <span>{t("tool")}</span>
          <div className="mini-tool-select">
            <ToolLogo id={form.tool} />
            <select
              aria-label={t("tool")}
              value={form.tool}
              onChange={(e) => update("tool", e.target.value as ToolId)}
            >
              {tools.map((tool) => (
                <option key={tool.id} value={tool.id}>
                  {tool.id === "other" ? t("otherTools") : tool.name}
                </option>
              ))}
            </select>
            <ChevronDown size={12} />
          </div>
        </div>
        <label
          className={`form-field full idea-field ${error ? "invalid" : ""}`}
        >
          <span>
            {t("idea")}
            <i>*</i>
          </span>
          <textarea
            value={form.idea}
            onChange={(e) => update("idea", e.target.value)}
            placeholder={t("ideaPlaceholder")}
          />
          {error && <small role="alert">{t("validation")}</small>}
        </label>
        <div className="form-grid">
          {input("subject", "subject", "subjectPlaceholder")}
          {input("scene", "scene", "scenePlaceholder")}
          {select(
            "style",
            "style",
            form.type === "image" ? imageStyles : videoStyles,
          )}
          {select("mood", "mood", [
            "Dramatic",
            "Dreamy",
            "Energetic",
            "Calm",
            "Mysterious",
            "Luxury",
          ])}
          {select("lighting", "lighting", [
            "Golden hour",
            "Neon glow",
            "Studio softbox",
            "Natural daylight",
            "Moonlight",
            "Dramatic rim light",
          ])}
          {select("camera", "camera", [
            "Eye level",
            "Low angle",
            "Bird’s eye view",
            "Close-up",
            "Wide shot",
            "Macro",
          ])}
        </div>
        {preview && (
          <button
            className="advanced-toggle"
            onClick={() => setAdvanced(!advanced)}
          >
            {t("settings")}
            <ChevronDown size={14} className={advanced ? "rotated" : ""} />
          </button>
        )}
        {advanced && (
          <div className="form-grid advanced-fields">
            {select("quality", "quality", [
              "High detail",
              "Ultra HD",
              "Premium editorial",
            ])}
            {select("aspect", "aspect", ["16:9", "9:16", "1:1"])}
            {input("colors", "colors", "colorsPlaceholder", true)}
            {form.type === "video" && (
              <>
                {input("action", "action", "actionPlaceholder", true)}
                {select("duration", "duration", ["5", "10", "15", "30"])}
                {select("movement", "movement", [
                  "Static",
                  "Zoom in",
                  "Zoom out",
                  "Tracking shot",
                  "Drone shot",
                ])}
                {select("motion", "motion", ["Subtle", "Moderate", "Dynamic"])}
                {select("transitions", "transitions", [
                  "Continuous shot",
                  "Smooth dissolve",
                  "Match cut",
                ])}
                {input("dialogue", "dialogue", "dialoguePlaceholder", true)}
                {input("audio", "audio", "audioPlaceholder", true)}
              </>
            )}
            {input("additional", "additional", "additionalPlaceholder", true)}
          </div>
        )}
        <div className="generator-bottom-settings">
          <label className="form-field language-field">
            <span>{t("outputLanguage")}</span>
            <div className="select-wrap">
              <select
                value={form.language}
                onChange={(e) => update("language", e.target.value as Lang)}
              >
                {languages.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} />
            </div>
          </label>
          {form.type === "image" && (
            <label className="checkbox-field" title={t("negativeHelp")}>
              <input
                type="checkbox"
                checked={form.negative}
                onChange={(e) => update("negative", e.target.checked)}
              />
              <span>{t("negative")}</span>
            </label>
          )}
        </div>
        <button
          className="btn btn-primary generate-button"
          onClick={() => generate()}
        >
          <Sparkles size={17} />
          {t("generate")}
          <ArrowUpRight size={17} />
        </button>
      </div>
      <div className={`generator-output ${output ? "has-output" : ""}`}>
        <div className="output-header">
          <span>
            <WandSparkles size={16} />
            {t("output")}
          </span>
          <span className="live-badge">
            <i />
            {output ? t("ready") : t("preview")}
          </span>
        </div>
        {output ? (
          <textarea
            className="output-text"
            aria-label={t("output")}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
        ) : (
          <div className="output-empty">
            <div className="output-orb">
              <Sparkles size={34} strokeWidth={1.3} />
            </div>
            <h3>{t("outputEmpty")}</h3>
            <p>{t("outputHint")}</p>
            <div className="empty-decoration">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
        <div className="output-footer">
          <div className="tool-tip">
            <Sparkles size={14} />
            <p>
              <strong>{t("tips")}: </strong>
              {t(tip)}
            </p>
          </div>
          <div className="output-actions">
            <button
              className="btn btn-primary"
              disabled={!output.trim()}
              onClick={() => copy(output)}
            >
              <Copy size={15} />
              {t("copy")}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => generate(true)}
              title={t("regenerate")}
            >
              <RotateCcw size={14} />
              <span>{t("regenerate")}</span>
            </button>
            <button
              className="icon-btn border-btn"
              disabled={!output && !form.idea && !form.subject}
              title={t("clear")}
              aria-label={t("clear")}
              onClick={() => {
                setOutput("");
                setGenerated(false);
                setForm(initialForm);
                setVariant(0);
                setError(false);
                notify(t("clearedToast"));
              }}
            >
              <Trash2 size={15} />
            </button>
          </div>
          <button
            className="save-output"
            disabled={!output.trim() || isSaved}
            onClick={() =>
              savePrompt({
                id: crypto.randomUUID(),
                title: form.subject || form.idea.slice(0, 65),
                prompt: output,
                type: form.type,
                created: Date.now(),
              })
            }
          >
            {isSaved ? <Check size={14} /> : <Heart size={14} />}{" "}
            {t(isSaved ? "saved" : "save")}
          </button>
          <span className="output-caption">{t("editable")}</span>
          {form.language !== "en" && (
            <span className="language-note">{t("freeformNote")}</span>
          )}
        </div>
      </div>
    </div>
  );
}
