import { demoTranslations } from "./translations";
import { type Lang, localized } from "./i18n";
export type MediaType = "image" | "video";
export type ToolId = "flow" | "grok" | "sora" | "veo" | "midjourney" | "other";
export const tools: {
  id: ToolId;
  name: string;
  symbol: string;
  types: MediaType[];
  color: string;
}[] = [
  {
    id: "flow",
    name: "Google Flow",
    symbol: "flow",
    types: ["video"],
    color: "#6dadfa",
  },
  {
    id: "grok",
    name: "Grok",
    symbol: "𝕏",
    types: ["image", "video"],
    color: "#e6e7ee",
  },
  { id: "sora", name: "Sora", symbol: "◌", types: ["video"], color: "#e7e7ee" },
  { id: "veo", name: "Veo", symbol: "✧", types: ["video"], color: "#84c8ac" },
  {
    id: "midjourney",
    name: "Midjourney",
    symbol: "⛵",
    types: ["image"],
    color: "#bba4f9",
  },
  {
    id: "other",
    name: "Other AI Tools",
    symbol: "✳",
    types: ["image", "video"],
    color: "#939bb2",
  },
];
export const categories = [
  [
    "portraits",
    "Cinematic Portraits",
    "Kinematik portretlar",
    "Кинопортреты",
    "image",
  ],
  [
    "cars",
    "Luxury Cars",
    "Hashamatli avtomobillar",
    "Люкс-автомобили",
    "image",
  ],
  [
    "products",
    "Product Photography",
    "Mahsulot fotosuratlari",
    "Предметная фотография",
    "image",
  ],
  ["fashion", "Fashion", "Moda", "Мода", "image"],
  ["anime", "Anime", "Anime", "Аниме", "image"],
  ["fantasy", "Fantasy", "Fantaziya", "Фэнтези", "image"],
  ["architecture", "Architecture", "Arxitektura", "Архитектура", "image"],
  ["nature", "Nature", "Tabiat", "Природа", "image"],
  ["gaming", "Gaming", "O‘yinlar", "Игры", "image"],
  [
    "social",
    "Social Media Thumbnails",
    "Ijtimoiy tarmoq muqovalari",
    "Обложки соцсетей",
    "image",
  ],
  [
    "cinematic",
    "Cinematic Videos",
    "Kinematik videolar",
    "Кинематографическое видео",
    "video",
  ],
  [
    "car-ads",
    "Car Commercials",
    "Avtomobil reklamalari",
    "Реклама автомобилей",
    "video",
  ],
  [
    "product-ads",
    "Product Ads",
    "Mahsulot reklamalari",
    "Реклама продуктов",
    "video",
  ],
  [
    "characters",
    "Talking Characters",
    "Gapiruvchi personajlar",
    "Говорящие персонажи",
    "video",
  ],
  [
    "travel",
    "Travel Videos",
    "Sayohat videolari",
    "Видео о путешествиях",
    "video",
  ],
  [
    "shorts",
    "Viral Shorts",
    "Viral qisqa videolar",
    "Вирусные ролики",
    "video",
  ],
  [
    "transformation",
    "Transformation Videos",
    "O‘zgarish videolari",
    "Видео-трансформации",
    "video",
  ],
  ["story", "Storytelling", "Hikoyalar", "Истории", "video"],
  ["fashion-film", "Fashion Films", "Moda filmlari", "Модные фильмы", "video"],
  [
    "cities",
    "Futuristic Cities",
    "Kelajak shaharlari",
    "Города будущего",
    "video",
  ],
] as const;
export const categoryName = (id: string, lang: Lang) => {
  const c = categories.find((x) => x[0] === id);
  return c ? localized([c[1], c[2], c[3]], lang) : id;
};
export const photos = {
  car: "photo-1503376780353-7e6692767b70",
  neon: "photo-1519608487953-e999c86e7455",
  portrait: "photo-1534528741775-53994a69daeb",
  perfume: "photo-1541643600914-78b084683601",
  watch: "photo-1524805444758-089113d48a6d",
  forest: "photo-1448375240586-882707db888b",
  city: "photo-1519501025264-65ba15a82390",
  hotel: "photo-1566073771259-6a8506099945",
  mountains: "photo-1464822759023-fed622ff2c3b",
  fashion: "photo-1483985988355-763728e1935b",
  building: "photo-1487958449943-2429e8be8625",
  space: "photo-1446776811953-b23d57bd21aa",
  ocean: "photo-1518837695005-2083093ee35b",
  sneakers: "photo-1542291026-7eec264c27ff",
  desert: "photo-1509316785289-025f5b846b35",
  japan: "photo-1513407030348-c983a97b98d8",
  coffee: "photo-1447933601403-0c6688de566e",
  face: "photo-1506794778202-cad84cf45f1d",
  flowers: "photo-1490750967868-88aa4486c946",
  game: "photo-1542751371-adc38448a05e",
  interior: "photo-1600210492486-724fe5c67fb0",
  aurora: "photo-1531366936337-7c912a4589a7",
  food: "photo-1546069901-ba9599a7e63c",
  road: "photo-1500534623283-312aade485b7",
};
export const localPreviews: Partial<Record<keyof typeof photos, string>> = {
  car: "neon-car",
  portrait: "neon-portrait",
  forest: "fantasy-forest",
  perfume: "perfume",
  mountains: "mountains",
  city: "future-city",
  watch: "watch",
  hotel: "hotel",
  fashion: "fashion",
  building: "architecture",
};
export const imageUrl = (key: keyof typeof photos, width = 700) =>
  localPreviews[key]
    ? `/previews/${localPreviews[key]}.jpg`
    : `https://images.unsplash.com/${photos[key]}?auto=format&fit=crop&w=${width}&q=85`;
export const imageFallback = (
  image: HTMLImageElement,
  photo: keyof typeof photos,
) => {
  const fallback =
    photo === "face"
      ? "neon-portrait"
      : photo === "japan" || photo === "space" || photo === "game"
        ? "future-city"
        : photo === "interior"
          ? "architecture"
          : photo === "coffee" || photo === "food" || photo === "sneakers"
            ? "perfume"
            : photo === "flowers"
              ? "fantasy-forest"
              : "mountains";
  if (!image.src.endsWith(`/previews/${fallback}.jpg`))
    image.src = `/previews/${fallback}.jpg`;
};
export interface Template {
  id: string;
  title: string;
  type: MediaType;
  category: string;
  photo: keyof typeof photos;
  description: string;
  tools: ToolId[];
  subject: string;
  scene: string;
  style: string;
  camera: string;
  lighting: string;
  aspect: string;
  duration: string;
  action: string;
  prompt: string;
  uzPrompt: string;
  popularity: number;
  created: number;
}
const rows: [
  string,
  MediaType,
  string,
  keyof typeof photos,
  string,
  string,
  string,
][] = [
  [
    "Red Supercar in a Neon City",
    "image",
    "cars",
    "car",
    "A bold automotive vision with neon reflections and cinematic detail.",
    "a sculpted red supercar",
    "a rain-soaked Tokyo street at midnight",
  ],
  [
    "Luxury Perfume Commercial",
    "video",
    "product-ads",
    "perfume",
    "A sensory journey of glass, light and liquid gold.",
    "a luxury amber perfume bottle",
    "a dark marble plinth surrounded by drifting gold dust",
  ],
  [
    "Cinematic Portrait in Tokyo",
    "image",
    "portraits",
    "portrait",
    "Soft neon, quiet confidence. A portrait with a story.",
    "a stylish young woman in a black coat",
    "a neon-lit Tokyo alley with beautifully diffused bokeh",
  ],
  [
    "Magical Fantasy Forest",
    "image",
    "fantasy",
    "forest",
    "Step into an enchanted world of emerald light.",
    "an ancient enchanted forest with luminous fireflies",
    "a moss-covered woodland with towering trees and a hidden stream",
  ],
  [
    "Futuristic Tashkent in 2050",
    "video",
    "cities",
    "city",
    "A breathtaking reimagining of a city looking forward.",
    "the skyline of Tashkent in 2050 with futuristic architecture",
    "a blue-hour cityscape blending Uzbek tile patterns with glass towers",
  ],
  [
    "Premium Watch Advertisement",
    "video",
    "product-ads",
    "watch",
    "Precision craftsmanship meets cinematic macro detail.",
    "a handcrafted silver mechanical watch",
    "a black velvet studio with delicate floating particles",
  ],
  [
    "Luxury Hotel Drone Shot",
    "video",
    "travel",
    "hotel",
    "An elegant aerial reveal of a dream destination.",
    "an oceanfront luxury resort",
    "a tropical coast at golden hour with infinity pools",
  ],
  [
    "Dramatic Mountain Travel Film",
    "video",
    "travel",
    "mountains",
    "Epic scale, quiet wonder, and a path beyond the ordinary.",
    "a lone explorer in a rust-orange jacket",
    "a dramatic alpine ridge above low rolling clouds",
  ],
  [
    "Futuristic Electric Car Reveal",
    "video",
    "car-ads",
    "car",
    "A clean, powerful reveal of tomorrow’s mobility.",
    "a futuristic matte-silver electric coupe",
    "a minimalist studio with blue light strips and reflective flooring",
  ],
  [
    "Cinematic Damas Commercial",
    "video",
    "car-ads",
    "road",
    "An iconic local vehicle on an extraordinary journey.",
    "a clean white Damas microvan",
    "a winding Uzbek mountain road with rugged sunlit peaks",
  ],
  [
    "Fashion Brand Campaign",
    "image",
    "fashion",
    "fashion",
    "Editorial styling with effortless visual impact.",
    "a model wearing an oversized sculptural cream suit",
    "a warm brutalist courtyard with long geometric shadows",
  ],
  [
    "Sci-Fi City Transformation",
    "video",
    "transformation",
    "city",
    "Watch an ordinary skyline become a futuristic world.",
    "a contemporary city transforming into a futuristic metropolis",
    "an urban boulevard where buildings smoothly evolve into glass towers",
  ],
  [
    "Desert Dreams Editorial",
    "image",
    "fashion",
    "desert",
    "Sculptural silhouettes against a sea of sand.",
    "a fashion model in a flowing terracotta silk dress",
    "vast desert dunes in late afternoon",
  ],
  [
    "Minimalist Architecture Study",
    "image",
    "architecture",
    "building",
    "Quiet geometry, soft light and timeless design.",
    "a minimalist concrete museum with curved walls",
    "a landscaped courtyard with a single olive tree",
  ],
  [
    "Midnight Anime Adventure",
    "image",
    "anime",
    "japan",
    "A hand-painted city full of wonder and possibility.",
    "an adventurous anime character carrying a red umbrella",
    "a richly detailed Japanese shopping street after rain",
  ],
  [
    "Astronaut Beyond the Stars",
    "image",
    "gaming",
    "space",
    "A cinematic sci-fi key visual for an epic adventure.",
    "a lone astronaut with a reflective visor",
    "the edge of an orbital station overlooking Earth",
  ],
  [
    "Emerald Coast at Dawn",
    "image",
    "nature",
    "ocean",
    "Natural textures and an ocean of calm.",
    "a pristine turquoise coastline with dramatic rocks",
    "a remote beach just before sunrise",
  ],
  [
    "The Perfect Sneaker Shot",
    "image",
    "products",
    "sneakers",
    "A vibrant, studio-ready product hero.",
    "a red athletic sneaker suspended in the air",
    "a seamless red studio backdrop with subtle tonal gradients",
  ],
  [
    "Dreamlike Aurora Landscape",
    "image",
    "nature",
    "aurora",
    "A surreal meeting of sky, color and silence.",
    "a sweeping green and violet aurora",
    "a snow-covered Nordic landscape with a tiny wooden cabin",
  ],
  [
    "Creator’s Bold Thumbnail",
    "image",
    "social",
    "face",
    "A expressive, high-contrast portrait that stands out.",
    "an excited creator with an expressive surprised face",
    "a bright blue studio backdrop with abstract geometric shapes",
  ],
  [
    "Golden Hour Coffee Ritual",
    "video",
    "shorts",
    "coffee",
    "A satisfying slow-motion moment made for your feed.",
    "a ceramic cup receiving freshly brewed coffee",
    "a sunlit wooden café counter",
  ],
  [
    "The Storyteller’s Portrait",
    "video",
    "characters",
    "face",
    "A natural character moment, ready for your dialogue.",
    "a friendly middle-aged storyteller in a linen shirt",
    "a warmly lit book-lined study",
  ],
  [
    "A Journey Through Kyoto",
    "video",
    "travel",
    "japan",
    "Slow travel with cinematic soul.",
    "a traveler walking through traditional Kyoto streets",
    "a lantern-lit historic neighborhood at dusk",
  ],
  [
    "Bloom Into Another World",
    "video",
    "transformation",
    "flowers",
    "A poetic floral transformation in delicate slow motion.",
    "a closed peony slowly blooming into luminous crystal petals",
    "a softly lit botanical garden with floating pollen",
  ],
  [
    "The Last Lightkeeper",
    "video",
    "story",
    "ocean",
    "An atmospheric opening scene for an unforgettable story.",
    "an elderly lighthouse keeper watching the horizon",
    "a stormy coastline at the edge of night",
  ],
  [
    "Motion in Silk",
    "video",
    "fashion-film",
    "fashion",
    "Beautiful fabric, graceful movement, editorial energy.",
    "a model in a flowing midnight-blue silk gown",
    "a minimalist gallery with soft white walls",
  ],
  [
    "Neon Metropolis Flythrough",
    "video",
    "cities",
    "city",
    "A spectacular journey through a city of tomorrow.",
    "a futuristic city with luminous transport bridges",
    "a dense megacity at night with violet neon towers",
  ],
  [
    "Sunset Supercar Escape",
    "video",
    "cinematic",
    "car",
    "A beautifully paced automotive short film.",
    "a vintage silver sports car",
    "a winding coastal highway at sunset",
  ],
  [
    "Luxury Living in Warm Light",
    "image",
    "architecture",
    "interior",
    "A calm, sophisticated space with natural materials.",
    "an elegant modern living room with sculptural furniture",
    "a sun-drenched apartment overlooking a green garden",
  ],
  [
    "Enchanted Woodland Guardian",
    "image",
    "fantasy",
    "forest",
    "A mythical creature hidden in an ancient forest.",
    "a majestic woodland guardian with glowing antlers",
    "an ancient misty forest with bioluminescent moss",
  ],
  [
    "Cyberpunk Arena Concept",
    "image",
    "gaming",
    "game",
    "An immersive concept for a futuristic game world.",
    "a futuristic esports arena with holographic displays",
    "an industrial hall with electric purple and blue lights",
  ],
  [
    "Fresh Food, Beautifully Framed",
    "image",
    "products",
    "food",
    "Vibrant ingredients, natural light, effortless appeal.",
    "a colorful seasonal salad in a handmade ceramic bowl",
    "a linen-covered table by a large sunlit window",
  ],
  [
    "A Small Robot’s Big Day",
    "video",
    "story",
    "building",
    "A charming cinematic moment with a curious character.",
    "a small friendly round robot discovering a flower",
    "a quiet futuristic courtyard at sunrise",
  ],
  [
    "Anime Sunset Rooftop",
    "image",
    "anime",
    "japan",
    "A warm hand-painted moment above the city.",
    "two anime friends looking out over the city",
    "a Tokyo rooftop beneath a spectacular orange sunset",
  ],
  [
    "One-Minute Escape",
    "video",
    "shorts",
    "mountains",
    "A compact visual adventure designed for vertical screens.",
    "a hiker reaching the summit and raising their arms",
    "a dramatic mountain peak above the clouds",
  ],
  [
    "Modern Beauty Portrait",
    "image",
    "portraits",
    "portrait",
    "A refined editorial portrait with honest skin texture.",
    "a woman with natural makeup and delicate silver jewelry",
    "a dark studio with a subtle charcoal backdrop",
  ],
];
export const templates: Template[] = rows.map((r, i) => {
  const [title, type, category, photo, description, subject, scene] = r;
  const style =
    category === "anime"
      ? "Anime"
      : category === "fantasy"
        ? "Fantasy art"
        : category === "architecture"
          ? "Architecture"
          : category === "products"
            ? "Product photography"
            : type === "video"
              ? "Cinematic commercial"
              : "Cinematic";
  const camera = type === "video" ? "Tracking shot" : "Low angle";
  const lighting = "Golden hour";
  const action =
    type === "video"
      ? "moves naturally through the scene with subtle, deliberate motion"
      : "holds a natural, visually compelling pose";
  const common = `${subject} in ${scene}. ${description} Use cinematic lighting with soft highlights, rich shadows, a cohesive color palette and carefully balanced composition. Preserve realistic proportions, fine textures and a clear focal point.`;
  const prompt =
    type === "image"
      ? `Create a high-end ${style.toLowerCase()} image of ${common} Shoot from a low angle with an 85mm lens, shallow depth of field and subtle film grain. Premium editorial quality, crisp details, aspect ratio 16:9. Avoid blurry edges, distorted objects, watermarks, logos and unintended text.`
      : `1. Scene description: ${scene}.\n2. Main subject: ${subject}.\n3. Subject action: The subject ${action}.\n4. Camera movement: A slow, smooth tracking shot, revealing the environment with intentional pacing.\n5. Lighting: Golden highlights and soft, cinematic shadows.\n6. Environment: Physically grounded surfaces and atmospheric depth.\n7. Visual style: ${style}, premium color grading and realistic detail.\n8. Audio and dialogue: Subtle ambient sound with a restrained instrumental score; no dialogue.\n9. Duration and aspect ratio: 10 seconds, 16:9.\n10. Constraints: Preserve the subject’s identity and proportions across frames. Natural motion, no flicker, no unwanted text, no abrupt cuts. ${description}`;
  return {
    id: `template-${i + 1}`,
    title,
    type,
    category,
    photo,
    description,
    tools:
      type === "image"
        ? ["midjourney", "grok", "other"]
        : ["flow", "sora", "veo", "grok"],
    subject,
    scene,
    style,
    camera,
    lighting,
    aspect: "16:9",
    duration: "10",
    action,
    prompt,
    uzPrompt:
      type === "image"
        ? `${demoTranslations[i][2]} muhitida ${demoTranslations[i][0]} tasvirini yarating. Yuqori sifatli kinematik kompozitsiya, yumshoq yorug‘lik, boy soyalar va uyg‘un ranglardan foydalaning. Tabiiy nisbatlar, mayda teksturalar va aniq fokusni saqlang. Kamera: past burchak, 85 mm obyektiv, sayoz fokus chuqurligi va nozik kino donadorligi. Premium tahririy sifat, tomonlar nisbati 16:9. Xiralik, deformatsiya, suv belgisi, logotip va keraksiz matnsiz.`
        : `1. Sahna tavsifi: ${demoTranslations[i][2]}.\n2. Asosiy obyekt: ${demoTranslations[i][0]}.\n3. Obyekt harakati: tabiiy, nozik va maqsadli harakat.\n4. Kamera harakati: muhitni asta ochuvchi silliq kuzatuv kadri.\n5. Yoritish: oltin yorug‘lik va yumshoq kinematik soyalar.\n6. Muhit: realistik yuzalar va atmosferik chuqurlik.\n7. Vizual uslub: yuqori sifatli kinematik rang ishlovi va tiniq detallar.\n8. Ovoz va dialog: yumshoq atrof tovushlari va sokin instrumental musiqa; dialog yo‘q.\n9. Davomiylik va tomonlar nisbati: 10 soniya, 16:9.\n10. Cheklovlar: kadrlar davomida obyekt ko‘rinishi va nisbatlari saqlansin. Tabiiy harakat, titrashsiz, keraksiz matnsiz va keskin almashishlarsiz.`,
    popularity: 1000 - i * 19 + (i % 3) * 12,
    created: Date.UTC(2026, 8, 1 + i),
  };
});
export const optionLabels: Record<string, [string, string, string]> = {
  Photorealistic: ["Photorealistic", "Fotorealistik", "Фотореализм"],
  Cinematic: ["Cinematic", "Kinematik", "Кинематографический"],
  Anime: ["Anime", "Anime", "Аниме"],
  "3D render": ["3D render", "3D render", "3D-рендер"],
  "Product photography": [
    "Product photography",
    "Mahsulot fotosurati",
    "Предметная фотография",
  ],
  "Portrait photography": [
    "Portrait photography",
    "Portret fotosurati",
    "Портретная фотография",
  ],
  "Fantasy art": ["Fantasy art", "Fantastik san’at", "Фэнтези-арт"],
  Architecture: ["Architecture", "Arxitektura", "Архитектура"],
  "Cinematic commercial": [
    "Cinematic commercial",
    "Kinematik reklama",
    "Кинореклама",
  ],
  "Viral social media video": [
    "Viral social media video",
    "Viral ijtimoiy video",
    "Вирусное видео",
  ],
  "Product advertisement": [
    "Product advertisement",
    "Mahsulot reklamasi",
    "Реклама продукта",
  ],
  "Talking character": [
    "Talking character",
    "Gapiruvchi personaj",
    "Говорящий персонаж",
  ],
  "Car cinematic": ["Car cinematic", "Avtomobil kinosi", "Автомобильное кино"],
  "Travel film": ["Travel film", "Sayohat filmi", "Фильм о путешествии"],
  "Transformation video": [
    "Transformation video",
    "O‘zgarish videosi",
    "Видео-трансформация",
  ],
  Storytelling: ["Storytelling", "Hikoya", "Повествование"],
  Dreamy: ["Dreamy", "Orzudek", "Мечтательное"],
  Dramatic: ["Dramatic", "Dramatik", "Драматичное"],
  Energetic: ["Energetic", "Jo‘shqin", "Энергичное"],
  Calm: ["Calm", "Sokin", "Спокойное"],
  Mysterious: ["Mysterious", "Sirli", "Таинственное"],
  Luxury: ["Luxury", "Hashamatli", "Роскошное"],
  "Golden hour": ["Golden hour", "Oltin soat", "Золотой час"],
  "Neon glow": ["Neon glow", "Neon yorug‘lik", "Неоновый свет"],
  "Studio softbox": ["Studio softbox", "Studiya yorug‘ligi", "Студийный свет"],
  "Natural daylight": [
    "Natural daylight",
    "Tabiiy kunduzgi yorug‘lik",
    "Дневной свет",
  ],
  Moonlight: ["Moonlight", "Oy nuri", "Лунный свет"],
  "Dramatic rim light": [
    "Dramatic rim light",
    "Dramatik chekka yorug‘lik",
    "Контровой свет",
  ],
  "Eye level": ["Eye level", "Ko‘z darajasi", "На уровне глаз"],
  "Low angle": ["Low angle", "Past burchak", "Нижний ракурс"],
  "Bird’s eye view": ["Bird’s eye view", "Yuqoridan ko‘rinish", "С высоты"],
  "Close-up": ["Close-up", "Yaqin kadr", "Крупный план"],
  "Wide shot": ["Wide shot", "Keng kadr", "Общий план"],
  Macro: ["Macro", "Makro", "Макро"],
  "High detail": ["High detail", "Yuqori tafsilot", "Высокая детализация"],
  "Ultra HD": ["Ultra HD", "Ultra HD", "Ultra HD"],
  "Premium editorial": [
    "Premium editorial",
    "Premium tahririy",
    "Премиальное качество",
  ],
  Static: ["Static", "Harakatsiz", "Статичная"],
  "Zoom in": ["Zoom in", "Yaqinlashtirish", "Приближение"],
  "Zoom out": ["Zoom out", "Uzoqlashtirish", "Отдаление"],
  "Tracking shot": ["Tracking shot", "Kuzatuv kadri", "Следящий кадр"],
  "Drone shot": ["Drone shot", "Dron kadri", "Съёмка дроном"],
  Subtle: ["Subtle", "Nozik", "Слабая"],
  Moderate: ["Moderate", "O‘rtacha", "Умеренная"],
  Dynamic: ["Dynamic", "Dinamik", "Динамичная"],
  "Continuous shot": ["Continuous shot", "Uzluksiz kadr", "Непрерывный кадр"],
  "Smooth dissolve": ["Smooth dissolve", "Yumshoq o‘tish", "Плавный переход"],
  "Match cut": ["Match cut", "Mos kadr almashishi", "Монтаж по совпадению"],
};
export const optionName = (v: string, l: Lang) =>
  optionLabels[v] ? localized(optionLabels[v], l) : v;
export const imageStyles = [
  "Photorealistic",
  "Cinematic",
  "Anime",
  "3D render",
  "Product photography",
  "Portrait photography",
  "Fantasy art",
  "Architecture",
];
export const videoStyles = [
  "Cinematic commercial",
  "Viral social media video",
  "Product advertisement",
  "Talking character",
  "Car cinematic",
  "Travel film",
  "Transformation video",
  "Storytelling",
];
