# Development Team Onboarding & Standards

| Field | Value |
|-------|-------|
| Project | AI Content Agent Dashboard |
| Document | Development Team Onboarding & Standards |
| Version | 1.0 |
| Date | 2026-03-14 |
| Author | [Tech Lead / Architect] |
| Status | Final – For Team Adoption |

---

## 1. Welcome & Project Overview

Welcome to the **AI Content Agent Dashboard** development team! This document will help you get up to speed with the project's vision, architecture, coding standards, and collaboration practices.

### 1.1 Project Vision
Empower solo developers to effortlessly create high‑quality product content by assembling AI‑powered agents into automated workflows, and publish results to platforms like GitHub and WordPress.

### 1.2 Key Documents
Please read these foundational documents (available in the project wiki or `/docs` folder):

- [Product Vision & Strategic Alignment](./vision.md)
- [Business & Stakeholder Requirements (BRS)](./brs.md)
- [Software Requirements Specification (SRS)](./srs.md)
- [Architecture & Design Specification (with ADRs)](./architecture.md)
- [UX Design Specification (with mockups)](./ux.md)
- [Technical Design & API Specifications](./technical-design.md)
- [Implementation Plan & MVP Scope](./implementation-plan.md)

These documents define *what* we're building, *why*, and *how*.

---

## 2. Architecture Review

### 2.1 Key Architectural Decisions (ADRs)

We have recorded several Architecture Decision Records (ADRs) in `/docs/adr/`. During onboarding, we'll walk through the most important ones:

| ADR | Title | Summary |
|-----|-------|---------|
| ADR‑001 | Use Next.js with API Routes | Unified stack, Vercel deployment. |
| ADR‑002 | Database: Turso with Drizzle ORM | SQLite at edge, no separate DB server. |
| ADR‑003 | Background job processing with database polling | Simple job queue using `runs` table. |
| ADR‑004 | GitHub Action authentication via OIDC | Secure, no long‑lived tokens. |
| ADR‑005 | LLM adapter with pluggable providers | Support multiple LLMs (Ollama, OpenAI). |
| ADR‑006 | Output connectors as pluggable modules | Easy to add new platforms. |
| ADR‑007 | API versioning via URL path (`/api/v1/`) | Clear contract evolution. |
| ADR‑008 | Circuit breaker for LLM calls | Resilience against provider failures. |
| ADR‑009 | Workflow stops on node failure | Simple, predictable error handling. |

We'll schedule a **30‑minute ADR review session** to ensure everyone understands the rationale and consequences.

---

## 3. Coding Standards & Tooling

We use modern, consistent tooling to keep the codebase clean and maintainable.

### 3.1 Language & Framework
- **TypeScript** – strict mode enabled.
- **Next.js** (App Router) – React framework.
- **React** – UI library.

### 3.2 Linting & Formatting: Biome (instead of ESLint/Prettier)

We use **[Biome](https://biomejs.dev/)** as a unified tool for linting, formatting, and import sorting. It's fast and has zero configuration for many rules.

**Biome configuration (`biome.json`)**:
```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noBannedTypes": "error",
        "noUselessConstructor": "error"
      },
      "correctness": {
        "noUnusedVariables": "error",
        "useExhaustiveDependencies": "warn"
      },
      "style": {
        "noNonNullAssertion": "warn",
        "useConst": "error",
        "useTemplate": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "es5",
      "semicolons": "always"
    }
  }
}
```

**Commands** (in `package.json`):
```json
{
  "scripts": {
    "lint": "biome check .",
    "format": "biome check --apply .",
    "lint:ci": "biome ci ."
  }
}
```

All code **must** pass `lint:ci` before merging.

### 3.3 TypeScript Configuration

`tsconfig.json` (strict, with paths):
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3.4 Naming Conventions

- **Files and folders**: `kebab-case` (e.g., `workflow-canvas.tsx`, `user-profile.tsx`).  
  *Exception:* Next.js special files (`layout.tsx`, `page.tsx`, `route.ts`) remain as‑is.
- **Components**: PascalCase (e.g., `WorkflowCanvas`, `UserProfile`).
- **Functions/variables**: camelCase.
- **Constants**: UPPER_SNAKE_CASE.
- **CSS classes**: Tailwind utility classes (no custom CSS unless necessary).

### 3.5 UI & Styling

- **Component library**: [shadcn/ui](https://ui.shadcn.com/) – accessible, unstyled components. We'll customize the theme in `tailwind.config.js`.
- **Icons**: [Lucide React](https://lucide.dev/) – import only needed icons.
- **Styling**: Tailwind CSS (v3). Global styles in `app/globals.css`.

### 3.6 Git Workflow

- **Branching**: 
  - `main` – production-ready.
  - `develop` – integration branch (optional; we may use feature branches directly).
  - Feature branches: `feature/description` (e.g., `feature/workflow-editor`).
  - Bug fixes: `fix/description`.
- **Commit messages**: [Conventional Commits](https://www.conventionalcommits.org/) format:
  ```
  feat: add workflow editor canvas
  fix: handle null repo in run
  docs: update API docs
  ```
- **Pull requests**: 
  - Link to issue (if any).
  - Include screenshots for UI changes.
  - Must pass CI (lint, typecheck, tests).
  - At least one reviewer approval required.

### 3.7 Testing Standards

- **Unit tests**: Vitest (colocated with code as `*.test.ts` or `*.test.tsx`).
- **Integration tests**: API route tests using `next-test-api-route-handler` or similar.
- **E2E tests**: Playwright (folder `e2e/`).
- **Coverage**: Aim for 80%+ coverage on critical paths (workflow engine, agent execution).

**Commands**:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ci": "vitest run --coverage",
    "test:e2e": "playwright test"
  }
}
```

---

## 4. Tooling Setup

### 4.1 Prerequisites

- Node.js 20+ (use [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm)).
- Package manager: **pnpm** (recommended) or npm.
- Git.

### 4.2 Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values. Key variables:

```bash
# Turso
DATABASE_URL="libsql://..."

# GitHub OAuth
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# NextAuth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# Ollama (or mock LLM)
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_DEFAULT_MODEL="deepseek-r1:8b"

# Encryption
ENCRYPTION_KEY="32-byte-base64-key"

# GitHub webhook (for later)
GITHUB_WEBHOOK_SECRET="..."
```

### 4.3 IDE Setup (VS Code)

Recommended extensions:
- **Biome** – official extension for linting/formatting.
- **Tailwind CSS IntelliSense**.
- **Prettier** (optional, but Biome handles formatting).
- **GitLens**.
- **Thunder Client** (for API testing).

Workspace settings (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### 4.4 Local Development

1. Clone the repository.
2. Run `pnpm install`.
3. Set up environment variables.
4. Run database migrations: `pnpm db:migrate`.
5. Start dev server: `pnpm dev`.

---

## 5. Communication Channels

- **Daily standup**: 15 min (async via Slack or sync meeting).
- **Slack/Discord**: Channels:
  - `#general` – announcements.
  - `#dev` – technical discussions.
  - `#pr-reviews` – pull request notifications.
  - `#design` – UI/UX feedback.
- **GitHub Issues**: Track bugs, features, and tasks. Use labels: `bug`, `enhancement`, `good first issue`.
- **Project board**: GitHub Projects for sprint planning.
- **Documentation**: All docs in `/docs` folder; updates via PR.

---

## 6. CI/CD Pipeline

We use GitHub Actions for continuous integration and Vercel for deployment.

### 6.1 CI Workflow (`.github/workflows/ci.yml`)

```yaml
name: CI
on: [push, pull_request]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint:ci
      - run: pnpm test:ci
      - run: pnpm validate:openapi
```

### 6.2 Deployment

- **Preview deployments**: Automatically for each PR (Vercel).
- **Production**: Merges to `main` deploy to production.

---

## 7. Definition of Done (DoD)

A user story or task is considered **Done** when:

- [ ] Code is written, following standards (Biome passes, types correct).
- [ ] Unit/integration tests are written and passing.
- [ ] E2E tests (if applicable) are passing.
- [ ] PR has been reviewed and approved by at least one other developer.
- [ ] Documentation is updated (if needed).
- [ ] Feature is deployed to staging and verified by the product owner (or via automated checks).
- [ ] No critical or high bugs remain.

---

## 8. Next Steps

1. **Schedule onboarding session** (1 hour) to walk through this document and answer questions.
2. **Set up development environment** for each team member.
3. **First task**: Pick a good first issue from the backlog and start your first PR!

Welcome aboard, and let's build something great!
