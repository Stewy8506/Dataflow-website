# Dataflow Visualiser — Landing Website

The official landing page and download portal for [Dataflow Visualiser](https://github.com/Stewy8506/Dataflow-Visualiser) — a high-performance native desktop tool for visualizing, analyzing, and AI-refactoring local codebases.

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-44%25-3178C6?style=flat&logo=typescript&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-55.7%25-1572B6?style=flat&logo=css3&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active_Development-orange?style=flat)

---

## About

This repository contains the marketing and download website for Dataflow Visualiser. It is a Next.js App Router application serving:

- Product landing page with feature overview
- Platform-specific download links for Windows, macOS, and Linux
- Release hosting via `public/downloads/`

The desktop application source lives separately at [Stewy8506/Dataflow-Visualiser](https://github.com/Stewy8506/Dataflow-Visualiser).

---

## Tech Stack

- **Framework** — Next.js (App Router)
- **Language** — TypeScript
- **Styling** — CSS
- **Hosting** — Vercel (recommended)

---

## Repository Structure

```
Dataflow-website/
├── app/                  # Next.js App Router pages and layouts
├── public/
│   └── downloads/        # Compiled desktop app installers
│       ├── *.exe         # Windows installer
│       ├── *.dmg         # macOS disk image
│       └── *.AppImage    # Linux AppImage
├── next.config.mjs       # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Adding a New Release

1. Build the desktop app installers via the Dataflow Visualiser GitHub Actions release workflow
2. Drop the compiled binaries into `public/downloads/`
3. Update download links in the relevant page component to point to the new filenames
4. Commit and push — Vercel deploys automatically on merge to `master`

---

## Deployment

The site is designed to deploy on **Vercel** with zero configuration.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

For production:
```bash
vercel --prod
```

Alternatively, connect the repository to Vercel via the dashboard for automatic deployments on every push to `master`.

---

## Related

- **Desktop App** — [Stewy8506/Dataflow-Visualiser](https://github.com/Stewy8506/Dataflow-Visualiser)

---

## License

MIT
