import { translateDemoText } from "./translations";
import { type Lang } from "./i18n";
import { type MediaType, type ToolId, type Template, optionName } from "./data";
export interface FormState {
  type: MediaType;
  tool: ToolId;
  idea: string;
  subject: string;
  scene: string;
  style: string;
  mood: string;
  lighting: string;
  camera: string;
  quality: string;
  language: Lang;
  additional: string;
  colors: string;
  action: string;
  duration: string;
  aspect: string;
  movement: string;
  motion: string;
  transitions: string;
  dialogue: string;
  audio: string;
  negative: boolean;
}
export const initialForm: FormState = {
  type: "image",
  tool: "midjourney",
  idea: "",
  subject: "",
  scene: "",
  style: "Cinematic",
  mood: "Dramatic",
  lighting: "Golden hour",
  camera: "Eye level",
  quality: "Ultra HD",
  language: "en",
  additional: "",
  colors: "",
  action: "",
  duration: "10",
  aspect: "16:9",
  movement: "Tracking shot",
  motion: "Moderate",
  transitions: "Continuous shot",
  dialogue: "",
  audio: "",
  negative: true,
};
export const fromTemplate = (t: Template): FormState => ({
  ...initialForm,
  type: t.type,
  tool: t.tools[0],
  idea: t.description,
  subject: t.subject,
  scene: t.scene,
  style: t.style,
  lighting: t.lighting,
  camera: t.camera,
  aspect: t.aspect,
  duration: t.duration,
  action: t.action,
});
export function assemble(f: FormState, variant = 0): string {
  const l = f.language;
  const val = (v: string) => optionName(v, l);
  const sub = translateDemoText(f.subject.trim() || f.idea.trim(), l);
  const scene = translateDemoText(f.scene.trim(), l);
  const negative = {
    en: "Negative prompt: blurry, low-resolution, distorted anatomy, warped objects, artifacts, watermark, logos, unwanted text.",
    uz: "Salbiy prompt: xira, past sifat, buzilgan anatomiya, deformatsiya, artefaktlar, suv belgisi, logotip va keraksiz matn.",
    ru: "Негативный промпт: размытие, низкое разрешение, искажённая анатомия, деформированные объекты, артефакты, водяные знаки, логотипы, лишний текст.",
  }[l];
  const sceneDefault = {
    en: "a carefully composed environment with atmospheric depth",
    uz: "atmosferik chuqurlikka ega, puxta tuzilgan muhit",
    ru: "продуманное окружение с атмосферной глубиной",
  }[l];
  const environment = scene || sceneDefault;
  const variation = [
    [
      "Use balanced composition, a clear focal point and subtle film grain.",
      "Muvozanatli kompozitsiya, aniq fokus va nozik kino donadorligidan foydalaning.",
      "Сбалансированная композиция, чёткий фокус и лёгкое плёночное зерно.",
    ],
    [
      "Use layered depth, elegant negative space and a refined complementary color palette.",
      "Ko‘p qatlamli chuqurlik, nafis bo‘sh joy va uyg‘un ranglar palitrasidan foydalaning.",
      "Многослойная глубина, элегантное свободное пространство и согласованная палитра.",
    ],
    [
      "Use a striking composition, rich texture and natural, carefully controlled contrast.",
      "Ta’sirli kompozitsiya, boy tekstura va tabiiy kontrastdan foydalaning.",
      "Выразительная композиция, богатые текстуры и контролируемый естественный контраст.",
    ],
  ][variant % 3][{ en: 0, uz: 1, ru: 2 }[l]];
  let text = "";
  if (f.type === "image") {
    const parts = {
      en: [
        `Create a ${val(f.style).toLowerCase()} image of ${sub}, set in ${environment}.`,
        f.idea && f.subject ? `Creative direction: ${f.idea}.` : "",
        `Mood: ${val(f.mood)}. Lighting: ${val(f.lighting)}, with carefully shaped highlights and soft, realistic shadows.`,
        `Camera: ${val(f.camera)}. Quality: ${val(f.quality)}, fine surface textures, precise focus and realistic proportions.`,
        f.colors ? `Color palette: ${f.colors}.` : "",
        variation,
        `Aspect ratio: ${f.aspect}.`,
        f.additional ? `Additional direction: ${f.additional}` : "",
      ],
      uz: [
        `${environment} muhitida ${sub} tasvirini ${val(f.style)} uslubida yarating.`,
        f.idea && f.subject ? `Ijodiy yo‘nalish: ${f.idea}.` : "",
        `Kayfiyat: ${val(f.mood)}. Yoritish: ${val(f.lighting)}, puxta shakllangan yorug‘lik va yumshoq, realistik soyalar.`,
        `Kamera: ${val(f.camera)}. Sifat: ${val(f.quality)}, aniq teksturalar, tiniq fokus va tabiiy nisbatlar.`,
        f.colors ? `Ranglar palitrasi: ${f.colors}.` : "",
        variation,
        `Tomonlar nisbati: ${f.aspect}.`,
        f.additional ? `Qo‘shimcha yo‘nalish: ${f.additional}` : "",
      ],
      ru: [
        `Создайте изображение ${sub} в окружении: ${environment}. Стиль: ${val(f.style)}.`,
        f.idea && f.subject ? `Творческое направление: ${f.idea}.` : "",
        `Настроение: ${val(f.mood)}. Освещение: ${val(f.lighting)}, точные блики и мягкие реалистичные тени.`,
        `Камера: ${val(f.camera)}. Качество: ${val(f.quality)}, тонкие текстуры, чёткий фокус и естественные пропорции.`,
        f.colors ? `Палитра: ${f.colors}.` : "",
        variation,
        `Соотношение сторон: ${f.aspect}.`,
        f.additional ? `Дополнительные указания: ${f.additional}` : "",
      ],
    }[l];
    text = parts.filter(Boolean).join("\n\n");
    if (f.negative) text += "\n\n" + negative;
    if (f.tool === "midjourney") text += `\n\n--ar ${f.aspect}`;
  } else {
    const labels = {
      en: [
        "Scene description",
        "Main subject",
        "Subject action",
        "Camera movement",
        "Lighting",
        "Environment",
        "Visual style",
        "Audio and dialogue",
        "Duration and aspect ratio",
        "Constraints and consistency requirements",
      ],
      uz: [
        "Sahna tavsifi",
        "Asosiy obyekt",
        "Obyekt harakati",
        "Kamera harakati",
        "Yoritish",
        "Muhit",
        "Vizual uslub",
        "Ovoz va dialog",
        "Davomiylik va tomonlar nisbati",
        "Cheklovlar va izchillik talablari",
      ],
      ru: [
        "Описание сцены",
        "Главный объект",
        "Действие объекта",
        "Движение камеры",
        "Освещение",
        "Окружение",
        "Визуальный стиль",
        "Звук и диалог",
        "Длительность и соотношение сторон",
        "Ограничения и согласованность",
      ],
    }[l];
    const defaultAction = {
      en: "Natural, deliberate movement, with consistent identity and proportions.",
      uz: "Tabiiy va maqsadli harakat; ko‘rinish va nisbatlar izchil saqlansin.",
      ru: "Естественные движения с сохранением внешности и пропорций.",
    }[l];
    const values = [
      f.idea || environment,
      sub,
      f.action || defaultAction,
      `${val(f.movement)}; ${val(f.motion)}. ${val(f.transitions)}.`,
      `${val(f.lighting)}; ${val(f.mood)}.`,
      `${environment}${f.colors ? `; ${f.colors}` : ""}`,
      `${val(f.style)}; ${val(f.quality)}. ${variation}`,
      `${f.audio || { en: "Subtle ambient sound; no background music unless requested", uz: "Yumshoq atrof tovushlari; musiqa faqat so‘ralganda", ru: "Тихие звуки окружения; музыка только по запросу" }[l]}. ${f.dialogue ? `“${f.dialogue}”` : { en: "No dialogue.", uz: "Dialog yo‘q.", ru: "Без диалога." }[l]}`,
      `${f.duration} ${{ en: "seconds", uz: "soniya", ru: "секунд" }[l]}, ${f.aspect}`,
      {
        en: "Keep the same subject, colors and environment across frames. Physically plausible motion, no flicker, no warped objects, no unintended text.",
        uz: "Barcha kadrlarda obyekt, ranglar va muhitni saqlang. Tabiiy harakat, titrash, deformatsiya va keraksiz matnsiz.",
        ru: "Сохраняйте объект, цвета и окружение во всех кадрах. Физически правдоподобное движение, без мерцания, искажений и лишнего текста.",
      }[l] + (f.additional ? ` ${f.additional}` : ""),
    ];
    text = labels.map((x, i) => `${i + 1}. ${x}: ${values[i]}`).join("\n\n");
  }
  const tips: Record<ToolId, Record<Lang, string>> = {
    flow: {
      en: "Flow direction: Build a continuous, coherent scene; keep camera paths and subject actions clear.",
      uz: "Flow yo‘nalishi: izchil sahna yarating; kamera va obyekt harakatlarini aniqlang.",
      ru: "Для Flow: непрерывная согласованная сцена с ясным движением камеры и объекта.",
    },
    grok: {
      en: "Grok direction: Prioritize clear subject details, visual intent and a grounded environment.",
      uz: "Grok yo‘nalishi: obyekt tafsilotlari, vizual niyat va muhitni aniqlang.",
      ru: "Для Grok: чёткие детали объекта, визуальное намерение и окружение.",
    },
    sora: {
      en: "Sora direction: Use a clear temporal sequence and consistent physical relationships.",
      uz: "Sora yo‘nalishi: vaqt ketma-ketligi va fizik munosabatlarni izchil saqlang.",
      ru: "Для Sora: ясная последовательность во времени и стабильные физические отношения.",
    },
    veo: {
      en: "Veo direction: Coordinate camera motion with audio timing and the specified dialogue.",
      uz: "Veo yo‘nalishi: kamera harakatini ovoz va dialog bilan uyg‘unlashtiring.",
      ru: "Для Veo: согласуйте движение камеры со звуком и диалогом.",
    },
    midjourney: { en: "", uz: "", ru: "" },
    other: {
      en: "General direction: Preserve the described composition and visual intent.",
      uz: "Umumiy yo‘nalish: kompozitsiya va vizual niyatni saqlang.",
      ru: "Общие указания: сохраните композицию и визуальное намерение.",
    },
  };
  return text + (tips[f.tool][l] ? "\n\n" + tips[f.tool][l] : "");
}
