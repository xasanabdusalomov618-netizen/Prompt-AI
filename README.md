# Promptora AI

A premium, responsive AI **text prompt** generator and discovery frontend. No backend, account, paid API, or media-generation integration is required.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL (port 5173). The development server binds to `0.0.0.0` and accepts proxied preview hosts.

```bash
npm run build    # TypeScript check + optimized static build
npm run lint     # TypeScript check
npm run format   # Prettier
```

## Features

- Home, Discover, Image Prompts, Video Prompts, Generator, AI Tools, Favorites, About, and Settings routes.
- 36 detailed demo templates across 20 categories, with preview images and editable detail dialogs.
- Title/description search, content/category/tool filters, Popular/Newest/A–Z sorting, empty states, and reset.
- Local TypeScript image and structured ten-part video prompt assembly with style, lighting, camera, duration, action, dialogue, audio, optional negative prompts, and additional direction.
- Tool-aware recommendations and Midjourney aspect-ratio formatting. These are independent recommendations, not official integrations or compatibility guarantees.
- Live output updates, direct text editing, regenerate, clear, clipboard copying, feedback toasts, and saved generated prompts.
- Uzbek, English, and Russian interface languages; independently selectable prompt output language.
- Local translations of curated subjects/locations into Uzbek. Free-form text is preserved exactly as entered, so users should enter it in their desired output language. This is a local template builder, not an AI translation service.
- Favorites, generated prompts, theme, and interface language persist in browser localStorage.
- Responsive navigation, filter controls, dark/light themes, keyboard-accessible dialogs, focus trapping, and reduced-motion support.

## Structure

- `src/App.tsx`: page composition, routing, library filters, settings.
- `src/components.tsx`: navigation, cards, tool picker, detail dialogs, footer.
- `src/Generator.tsx`: dynamic form, live editor, output actions.
- `src/prompt.ts`: pure typed prompt assembly logic.
- `src/data.ts`: templates, category metadata, tool capabilities and form options.
- `src/i18n.ts`, `src/translations.ts`: interface dictionaries and curated local translations.
- `src/context.tsx`: preferences, persisted collections, clipboard and notifications.
- `src/styles.css`: responsive design system with Tailwind CSS integration.
- `public/previews/`: ten original AI-created demo illustrations, generated during development, not by the frontend. Other previews use Unsplash photograph URLs with local fallbacks.

Homepage statistics are explicitly illustrative. Photos and illustrations are inspiration previews, not guaranteed outputs of the associated prompts.

## Tests

```bash
npx playwright install chromium
npm test
```

Five Playwright end-to-end scenarios cover navigation and mobile layout, search/filter/sort, modal editing and actual clipboard copying, favorites persistence, generator validation and live updates, video structure, output language, tool adaptation, and preferences persistence.

On environments with an existing Chromium binary, `CHROMIUM_EXECUTABLE_PATH=/path/to/chromium npm test` uses that binary instead.

## Deploy

Deploy the generated `dist/` directory to a static host. Configure a fallback to `index.html` for client-side routes. Clipboard access requires HTTPS (or localhost). No environment variables or secrets are needed.
