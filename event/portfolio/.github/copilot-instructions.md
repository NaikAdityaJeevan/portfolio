# Workspace Setup Checklist

- [x] Verify that `copilot-instructions.md` exists in `.github`.
- [x] Clarify project requirements: Vite, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Drei, GSAP, and Framer Motion.
- [x] Scaffold the project in the workspace root.
- [x] Customize the project as Aditya Jeevan Naik's Electronics and Communication Engineering portfolio.
- [x] Install required extensions: none specified by the project setup information.
- [x] Compile the project and run lint checks.
- [x] Create and run task: skipped because the Vite development server is running directly from the project script.
- [x] Launch the project at `http://localhost:5173/`.
- [x] Ensure documentation is complete in `README.md` and this file.

## Project notes

- Keep personal facts, links, projects, skills, interests, and achievement records in `src/data/portfolio.ts`.
- Do not invent achievement or project outcome details. Replace pending project fields only with verified information.
- Put the replaceable resume at `public/resume.pdf` and set `resumeReady` in the central portfolio data when present.
- The contact form creates a `mailto:` draft; no backend submission is configured.
- Respect reduced-motion preferences and keep the 3D scene lightweight on mobile.
- Verify with `npm run build` and `npm run lint` after changes.
