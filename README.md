## Grih AI – AI Interior Designer

An AI-powered interior design assistant built with React, TypeScript, and Vite. Generate design ideas from text or images, explore inspirations, and preview designs in AR.

## Authors & Co-Creators

This project represents an equal collaboration and shared effort between the two primary developers.

| Role | Name/Username | GitHub Profile |
| :--- | :--- | :--- |
| **Co-Creator** | bhargavrock12 | [@bhargavrock12](https://github.com/bhargavrock12) |
| **Co-Creator** | snehasuresh2005 | [@snehasuresh2005](https://github.com/snehasuresh2005) |

### Highlights
- **Text-to-design**: Describe your room, style, and dimensions to get concept outputs.
- **Image-to-redesign**: Upload an existing room photo for AI-driven redesigns.
- **Inspiration gallery**: Browse preset styles and regional traditions.
- **AR viewer (experimental)**: Deep links and live overlays to preview 3D furniture models.

---

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **AI**: Google Gemini via `@google/genai`
- **3D/AR**: GLB models and AR utilities (`components/ar`, `components/models`)

---

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- A Google Gemini API key

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment variables
Create a file named `.env.local` in the project root and add your Gemini key:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3) Run the development server
```bash
npm run dev
```
The app will start with Vite and print a local URL (typically `http://localhost:5173`).

### Build and preview
```bash
npm run build
npm run preview
```

---

## Project Structure
Key folders and files:

- `App.tsx` – App shell and routing entry
- `index.tsx`, `index.html` – Vite/React bootstrap
- `components/` – UI and feature modules
  - `landing/` – Landing and explore pages
  - `image-flow/` – Image upload and processing UI
  - `text-flow/` – Multi-step text input (room type, style, dimensions, description)
  - `ar/` – AR deep links, viewer, overlays, and QR generator
  - `output/` – Rendered image/text result pages
  - `common/` – Shared components like wrappers and navigation
  - `models/` – GLB assets for AR/3D previews
- `services/` – Integration logic
  - `geminiService.ts` – Calls to Google Gemini
  - `arMockService.ts`, `ARCoreIntegration.ts` – AR-related utilities/mocks
- `config/config.ts` – App configuration constants
- `utils/storage.ts` – Local storage helpers
- `types.ts` – Shared TypeScript types

---

## Features and Flows

### Text-to-Design
- Navigate through `RoomType`, `RoomStyle`, `RoomDimensions`, and `Description` pages.
- Submits to `geminiService` to generate design ideas and returns results to `output/TextOutputPage`.

### Image-to-Redesign
- Upload an image via `image-flow/ImageInputPage` and submit redesign prompts.
- Results appear in `output/ImageOutputPage`.

### AR Preview (Experimental)
- Explore `components/ar` for deep links (`ARDeepLinkPage`), prompts, and viewer overlay.
- GLB models in `components/models` are used for simple previews.
- Actual device AR support may require platform-specific setup.

---

## Configuration
Most app-level settings are in `config/config.ts`. Update as needed for endpoints, feature flags, and UI constants.

Environment variable used by default:
- `GEMINI_API_KEY` – Required for Gemini API calls

---

## Scripts
```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
```

---

## Deployment
This is a static Vite app (with client-side API calls). You can deploy the `dist/` output to any static host:

- Netlify: drag-and-drop `dist/` or configure CI with `npm run build`
- Vercel: import the repo; framework preset: Vite
- GitHub Pages: serve `dist/` via actions

Ensure your `GEMINI_API_KEY` is provided as an environment variable in your host. For client-side apps, consider proxying Gemini requests via a lightweight backend to avoid exposing keys publicly.

---

## Troubleshooting
- Missing or invalid API key: verify `.env.local` and restart dev server.
- CORS or network errors: consider a server proxy for AI requests.
- AR not launching on device: confirm device/browser AR support and model paths.
- Build errors: clear `node_modules`, reinstall, and ensure Node.js 18+.

---

## Contributing
Issues and PRs are welcome. Please keep code readable, typed, and aligned with the existing structure.

---

## License
Specify your license here (e.g., MIT). If unspecified, all rights reserved by default.
