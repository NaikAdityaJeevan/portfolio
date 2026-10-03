# Aditya Jeevan Naik — Engineering Portfolio

A responsive Electronics and Communication Engineering portfolio built with React, Vite, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Drei, GSAP, and Framer Motion.

## Run locally

```sh
npm install
npm run dev
```

The production build and lint checks are available with `npm run build` and `npm run lint`.

## Personalise the content

Edit `src/data/portfolio.ts` to update the introduction, contact links, skills, projects, journey categories, interests, and achievements. Project records include problem, solution, architecture, contribution, results, gallery, GitHub, and demo fields. Existing project details that have not been supplied are labelled as pending; replace them with verified information.

Add the final resume PDF at `public/resume.pdf`, then set `resumeReady` to `true` in the portfolio data. Update the email, LinkedIn, and GitHub values there to activate those contact destinations. The contact form prepares a message in the visitor's email application and does not send data to a server.

## Motion and 3D

The hero drone is constructed from local Three.js primitives, so it does not depend on a remote model. Its motion responds to pointer movement and respects the operating system's reduced-motion preference. The scene uses a lower render density on mobile devices. GSAP reveals are disabled when reduced motion is requested.