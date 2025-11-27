# TinyLink - Explanation Video Script

Duration target: 3-6 minutes

1. Intro (15-20s)
- "Hi, I'm [Your Name]. This is my TinyLink assignment — a simple URL shortener built with Next.js and Prisma."

2. High-level overview (30-40s)
- Show the app in the browser (dashboard).
- Explain core features: create links, optional custom code, redirect, stats, delete, health endpoint, API endpoints.

3. Code walkthrough (2-3 minutes)
- Project structure: point to `app/`, `prisma/`, `lib/`.
- Explain `prisma/schema.prisma` — the `Link` model.
- Show `app/api/links/route.js` — how creation and validation are handled, mention 409 on duplicate codes.
- Show `app/[code]/route.js` — redirects and click counting (302).
- Show `app/page.jsx` — dashboard UI and how it calls the API.
- Mention `app/code/[code]/page.jsx` — stats page.

4. Deployment & tests (30-40s)
- Explain environment variables and Prisma migration step.
- Mention `/healthz` endpoint and stable URLs used for autograding.

5. Wrap-up (10-15s)
- "Thanks — repo URL: [provide GitHub link], live demo: [provide deployed URL]."
- Mention that a ChatGPT transcript is included if used.

Tips:
- Keep it short and focused on functionality and where to look in code.
- Use screen capture and zoom on files when talking about them.
