<h1 align="center">
  CTC: AI Content Agent Dashboard
</h1>

<p align="center">
  <strong>Turn your code into content — automatically.</strong>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#configuration">Configuration</a>
</p>

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/badge/built_with-Next.js_15-black?style=flat&logo=next.js">
  <img alt="TypeScript" src="https://img.shields.io/badge/types-TypeScript-blue?style=flat&logo=typescript">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green">
</p>

AI Content Agent Dashboard is a powerful platform that helps **solo developers** create high‑quality product content directly from their code. Build automated workflows by assembling specialized AI agents, run them on your GitHub repositories, and publish the results to your blog, documentation, or social channels — all with minimal effort.

---

## ✨ Key Features

- **🧠 AI Agents** – Pre‑built agents like `research-writer` and `copywriting` that understand your code.
- **⚙️ Visual Workflow Editor** – Drag, drop, and connect agents to create custom content pipelines.
- **📦 GitHub Integration** – Securely access your repositories, fetch code on‑the‑fly, and publish results as pull requests.
- **🎯 Structured Outputs** – Every agent returns typed, validated data that flows seamlessly between nodes.
- **🚀 One‑Click Publishing** – Push generated content directly to GitHub PRs (WordPress and more coming soon).
- **🔒 Privacy First** – Your code is never stored; it’s processed ephemerally and discarded after each run.
- **🎨 Modern UI** – Built with shadcn/ui and Tailwind CSS for a clean, responsive experience.

> [!TIP]
> Perfect for bootstrapped founders, open‑source maintainers, and technical co‑founders who want to spend less time writing docs and more time coding.

---

## 🧩 How It Works

1. **Connect your GitHub account** – The app requests read‑only access to your repositories.
2. **Create a workflow** – Drag agents onto a canvas and connect them. Agents process data sequentially.
3. **Run the workflow** – Select a repository; the system fetches your code, passes it through the agents, and returns generated content.
4. **Review & publish** – See the results in the UI, make edits, and publish to a GitHub PR (or other platforms).

![Workflow Editor Preview](./docs/images/workflow-editor.png) <!-- Add actual screenshot later -->

---

## 🚀 Quick Start

### Prerequisites

- Node.js 24 or later
- pnpm (recommended) or npm
- A GitHub account (for OAuth and repository access)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/ai-content-agent-dashboard.git
cd ai-content-agent-dashboard

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
```

### Configuration

Edit `.env.local` and fill in the required values:

```ini
# Turso database
DATABASE_URL=libsql://your-db.turso.io
DATABASE_AUTH_TOKEN=your-auth-token

# GitHub OAuth (create an OAuth app at https://github.com/settings/developers)
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# NextAuth
NEXTAUTH_SECRET=your-strong-secret-at-least-32-chars
NEXTAUTH_URL=http://localhost:3000

# LLM (optional – uses mock if not set)
OLLAMA_BASE_URL=http://localhost:11434

# Encryption key for connector secrets (32‑byte base64)
ENCRYPTION_KEY=base64-32-byte-key

# Secret for cron endpoint (optional)
CRON_SECRET=...
```

### Database Setup

```bash
# Generate and apply migrations
pnpm db:generate
pnpm db:migrate
```

### Run the Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) and sign in with GitHub.

---

## 🏗️ Architecture

![Architecture Diagram](./docs/images/architecture.png)

- **Frontend**: Next.js 15 (App Router) with React Server Components.
- **API**: Type‑safe endpoints built with `next-rest-framework` and Zod.
- **Database**: Turso (SQLite) + Drizzle ORM.
- **Background Jobs**: Vercel cron or a simple worker that processes runs from a queue table.
- **LLM Integration**: Pluggable adapters for Ollama (default) and other providers.
- **Authentication**: NextAuth.js (GitHub OAuth) with JWT strategy.

> [!NOTE]
> The project is designed to be **self‑contained** – you can deploy it on Vercel, configure your own Turso database, and optionally point to your own Ollama instance.

---

## 🛠️ Tech Stack

| Category       | Technologies                                                                 |
|----------------|------------------------------------------------------------------------------|
| Framework      | Next.js 15, React 19, TypeScript                                             |
| Styling        | Tailwind CSS, shadcn/ui, Lucide Icons                                        |
| Database       | Turso, Drizzle ORM                                                           |
| API            | next-rest-framework, Zod                                                     |
| Authentication | NextAuth.js (GitHub provider)                                                |
| Testing        | Vitest, Playwright                                                           |
| Linting        | Biome                                                                        |
| Deployment     | Vercel                                                                       |

---

## ⚙️ Configuration

All configuration is managed via environment variables (see `.env.example`). Key options:

- `OLLAMA_BASE_URL`: Point to your own Ollama instance for real LLM inference. If not set, a mock LLM is used.
- `CRON_SECRET`: Protect the `/api/cron/process-runs` endpoint if you use it.
- `ENCRYPTION_KEY`: Used to encrypt connector secrets (e.g., GitHub tokens for publishing).

---

## 📖 Usage Examples

### Generating a Blog Post from Recent Code Changes

1. After signing in, click **New Workflow**.
2. Name it "Blog Post" and select your repository.
3. Add a `research-writer` node, then a `copywriting` node.
4. Connect them so the research output flows into the copywriting input.
5. Run the workflow.
6. When complete, review the generated draft and click **Publish as PR** to create a pull request with the new post.

### Automating Release Notes

1. Configure a GitHub Action in your repository that calls the dashboard’s API on each new release.
2. The action triggers a workflow that generates release notes from commit history.
3. The result is pushed back as a PR updating `RELEASE_NOTES.md`.

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

---

<p align="center">
  Made with ❤️ for solo developers.
</p>
