# ADR 0001: Single-Page Software Engineer Portfolio

- Status: Accepted
- Date: 2026-09-17

## Context

We need a portfolio for a software engineer targeting full-stack and backend roles. It should communicate relevant experience, projects, skills, and contact information quickly to recruiters, hiring managers, and engineers who may review it on desktop or mobile.

The portfolio should be a single, coherent story rather than a collection of subpages. The content is more important than visual novelty: visitors should be able to scan the engineer's background, understand the work and its outcomes, inspect selected projects, and find a reliable way to make contact.

The site must be simple, elegant, professional, responsive, accessible, and maintainable. It should work well on a slow connection, support keyboard and assistive-technology users, and avoid making essential information dependent on animation or client-side interaction.

## Decision

We will build a single-page portfolio organized as a chronological, filterable timeline of work history and selected projects.

### Content and structure

- Use one page with stable anchor sections for `About`, `Experience`, `Projects`, `Skills`, and `Contact`.
- Provide a compact introduction with the engineer's name, role focus, short positioning statement, and professional links.
- Present work history and projects as timeline entries with dates, organization or project name, role, context, outcomes, technologies, and relevant links.
- Include a small set of featured projects with enough technical and product context to demonstrate backend and full-stack judgment.
- Add filters for useful categories such as work, projects, and technology or discipline. Filtering must preserve clear active state, keyboard access, and a usable no-results state.
- Keep contact information visible through a direct email link and relevant professional profiles. Do not require a form for basic contact.
- Use meaningful content hierarchy and concise writing. Prioritize shipped work, decisions, constraints, collaboration, and measurable outcomes over exhaustive lists.

### Technology

- Prefer semantic HTML, modern CSS, and minimal vanilla JavaScript for the initial implementation.
- Keep the content close to the markup or in a simple structured data source so it remains easy to edit and index.
- Use progressive enhancement: the page and its essential content must remain understandable without JavaScript; JavaScript may add filtering, active-section tracking, and modest interaction.
- Avoid a frontend framework, backend, database, CMS, or build pipeline unless a concrete requirement emerges that justifies the added complexity.
- Deploy as static assets on a reliable static host. Keep dependencies to a minimum and avoid external runtime services for core content.

### Accessibility and quality

- Use semantic landmarks, heading order, descriptive links, visible focus states, sufficient color contrast, and keyboard-operable controls.
- Respect `prefers-reduced-motion` and never hide essential information behind animation.
- Make anchor links deep-linkable and ensure responsive layouts remain readable and usable at narrow widths.
- Test at desktop and mobile widths, with keyboard navigation, a screen reader or accessibility checker, and JavaScript disabled where practical.
- Optimize for fast loading: modest media, no autoplay, no decorative assets that compete with the content, and no unnecessary client-side work.

### AI-assisted development

- AI assistance may be used to scaffold, implement, refactor, and review the site, but the engineer remains responsible for the content, claims, code, accessibility, security, and final design decisions.
- Treat AI-generated code and copy as drafts. Verify behavior locally, check dependencies and licenses, inspect generated markup and scripts, and test the rendered site before publishing.
- Do not invent employment history, project outcomes, skills, testimonials, metrics, or contact details. AI may help edit supplied facts for clarity, but factual content must come from the engineer.
- Do not send private credentials, unpublished code, confidential employer information, or personal data to external AI services.
- Keep the implementation understandable enough for a human maintainer; do not accept opaque generated abstractions solely to save typing.

## Out of scope

The initial version will not include:

- Separate project, résumé, blog, or case-study subpages.
- A custom backend, database, authentication, user accounts, comments, analytics dashboard, or admin editor.
- A contact form, newsletter, job board integration, or automated lead-management workflow.
- Exhaustive employment history, every small experiment, or a long unranked technology inventory.
- Skill bars, star ratings, arbitrary proficiency percentages, or claims that cannot be supported by evidence.
- A design system, elaborate page transitions, 3D scenes, heavy illustration, video backgrounds, or animation-led navigation.
- A CMS or content management workflow before the content volume requires one.
- AI-generated personal claims or autonomous publishing of portfolio content.

These items may be reconsidered when a specific need, audience, or maintenance problem is demonstrated.

## Alternatives considered

### Multi-page portfolio

Rejected for the initial version. Separate pages could provide more room for long case studies, but they add navigation overhead and fragment the narrative. The target audience should be able to understand the engineer's range and strongest evidence from one scannable page.

### Résumé-first layout

Rejected as the primary structure. A résumé is useful as a downloadable supplement, but a résumé-only presentation tends to emphasize duties and keyword lists over decisions, outcomes, and working style. The site will communicate those details directly, with an optional résumé link if one is available.

### React or another frontend framework

Rejected initially. A framework would be reasonable for a richer application, but this site has limited state and interaction. Vanilla JavaScript reduces bundle size, dependency maintenance, build configuration, and accessibility failure modes. Revisit if content editing, complex filtering, or reusable interactive components become substantial.

### CMS or headless CMS

Rejected initially. The portfolio has a small, infrequently changing content set and no requirement for multiple editors. A CMS would introduce hosting, authentication, API, and content-modeling overhead without improving the initial visitor experience.

### Backend-powered contact form

Rejected initially. A direct email link and professional profile links are simpler, more reliable, and less exposed to spam and data-handling concerns. Add a form only when a genuine workflow requires structured submissions.

### Visually elaborate portfolio experience

Rejected as the default direction. Complex visuals can demonstrate frontend skill, but they risk slower loading, weaker readability, and distraction from the evidence hiring teams need. The visual language will be distinctive through typography, spacing, color, and careful composition rather than elaborate UI or effects.

### AI-generated content or autonomous site generation

Rejected. AI can accelerate implementation and editing, but personal history and professional claims require human ownership and verification. The final site must reflect the engineer's actual experience and judgment.

## Consequences

### Positive

- Visitors get a fast, predictable path through the engineer's experience and strongest work.
- A single responsive document is easier to maintain, test, share, and deep-link.
- Semantic HTML and progressive enhancement improve accessibility, searchability, and resilience.
- Minimal technology keeps hosting and operational costs low and reduces maintenance burden.
- The structure emphasizes evidence and outcomes rather than decorative claims.

### Negative

- A single page can become long or dense as content grows; entries must be curated and concise.
- Vanilla JavaScript provides fewer built-in abstractions if interaction becomes complex.
- Avoiding a CMS means content updates require editing and redeploying source files.
- A restrained visual approach may demonstrate less visual experimentation than an interactive showcase.
- Client-side filtering must be implemented carefully so it does not harm keyboard navigation, deep links, or access to content.

## Review triggers

Revisit this decision if any of the following becomes true:

- Case studies consistently need more detail than the single page can present clearly.
- More than one person needs to edit content regularly.
- Filtering or interaction requires application-level state that is difficult to maintain in vanilla JavaScript.
- Contact volume requires structured submissions and a spam-resistant workflow.
- Accessibility, performance, or maintainability testing identifies a limitation in the chosen implementation.