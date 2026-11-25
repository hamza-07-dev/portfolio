# Portfolio Frontend

React + Vite + Tailwind CSS. Connects to the `portfolio-backend` API for
projects, skills, contact form and analytics tracking.

## Installation

```bash
cd portfolio-frontend
npm install
cp .env.example .env
# VITE_API_URL should point to your running backend (default: http://localhost:4000/api)
```

## Run

```bash
npm run dev
```

Opens on `http://localhost:5173`. Make sure the backend
(`portfolio-backend`) is running first, otherwise Projects/Skills fall
back to the built-in placeholder data and the contact form will fail to send.

## Two modes

`App.jsx` picks between two full experiences via `useSiteMode()`:

- **Immersive** (`ImmersiveApp.jsx`): a single persistent Three.js world
  (`three-world/World.jsx`) stays fixed behind the page. Scrolling a tall
  spacer div drives a camera that glides along a Catmull-Rom curve
  (`three-world/path.js`) through 6 stops (Hero → About → Projects →
  Skills → AI & Automation → Contact). HTML content for each stop fades
  in/out on top (`OverlaySection.jsx`) based on scroll progress, and a
  dot nav (`ImmersiveNav.jsx`) lets visitors jump to any stop. Default
  for capable desktop/tablet browsers.
- **Classic** (`ClassicApp.jsx`): the original stacked-sections layout
  (Hero with its own smaller 3D scene, then About/Projects/Skills/
  Automation/Contact one after another). Used automatically for mobile
  (`<768px`), `prefers-reduced-motion`, or no WebGL support — the
  immersive world is heavy, so it's reserved for visitors who can
  actually enjoy it smoothly.

`src/hooks/useSiteMode.js` does the detection; `src/lib/webgl.js` checks
for WebGL support.

## Structure

```
src/
  components/
    layout/     Navbar, Footer
    ui/         Button, Badge, GlassCard
    sections/   Hero, About, Projects, Skills, AIAutomation, Contact
  lib/api.js    Fetch wrapper for the backend API
  App.jsx
  main.jsx
```

The Hero section renders a real Three.js scene (React Three Fiber + drei +
postprocessing): floating glass shapes with transmission materials, an
Environment-based reflection, Sparkles, Bloom/Vignette postprocessing, and a
gentle pointer-driven parallax. It's lazy-loaded (`React.lazy` + `Suspense`)
so it never blocks the first paint, respects `prefers-reduced-motion`
(animation stops entirely), and drops Sparkles/postprocessing on small
screens to stay light on mobile.

```
src/components/three/
  HeroScene.jsx         Canvas, lights, Environment, Sparkles, EffectComposer
  HeroComposition.jsx   Groups the shapes, handles pointer parallax
  GlassShape.jsx         One floating glass mesh (MeshTransmissionMaterial)
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

Deploy `dist/` to Vercel or Netlify.
