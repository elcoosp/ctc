# Vision & Strategic Alignment

| Field | Value |
|-------|-------|
| Project | AI Content Agent Dashboard |
| Document | Vision & Strategic Alignment |
| Version | 0.2 (Updated) |
| Date | 2026-03-14 |
| Author | [User], assisted by AI |
| Status | Approved |

---

## 1. Vision Statement

**Empower every solo developer to effortlessly create high‑quality product content by assembling AI‑powered agents into automated workflows, so they can focus on building rather than writing.**

---

## 2. Elevator Pitch (Moore’s Template)

> **For solo developers** (bootstrapped founders, open‑source maintainers, technical co‑founders) who need great product content—documentation, blog posts, release notes—based on their code quickly, **our product is an AI‑powered content generation platform** that lets you build automated workflows from a library of expert‑crafted AI agents. **Unlike** writing manually or using generic AI tools, **our product** deeply understands your codebase, integrates with GitHub, and can automatically publish content to your blog, repository, or social channels.

---

## 3. Problem Statement

Solo developers already juggle coding, testing, and deployment. Creating product content—documentation, blog posts, release notes—is a separate, time‑consuming task that pulls them away from what they do best. Generic AI tools help, but they require manual copying of code snippets and lack deep understanding of the developer’s actual codebase, often producing inaccurate or shallow content. There is no seamless, code‑aware solution that turns a developer’s existing work into compelling product narratives.

---

## 4. Target Users & Customers

- **Primary user group:** Bootstrapped founders and open‑source maintainers building their own software products (SaaS, apps, tools) who need to communicate their product’s value to users/investors.
- **Secondary users:** Technical co‑founders in tiny startups, early employees handling both development and content.
- **Explicitly not targeting (for now):** Non‑technical content writers, large enterprises with dedicated marketing teams, or teams larger than ~5 people.

---

## 5. User Needs & Value Proposition

**Top user needs:**
1. **Speed** – create content in minutes, not hours.
2. **Accuracy** – content must reflect the actual code/features, not generic fluff.
3. **Context‑awareness** – understand the codebase to generate relevant examples, API docs, etc.
4. **Ease of use** – minimal setup, no complex configuration.

**Value proposition:** Our product uniquely satisfies these needs by allowing users to build workflows from specialized AI agents (research, copywriting, SEO, etc.) that are pre‑configured to work with codebases. It integrates with GitHub, uses Vercel AI SDK for structured outputs, and can publish results directly to platforms like GitHub (via PR), WordPress, and more.

---

## 6. Desired Outcomes & Success Metrics

### Business Outcomes
- 100 active users within 3 months of launch.
- 20% month‑over‑month growth in signups.
- Achieve $X MRR within 6 months (if monetised).

### Product Outcomes
- Average time to generate a blog post < 5 minutes.
- 70% of users generate at least 3 pieces of content in their first week.
- User satisfaction score (CSAT) ≥ 4.5/5.

---

## 7. Strategic Constraints

- **Product form:** Web‑based SaaS application.
- **Technology:** Built with TypeScript, Next.js (App Router), Drizzle ORM, Turso (SQLite, Europe single region).
- **Integration:** Must integrate with GitHub (OAuth, API, Actions).
- **Initial agent library:** Research writer, copywriting, SEO audit, humanizer, security scanner (post‑MVP).
- **Timeline:** MVP within 3 months.

---

## 8. Goals and Non‑goals (Scope / Anti‑scope)

### Goals
- Provide a visual workflow editor to chain AI agents.
- Execute workflows manually or triggered by GitHub events (push, release, PR merge).
- Support structured outputs using Vercel AI SDK’s `generateObject`.
- Offer output connectors for GitHub PR (MVP), WordPress (MVP), and later LinkedIn, Dev.to.
- Enable per‑repository customisation via config file (`.codecontent.yaml`).
- Provide a sandbox mode to test workflows on user’s own repo without consuming quota.

### Non‑goals
- Replace a full‑blown CMS.
- Generate code (it’s about content, not code).
- Support large teams with collaboration features (e.g., multi‑user editing, approval workflows) – future.
- Handle video/audio content generation (only text).
- Be a general‑purpose AI chat tool (focus is code‑to‑content).
- Guarantee 100% perfect content without human review (the user always has final edit).

---

## 9. Operational Concept & High‑Level Scenarios

1. **Feature announcement blog post**  
   A bootstrapped founder creates a workflow: `research → copywriting → humanizer`. They point it to their repository, run it, get a draft blog post, edit, and publish to WordPress.

2. **Automated release notes on GitHub**  
   An open‑source maintainer adds our GitHub Action to their repo. On each new release, the Action triggers a workflow that generates release notes from commits and creates a PR updating `RELEASE_NOTES.md`.

3. **Investor‑friendly technical summary**  
   A technical co‑founder runs a workflow that extracts key architectural components from the codebase and generates a concise summary for a pitch deck. They share the result via a temporary public link (future feature).

---

## 10. Stakeholders & Governance

- **Primary owner:** [User] – product lead, author of this vision.
- **Key stakeholders:** Alex (bootstrapped founder), Jamie (open‑source maintainer), Taylor (technical co‑founder) – their feedback shaped the scope.
- **Approval:** Changes to this vision document require product lead approval and stakeholder consultation.

---

## 11. Risks, Assumptions, and Open Questions

### Assumptions
- Developers are willing to pay for a tool that saves them time on content creation.
- AI can generate sufficiently accurate and useful content from code with minimal user correction.
- Users have access to their code (via GitHub) and are comfortable connecting it.
- Ingesting code with a `gitingest.com`‑style approach (collecting non‑markdown files) provides sufficient context for the AI.

### Risks
- Technical complexity: handling large codebases without performance degradation may be challenging.
- Market risk: developers may prefer to write content themselves or use generic AI tools.
- Competitive risk: existing tools (ChatGPT, etc.) improve and become easier to use.
- Adoption risk: users may not trust AI‑generated content without heavy editing.
- Privacy risk: users may be concerned about uploading their code (mitigation: clear privacy policy, ephemeral processing).

### Open Questions
- What is the optimal free‑tier usage limit? (Now set to 10 generations/month.)
- Which pricing model will resonate most? (Freemium with paid tiers.)
- Should we support other Git hosts (GitLab, Bitbucket) from the start? (No, MVP GitHub only.)

---

**Document Status:** Approved – reflects stakeholder feedback from 2026-03-14 review.

---
---


# Business & Stakeholder Requirements Specification

| Field | Value |
|-------|-------|
| Project | AI Content Agent Dashboard |
| Document | Business & Stakeholder Requirements |
| Version | 0.2 (Updated) |
| Date | 2026-03-14 |
| Author | [User], assisted by AI |
| Status | Approved |

---

## 1. Business Context

### 1.1 Business Purpose
The purpose of this initiative is to provide solo developers with a tool that automatically generates high‑quality product content using composable AI agents. This enables them to focus on building software while maintaining effective communication with users and investors.

### 1.2 Problem / Opportunity
Solo developers spend significant time writing content that is essential for product adoption but is separate from their core development work. Generic AI tools require manual code copying and lack deep understanding of the codebase, often producing inaccurate or shallow content. There is an opportunity to create a seamless, code‑aware solution that turns a developer’s existing work into compelling narratives.

### 1.3 Scope Boundaries
- **In scope:** The product will serve solo developers globally (English‑speaking markets initially). It will integrate with GitHub for repository access, support workflows built from a library of AI agents, and offer output connectors for GitHub PR and WordPress in the MVP.
- **Out of scope:** Non‑technical content creators, large enterprise teams, support for languages beyond Rust/TypeScript in the initial release, connectors beyond GitHub PR and WordPress (others in roadmap).

---

## 2. Business Goals, Objectives & Success Metrics

| ID | Goal | Fit Criterion | Measurement Method |
|----|------|---------------|---------------------|
| BG‑1 | Acquire 100 active users within 3 months of launch | Count of users who generate at least one piece of content in the preceding 30 days | In‑app analytics |
| BG‑2 | Achieve 20% month‑over‑month growth in signups | Percentage increase in new user registrations each month | Analytics dashboard |
| BG‑3 | Reach $X MRR within 6 months (if monetised) | Monthly recurring revenue from paid subscriptions | Stripe / billing system |
| BG‑4 | Maintain user satisfaction ≥ 4.5/5 | Average score from in‑app NPS/CES survey after first week of use | Post‑generation survey |

---

## 3. Business Model & Processes

### 3.1 Value Proposition
The product delivers unique value by:
- Allowing users to build custom content workflows from expert‑crafted AI agents.
- Ingesting the developer’s actual code (via GitHub) to generate context‑aware, accurate content.
- Reducing content creation time from hours to minutes.
- Offering a visual workflow editor with real‑time execution feedback.
- Automating content updates via GitHub Actions.

### 3.2 Revenue Model
- **Freemium:** A free tier with 10 content generations per month will be offered to drive adoption and validate demand.
- **Paid subscription:** Monthly or annual plans will provide higher usage limits, access to advanced agents, and more connectors.

### 3.3 Core Business Processes
1. **User onboarding:** New users sign up via GitHub OAuth, connect repositories, and are guided through a sandbox workflow.
2. **Workflow creation:** Users drag agents onto a canvas, configure inputs, and connect them.
3. **Workflow execution:** Manual or GitHub‑triggered; runs are tracked with live feedback.
4. **Publishing:** Results can be pushed to GitHub as a PR or published to WordPress (MVP).
5. **Billing & subscription:** Handled via a third‑party payment processor; usage limits enforced.

---

## 4. Business Rules & Policies

| ID | Rule / Policy | Rationale | Source |
|----|---------------|-----------|--------|
| BR‑1 | Users may only generate content from repositories they own or have explicit access to. | Prevents unauthorised use of others’ code. | Privacy / IP |
| BR‑2 | Generated content may be used by the user for any purpose; the company claims no ownership. | Builds trust and avoids legal ambiguity. | Legal / IP |
| BR‑3 | Free‑tier users are limited to 10 content generations per month. | Encourages conversion to paid plans. | Business model |
| BR‑4 | Code uploaded for generation will not be stored permanently; it will be discarded after the generation session. | Respects user privacy and reduces security risk. | Privacy |
| BR‑5 | Per‑repository customisation via `.codecontent.yaml` file is allowed. | Users can tailor prompts per project. | User feedback |

---

## 5. Stakeholders & User Classes

### 5.1 Stakeholder Map

| Stakeholder | Role / Concern | Influence |
|-------------|----------------|-----------|
| **Primary users** (Alex, Jamie) | Need to create content quickly and accurately. | High – product success depends on their adoption. |
| **Secondary users** (Taylor) | Similar needs; may also need content for investor pitches. | Medium |
| **The founder / product lead** | Owns the vision, development, and business decisions. | Ultimate decision‑maker. |
| **Investors / partners** (none at this stage) | Future potential stakeholders. | Not yet involved. |

### 5.2 User Classes & Personas

**Primary User Class: Bootstrapped Founder (e.g., “Alex”)**
- **Background:** 5 years dev experience, building a SaaS product alone. Wears many hats: coding, marketing, support.
- **Goals:** Quickly write blog posts to attract users; keep documentation up‑to‑date; avoid spending time on content.
- **Frustrations:** Writing takes time away from coding; generic AI tools produce off‑target content.
- **Jobs to Be Done:** “When I add a new feature, I want to generate a blog post about it so that I can announce it to my audience.”

**Primary User Class: Open‑Source Maintainer (e.g., “Jamie”)**
- **Background:** Maintains a popular open‑source project, collaborates with contributors worldwide.
- **Goals:** Keep README and other docs current; write release notes that clearly explain changes.
- **Frustrations:** Manual doc updates are tedious; users complain about outdated information.
- **Jobs to Be Done:** “When I merge a pull request, I want to automatically update the project documentation so that users always have correct information.”

**Secondary User Class: Technical Co‑founder (e.g., “Taylor”)**
- **Background:** Part of a 2‑person startup, handles both development and investor communication.
- **Goals:** Create compelling technical descriptions for pitch decks; document internal architecture for future hires.
- **Frustrations:** Translating technical complexity into business‑friendly language is difficult and time‑consuming.
- **Jobs to Be Done:** “When preparing for investor meetings, I want to generate a concise technical summary so that I can focus on my pitch.”

---

## 6. Glossary / Ubiquitous Language

| Term | Definition | Notes |
|------|------------|-------|
| **AI Agent** | A predefined, composable unit that performs a specific content‑related task (e.g., research, copywriting, SEO audit). | Formerly "skill". |
| **Workflow** | A sequence of connected agents that process data from a codebase to produce content. | |
| **Node** | An instance of an agent in a workflow. | |
| **Run** | A single execution of a workflow. | |
| **Output Connector** | A module that publishes generated content to an external platform (GitHub PR, WordPress, etc.). | |
| **Codebase** | The collection of source code files for a project, typically stored in a GitHub repository. | |
| **Content** | Any generated text output: documentation, blog posts, release notes, marketing copy, etc. | |
| **User** | The solo developer using the product. | |
| **Sandbox Mode** | A mode that allows users to test workflows on their own repos without consuming quota. | Up to 3 free tries. |

---

## 7. Conceptual Domain Model

```
User ── owns ──> Project
Project ── contains ──> Codebase (one or more repositories)
Project ── has ──> Workflow
Workflow ── composed of ──> Nodes (Agent instances)
Workflow ── has ──> Run
Run ── produces ──> Artifact
Artifact ── published via ──> OutputConnector
User ── subscribes to ──> Plan
Plan ── defines ──> Usage Limits
```

---

## 8. Stakeholder Needs & User Requirements (High‑Level)

| ID | User Class | Need / Goal |
|----|------------|-------------|
| SN‑1 | Alex (founder) | Generate a blog post announcing a new feature in under 5 minutes. |
| SN‑2 | Alex | Keep product documentation in sync with code changes without manual effort. |
| SN‑3 | Jamie (maintainer) | Automatically update README and generate release notes on each release. |
| SN‑4 | Jamie | Customise the prompt/tone per repository via a config file. |
| SN‑5 | Taylor (co‑founder) | Create a technical summary of the product’s architecture for investors. |
| SN‑6 | Taylor | Share run results with co‑founders without granting dashboard access. |
| SN‑7 | All users | Ensure generated content is accurate and reflects the actual code. |
| SN‑8 | All users | Maintain control over their code; code should not be stored permanently. |
| SN‑9 | All users | Be able to edit and refine generated content before final use. |
| SN‑10 | All users | Test workflows on their own repo without consuming quota (sandbox mode). |

---

## 9. System‑in‑Context & Operational Concept

The product will integrate into the user’s existing development workflow in the following ways:

1. **Manual content generation** – User visits the web app, selects a repository, chooses a workflow, and triggers generation. The system ingests the code (using a `gitingest.com`‑style approach), runs the agents, and returns a draft.

2. **Automatic content generation via GitHub Actions** – User adds our GitHub Action to their repository, configured via `.codecontent.yaml`. On events (push, release), the Action calls our API (authenticated via OIDC) to start a workflow. The Action can create a PR with the generated content.

3. **Publishing** – After a successful run, the user can publish artifacts via configured connectors. MVP connectors: GitHub PR (create/update a file in the repo) and WordPress (create a new post).

4. **Sandbox mode** – New users can try a workflow on their own public repo without using their monthly quota, to evaluate quality.

---

## 10. Stakeholder‑Level Constraints & Quality Expectations

| ID | Constraint / Expectation | Description |
|----|---------------------------|-------------|
| C‑1 | Language | The system must generate content in English only for the initial release. |
| C‑2 | Privacy | User code must not be stored permanently; it should be discarded after the generation session. |
| C‑3 | Availability | The service should be available during typical developer working hours with minimal downtime. |
| C‑4 | Trust | Generated content should be accurate enough that the user only needs minor edits. |
| C‑5 | Integration | The system must integrate with GitHub (OAuth, repo access, Actions) and provide clear documentation. |

---

## 11. Risks, Assumptions & Open Issues

### 11.1 Assumptions
- A‑1: Developers are willing to pay for a tool that saves them time on content creation.
- A‑2: AI can generate sufficiently accurate and useful content from code with minimal user correction.
- A‑3: Users have access to their code (via GitHub) and are comfortable connecting it.
- A‑4: Ingesting code with a `gitingest.com`‑like approach provides sufficient context for the AI.
- A‑5: Rust and TypeScript code can be effectively analyzed by the chosen AI model.

### 11.2 Risks
- R‑1: Technical complexity – handling large codebases without performance degradation.
- R‑2: Market risk – developers may prefer to write content themselves or use generic AI tools.
- R‑3: Competitive risk – existing tools improve.
- R‑4: Adoption risk – users may not trust AI‑generated content.
- R‑5: Privacy risk – code upload concerns.

### 11.3 Open Issues
- O‑1: Pricing model details (monthly/annual tiers).
- O‑2: Support for other Git hosts post‑MVP.
- O‑3: Handling extremely large repositories (performance).

---

## 12. Traceability Mapping to Vision

| Vision Goal (VG) | Business Goal (BG) | Stakeholder Need (SN) |
|------------------|--------------------|-----------------------|
| VG‑1 (100 active users) | BG‑1 | SN‑1, SN‑2, SN‑3, SN‑5, SN‑10 |
| VG‑2 (20% MoM growth) | BG‑2 | (all SNs) |
| VG‑3 ($X MRR) | BG‑3 | – |
| VG‑4 (CSAT ≥4.5) | BG‑4 | SN‑7, SN‑8, SN‑9, C‑1..C‑5 |

---

**Document Status:** Approved – reflects stakeholder feedback.

---
---


# Software Requirements Specification

| Field | Value |
|-------|-------|
| Project | AI Content Agent Dashboard |
| Document | Software Requirements Specification |
| Version | 0.2 (Updated) |
| Date | 2026-03-14 |
| Author | [User], assisted by AI |
| Status | Approved |

---

## 1. Introduction & Scope

### 1.1 Purpose
This SRS defines the functional and non‑functional requirements for the AI Content Agent Dashboard, incorporating decisions from stakeholder review.

### 1.2 Scope
The system is a web‑based SaaS application that allows solo developers to build and run AI‑powered content workflows, integrated with GitHub and publishing platforms. MVP features include a visual workflow editor, a library of AI agents, manual and GitHub‑triggered execution, GitHub PR and WordPress connectors, and sandbox mode.

### 1.3 References
- Vision & Strategic Alignment v0.2
- Business & Stakeholder Requirements v0.2
- ISO/IEC/IEEE 29148:2018

---

## 2. System Context & Overview

### 2.1 System Context
The system interacts with:
- **Users** via web browser.
- **GitHub** (OAuth, API, Actions).
- **LLM providers** (OpenAI, Anthropic, etc.).
- **External publishing platforms** (GitHub PR, WordPress initially).
- **Database** (Turso) for user data, workflows, runs, and configurations.

### 2.2 Actors
- **User** – creates workflows, triggers runs, manages settings.
- **GitHub** – provides authentication, repository content, and Actions.
- **GitHub Action** – calls the system’s API to trigger workflows on events.
- **LLM Service** – generates content.
- **Publishing Platform** – receives content via connectors.

### 2.3 High‑Level Capabilities
- User authentication via GitHub OAuth.
- Repository selection and code ingestion (on‑demand).
- Visual workflow editor with drag‑and‑drop node assembly.
- Library of AI agents (research, copywriting, SEO, humanizer, etc.).
- Workflow execution (manual and GitHub‑triggered).
- Output connectors for GitHub PR and WordPress.
- Sandbox mode for testing without quota consumption.
- Usage tracking and plan enforcement (free tier: 10 runs/month).

---

## 3. Functional Requirements

### 3.1 User Authentication & Account Management

| ID | Title | Description | Priority | Acceptance Criteria |
|----|-------|-------------|----------|---------------------|
| REQ‑FUNC‑001 | GitHub OAuth | User can sign in with GitHub; system stores profile and token. | Must | – User can sign in and is returned to dashboard.<br>– Token stored encrypted. |
| REQ‑FUNC‑002 | Profile Storage | System stores GitHub username, email, name, avatar. | Must | Profile visible in settings. |

### 3.2 Workflow Management

| ID | Title | Description | Priority | Acceptance Criteria |
|----|-------|-------------|----------|---------------------|
| REQ‑FUNC‑003 | Workflow CRUD | User can create, view, edit, delete workflows. Workflow definition stored as JSON with versioning. | Must | – Workflow list shows all workflows.<br>– Edit and save creates new version. |
| REQ‑FUNC‑004 | Visual Workflow Editor | Drag‑and‑drop interface to add agents, connect nodes, configure inputs. | Must | – User can drag agents from palette.<br>– Connections validated by type.<br>– Configuration panel appears on node click. |
| REQ‑FUNC‑005 | Version History | User can view past versions of a workflow and restore. | Should | – Side panel shows version list with timestamps.<br>– Restore creates new version. |

### 3.3 Agent Execution

| ID | Title | Description | Priority | Acceptance Criteria |
|----|-------|-------------|----------|---------------------|
| REQ‑FUNC‑006 | Agent Library | System exposes list of available agents with descriptions and I/O schemas. | Must | – API returns list of agents.<br>– UI shows agent cards. |
| REQ‑FUNC‑007 | Execute Agent | When a workflow is run, each agent executes with given input, calling LLM with prompt template and returning structured output. | Must | – Agent execution respects input schema.<br>– Output validated against schema. |
| REQ‑FUNC‑008 | Error Handling | If an agent fails (LLM error, validation error), the run stops and marks that node as failed. Downstream nodes are not executed. | Must | – Run status shows failed node.<br>– Error message displayed. |
| REQ‑FUNC‑009 | Retry from Failed Node | (v2) User can retry a run from a specific node. | Won't | – Postponed. |
| REQ‑FUNC‑010 | Sandbox Mode | New users can run a workflow on their own public repository without consuming monthly quota, up to 3 sandbox runs. | Should | – Sandbox runs tracked separately.<br>– Quota not decremented. |

### 3.4 GitHub Integration

| ID | Title | Description | Priority | Acceptance Criteria |
|----|-------|-------------|----------|---------------------|
| REQ‑FUNC‑011 | List Repositories | After auth, user can see list of their GitHub repos. | Must | – Paginated list with search.<br>– User can select repos for workflows. |
| REQ‑FUNC‑012 | Fetch Code | System fetches code from GitHub on‑demand for a run; code not stored permanently. | Must | – Code retrieved via API.<br>– No code stored after run. |
| REQ‑FUNC‑013 | GitHub Webhook | System accepts GitHub webhook events (push, release) and can trigger workflows based on user configuration. | Should | – Webhook endpoint validates signature.<br>– Workflow started with event data. |
| REQ‑FUNC‑014 | GitHub Action OIDC | System exposes endpoint for GitHub Action calls authenticated via GitHub OIDC token. | Should | – Token validated against GitHub JWKS.<br>– Endpoint starts workflow and returns job ID. |
| REQ‑FUNC‑015 | Per‑Repo Config | Workflow can be configured via `.codecontent.yaml` in the repo; config includes custom prompts, agents to run, and output settings. | Should | – System reads and applies config.<br>– Config overrides default workflow parameters. |

### 3.5 Output Connectors

| ID | Title | Description | Priority | Acceptance Criteria |
|----|-------|-------------|----------|---------------------|
| REQ‑FUNC‑016 | Connector Configuration | User can configure connectors (GitHub PR, WordPress) with required credentials. | Must | – Form for each connector.<br>– Test button validates connection. |
| REQ‑FUNC‑017 | GitHub PR Connector | After a run, user can push generated content to a new branch and create a PR in the target repository. | Must (MVP) | – User selects target file path.<br>– PR is created with content.<br>– PR link shown. |
| REQ‑FUNC‑018 | WordPress Connector | After a run, user can publish content as a new WordPress post. | Must (MVP) | – User enters title, categories.<br>– Post created; link shown. |
| REQ‑FUNC‑019 | Publish from Run | On run details page, user sees "Publish" button for eligible artifacts. | Must | – Click opens modal with connector options.<br>– Async publishing with progress notification. |

### 3.6 Usage Tracking & Quotas

| ID | Title | Description | Priority | Acceptance Criteria |
|----|-------|-------------|----------|---------------------|
| REQ‑FUNC‑020 | Track Generations | Each successful agent execution (or workflow completion?) counts as one generation against user’s monthly quota. | Must | – Count incremented after successful run.<br>– Free tier: 10 per month. |
| REQ‑FUNC‑021 | Enforce Quota | If user exceeds quota, new runs blocked with upgrade prompt. | Must | – Run button disabled or returns error.<br>– Clear message with upgrade link. |
| REQ‑FUNC‑022 | Sandbox Quota | Sandbox runs limited to 3 per user, never reset. | Should | – Sandbox counter tracked. |

### 3.7 Security & Privacy

| ID | Title | Description | Priority | Acceptance Criteria |
|----|-------|-------------|----------|---------------------|
| REQ‑FUNC‑023 | Encrypt Tokens | GitHub OAuth tokens and connector API keys encrypted at rest. | Must | – Encryption verified. |
| REQ‑FUNC‑024 | Ephemeral Code | Code fetched from GitHub is discarded after run; not written to disk or database. | Must | – Code only in memory; logs checked. |

---

## 4. Non‑functional Requirements

| ID | Title | Description | Fit Criterion | Verification |
|----|-------|-------------|---------------|--------------|
| NFR‑PERF‑001 | Generation Latency | 95% of runs complete within 30 seconds (including LLM time). | p95 ≤ 30s | Load test |
| NFR‑PERF‑002 | Throughput | System handles 20 concurrent runs per minute. | 20 RPM, error <1% | Load test |
| NFR‑REL‑001 | Availability | 99.5% uptime during core hours (8‑20 UTC). | Monthly uptime ≥99.5% | Uptime monitoring |
| NFR‑SEC‑001 | TLS | All traffic encrypted with TLS 1.2+. | No plaintext HTTP | SSL scan |
| NFR‑SEC‑002 | Token Encryption | All secrets encrypted at rest. | AES‑256 or equivalent | Code review |
| NFR‑SEC‑003 | Code Disposal | No code stored permanently. | Data flow audit | Inspection |
| NFR‑SEC‑004 | Circuit Breaker | LLM calls have circuit breaker with exponential backoff. | Prevents cascading failures | Code review |
| NFR‑UI‑001 | First‑time UX | 80% of new users complete first run in ≤5 min. | Usability test | Analytics |
| NFR‑UI‑002 | Mobile Responsive | Core tasks usable on tablet/mobile. | No layout breakage | Cross‑browser test |

---

## 5. External Interfaces & Data Contracts

### 5.1 GitHub API
- OAuth 2.0 for user authentication.
- REST API for listing repos, fetching content, creating PRs.
- Rate limits: implement caching and respect.

### 5.2 GitHub Action API Endpoint
- `POST /api/v1/github-action/trigger`
- Authentication: OIDC token (validate via GitHub JWKS).
- Payload includes repository, event, config (from `.codecontent.yaml`).

### 5.3 LLM Adapter Interface
```typescript
interface AIService {
  generateContent(params: {
    codeContext: string;
    prompt?: string;
    agentType: string;
  }): Promise<string>;
}
```

### 5.4 Connector Interfaces
```typescript
interface OutputConnector {
  id: string;
  name: string;
  configSchema: z.ZodObject;
  publish(content: string, config: any): Promise<{ success: boolean; url?: string; error?: string }>;
}
```

### 5.5 Database Schema (Conceptual with Drizzle)
- `users`: id, githubId, email, name, avatarUrl, plan, usage_month, sandbox_used, createdAt, updatedAt
- `workflows`: id, userId, name, currentVersionId, createdAt
- `workflow_versions`: id, workflowId, version, definition (JSON), changelog, createdAt
- `runs`: id, workflowId, status, startedAt, completedAt, nodeResults (JSON), finalArtifacts (JSON)
- `connectors`: id, userId, type, config (encrypted), createdAt

---

## 6. Constraints, Assumptions & Dependencies

### 6.1 Constraints
- C‑SRS‑1: Technology stack as per architecture (Next.js, Drizzle, Turso, Vercel).
- C‑SRS‑2: GitHub only for MVP.
- C‑SRS‑3: Code must be ephemeral.

### 6.2 Assumptions
- A‑SRS‑1: AI models can generate quality content from code.
- A‑SRS‑2: Users comfortable with GitHub OAuth.
- A‑SRS‑3: `gitingest.com`‑style ingestion sufficient.

### 6.3 Dependencies
- GitHub API availability.
- LLM service availability.
- Turso managed database.

---

## 7. TBD Log

| ID | Description | Owner | Status |
|----|-------------|-------|--------|
| TBD‑1 | Exact free tier limit (now 10) | Pat | Resolved |
| TBD‑2 | Pricing model | Pat | Open |
| TBD‑3 | Large repo handling | Sam | Spike needed |

---

## 8. Requirements Attributes & Traceability

(Detailed RTM to be maintained separately.)

---

**Document Status:** Approved – reflects stakeholder feedback.

---
---


# Architecture & Design Specification

| Field | Value |
|-------|-------|
| Project | AI Content Agent Dashboard |
| Document | Architecture & Design Specification |
| Version | 0.2 (Updated) |
| Date | 2026-03-14 |
| Author | [User], assisted by AI |
| Status | Approved |

---

## 1. Context & Scope

### 1.1 Objective
This document describes the high‑level architecture of the AI Content Agent Dashboard, incorporating stakeholder decisions: free tier 10 generations/month, sandbox mode, per‑repo config, GitHub PR connector first, error handling (stop on failure), circuit breaker, API versioning via URL path, and OIDC for GitHub Actions.

### 1.2 Problem Recap
Solo developers need to generate product content from their code. The system provides a web interface and GitHub Action to trigger AI‑powered content workflows, with a focus on privacy, performance, and ease of use.

### 1.3 Key Constraints
- **Stack:** TypeScript, Next.js (App Router), Drizzle ORM, Turso (SQLite, Europe single region), Vercel.
- **Code privacy:** Ephemeral.
- **Integration:** GitHub (OAuth, API, Actions), LLM providers, publishing platforms.
- **Performance:** 95% of runs ≤30s, 20 RPM.
- **Availability:** 99.5% during core hours.

---

## 2. Goals & Non‑goals (Design‑Level)

### 2.1 Goals
- **G‑1:** Build a modular, maintainable system with pluggable agents and connectors.
- **G‑2:** Ensure user code privacy through ephemeral processing and secure handling of tokens.
- **G‑3:** Deliver a responsive web UI meeting performance targets.
- **G‑4:** Provide a simple, reliable GitHub Action with OIDC authentication.
- **G‑5:** Enable per‑repository customisation via config file.
- **G‑6:** Support sandbox mode for new users.
- **G‑7:** Implement circuit breaker for LLM calls to improve resilience.
- **G‑8:** Version APIs from day one.

### 2.2 Non‑goals
- Multi‑user collaboration features.
- On‑premise deployment.
- Support for Git hosts other than GitHub in MVP.
- Real‑time updates beyond polling.

---

## 3. Architecturally Significant Requirements (ASRs)

| ID | ASR | Source |
|----|-----|--------|
| ASR‑1 | Code must not be stored permanently. | NFR‑SEC‑003 |
| ASR‑2 | 95% runs ≤30s. | NFR‑PERF‑001 |
| ASR‑3 | 20 RPM. | NFR‑PERF‑002 |
| ASR‑4 | GitHub tokens encrypted. | NFR‑SEC‑002 |
| ASR‑5 | 99.5% uptime. | NFR‑REL‑001 |
| ASR‑6 | GitHub Action OIDC auth. | REQ‑FUNC‑014 |
| ASR‑7 | Per‑repo config. | REQ‑FUNC‑015 |
| ASR‑8 | Sandbox mode. | REQ‑FUNC‑010 |
| ASR‑9 | Circuit breaker for LLM. | NFR‑SEC‑004 |
| ASR‑10 | Stop run on node failure. | REQ‑FUNC‑008 |
| ASR‑11 | API versioning. | Developer request |

---

## 4. The Design

### 4.1 High‑Level System Overview

```
[User Browser] <--> [Next.js Frontend (App Router)]
                         |
                         v
                  [Next.js API Routes]
                         |
         +---------------+---------------+
         |               |               |
    [Turso DB]      [GitHub API]     [LLM Service]
    (Drizzle ORM)        |                 |
                         |                 |
                  [GitHub Actions]   [Circuit Breaker]
                         (OIDC)
```

- **Frontend:** Next.js App Router – serves UI, handles user interactions, calls API.
- **Backend:** Next.js API routes – business logic, integration with GitHub, LLM, connectors; database access via Drizzle.
- **Database:** Turso (SQLite‑based, Europe single region) – stores users, workflows, runs, connector configs.
- **Background Job Processing:** Simple job table in Turso – runs are created and processed by a worker (Vercel cron or lightweight Node process). Frontend polls for status.
- **Circuit Breaker:** Wraps LLM calls; after 5 failures, opens for 30s.
- **API Versioning:** All endpoints under `/api/v1/`.

### 4.2 Key Design Decisions (ADRs)

#### ADR‑001: Use Next.js with API Routes
- **Context:** Full‑stack JavaScript application, team familiar with TypeScript/React.
- **Decision:** Use Next.js (App Router) for frontend and API routes for backend. Keeps codebase unified, simplifies deployment on Vercel.
- **Consequences:** +Unified stack; –Serverless cold starts, acceptable for expected load.

#### ADR‑002: Database – Turso with Drizzle ORM
- **Context:** Need relational database, user preference for Drizzle and Turso.
- **Decision:** Use Turso (SQLite‑based, Europe single region) with Drizzle ORM.
- **Consequences:** +Simple, performant; –SQLite concurrency mitigated by Turso; job queue design avoids write contention.

#### ADR‑003: Background Job Processing with Database Polling
- **Context:** Generation may take seconds; need async approach.
- **Decision:** Use a `runs` table in Turso with status. A worker picks pending runs, executes them, updates status. Frontend polls `/api/v1/runs/:id`.
- **Consequences:** +No extra infra; –Polling latency acceptable for MVP.

#### ADR‑004: GitHub Action Authentication via OIDC
- **Context:** Need secure auth from Action.
- **Decision:** Validate OIDC token using GitHub's JWKS endpoint. Token must include expected repository and workflow claims.
- **Consequences:** +No long‑lived secrets; –Complex validation; must handle token expiry and clock skew.

#### ADR‑005: AI Service Abstraction with Pluggable Adapter
- **Context:** May switch LLM providers.
- **Decision:** Create adapter interface; implement for OpenAI, Anthropic, etc.
- **Consequences:** +Flexibility; –Slight overhead.

#### ADR‑006: Output Connectors – Pluggable Adapter Pattern
- **Context:** Need to support multiple publishing platforms.
- **Decision:** Define `OutputConnector` interface; each connector is a separate module. Configuration stored encrypted.
- **Consequences:** +Extensible; –Maintenance of many integrations.

#### ADR‑007: Skill Definition Loading
- **Context:** Agent definitions in markdown.
- **Decision:** Parse markdown at build time, generate TypeScript registry.
- **Consequences:** +Fast access; –Requires rebuild for new agents.

#### ADR‑008: Structured Output Schemas
- **Context:** Use Vercel AI SDK's `generateObject`.
- **Decision:** Each agent has a Zod schema for output; used for validation and type safety.
- **Consequences:** +Reliable; –Manual schema definition.

#### ADR‑009: API Versioning
- **Decision:** Use URL path versioning (`/api/v1/...`). Future versions will be `/api/v2/`, with deprecation period.
- **Consequences:** +Clear; –Maintaining multiple versions.

#### ADR‑010: Circuit Breaker for LLM Calls
- **Decision:** Implement circuit breaker around LLM calls. Threshold: 5 failures within 60s opens for 30s.
- **Consequences:** +Resilience; –Needs tuning.

#### ADR‑011: Workflow Error Handling – Stop on Failure
- **Decision:** Workflow executor stops on first node failure. Run marked `failed`.
- **Consequences:** +Simple; –No retry from failure point (v2 feature).

---

## 5. API & Interface Contracts

### 5.1 Base URL
All endpoints under `/api/v1/`.

### 5.2 Key Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/v1/auth/[...nextauth]` | Various | NextAuth.js GitHub OAuth | Public |
| `/api/v1/workflows` | GET, POST | List/create workflows | Session |
| `/api/v1/workflows/:id` | GET, PUT, DELETE | Get/update/delete | Session |
| `/api/v1/workflows/:id/versions` | GET | List versions | Session |
| `/api/v1/workflows/:id/run` | POST | Start run | Session |
| `/api/v1/runs` | GET | List runs | Session |
| `/api/v1/runs/:id` | GET | Get run details | Session |
| `/api/v1/agents` | GET | List agents | Session |
| `/api/v1/connectors` | GET | List connectors | Session |
| `/api/v1/connectors/:id/test` | POST | Test connector | Session |
| `/api/v1/github/webhook` | POST | GitHub webhook | GitHub secret |
| `/api/v1/github-action/trigger` | POST | GitHub Action trigger | OIDC token |

### 5.3 Database Schema (Drizzle)

**users**
- `id`: text (primary)
- `githubId`: integer (unique)
- `email`: text
- `name`: text
- `avatarUrl`: text
- `plan`: text ('free', 'pro')
- `usage_month`: integer (default 0)
- `sandbox_used`: integer (default 0)
- `createdAt`: timestamp
- `updatedAt`: timestamp

**workflows**
- `id`: text (primary)
- `userId`: text (foreign key)
- `name`: text
- `currentVersionId`: text (nullable)
- `createdAt`: timestamp

**workflow_versions**
- `id`: text (primary)
- `workflowId`: text (foreign key)
- `version`: integer
- `definition`: json
- `changelog`: text (optional)
- `createdAt`: timestamp

**runs**
- `id`: text (primary)
- `workflowId`: text (foreign key)
- `status`: text ('pending', 'running', 'completed', 'failed')
- `startedAt`: timestamp
- `completedAt`: timestamp (nullable)
- `nodeResults`: json
- `finalArtifacts`: json (nullable)

**connectors**
- `id`: text (primary)
- `userId`: text (foreign key)
- `type`: text ('github-pr', 'wordpress')
- `config`: text (encrypted JSON)
- `createdAt`: timestamp

---

## 6. Cross‑cutting Concerns

### 6.1 Security
- **Encryption:** All secrets encrypted at rest using AES‑256.
- **OIDC validation:** Verify JWT signature, issuer, and claims.
- **CORS:** Restrict to frontend origin.

### 6.2 Observability
- **Logging:** Structured logs with request IDs.
- **Metrics:** Run times, error rates, circuit breaker state.
- **Monitoring:** Vercel Analytics, custom dashboard.

### 6.3 Rate Limiting & Quotas
- **Per‑user:** Enforce monthly generation limit (10 for free).
- **Sandbox:** Limit 3 total.
- **API‑wide:** Vercel Firewall for basic DDoS.

### 6.4 Cost Management
- Track LLM token usage per user; alert on high usage.

---

## 7. Alternatives Considered

- **Redis for job queue:** Rejected for simplicity (database polling).
- **Long‑lived tokens for GitHub Action:** Rejected in favour of OIDC.
- **Synchronous generation:** Rejected for better UX.
- **Other ORMs (Prisma):** User chose Drizzle.

---

## 8. Traceability (ASR → Design Decisions)

| ASR | Design Decision(s) |
|-----|---------------------|
| ASR‑1 | Ephemeral code handling |
| ASR‑2 | Asynchronous runs, job polling |
| ASR‑3 | Job polling, Vercel scaling |
| ASR‑4 | Encrypted storage |
| ASR‑5 | Vercel, Turso |
| ASR‑6 | OIDC validation |
| ASR‑7 | Per‑repo config fetching |
| ASR‑8 | Sandbox counter |
| ASR‑9 | Circuit breaker |
| ASR‑10 | Stop on failure |
| ASR‑11 | URL path versioning |

---

**Document Status:** Approved – reflects stakeholder feedback.

---
---


# Behavioral Specification & Test Verification

| Field | Value |
|-------|-------|
| Project | AI Content Agent Dashboard |
| Document | Behavioral Specification & Test Verification |
| Version | 0.2 (Updated) |
| Date | 2026-03-14 |
| Author | [User], assisted by AI |
| Status | Approved |

---

## 1. Introduction & Scope

### 1.1 Purpose
This document defines the behavioral specifications (executable examples) and the test verification strategy for the AI Content Agent Dashboard. It covers the key user journeys, edge cases, and quality attributes, and provides traceability from requirements to tests.

### 1.2 Scope
The scope includes:
- User authentication and GitHub integration.
- Workflow creation, editing, versioning.
- Workflow execution (manual and automated triggers).
- Agent execution and structured outputs.
- Output connector configuration and publishing.
- GitHub webhook and Action integration.
- Sandbox mode and quota enforcement.
- Non‑functional verification (performance, security, privacy).

---

## 2. Behavioral Specifications (BDD / Specification by Example)

### 2.1 User Authentication & GitHub Integration

```
Scenario: New user signs in with GitHub for the first time
  Given the user is not logged in
  When they click "Sign in with GitHub"
    and authorize the application on GitHub
  Then the system creates a new user account
    and redirects to the dashboard
    and displays the user's GitHub username and avatar
    and shows an empty list of workflows

Scenario: Returning user signs in
  Given the user has previously signed in
  When they click "Sign in with GitHub"
    and re‑authorize (if required)
  Then the system logs them in
    and shows their existing workflows and runs

Scenario: User revokes GitHub access
  Given the user is logged in
  When they revoke the application in GitHub settings
    and attempt to refresh the page
  Then the system logs them out
    and shows an error: "GitHub authorization lost. Please sign in again."
```

**Traceability:** REQ‑FUNC‑001, REQ‑FUNC‑002

---

### 2.2 Workflow Management

```
Scenario: User creates a new workflow from scratch
  Given the user is on the workflows page
  When they click "New Workflow"
    and enter "Release Notes Generator" as the name
    and add a node of agent "research-writer"
    and add a node of agent "copywriting"
    and connect the output of the first node to the input of the second
    and save the workflow
  Then the workflow appears in the list
    and a new version (v1) is recorded
    and the workflow definition is stored with the given nodes and connections

Scenario: User edits an existing workflow
  Given the user has a workflow "Release Notes Generator"
  When they open it
    and add a third node of agent "humanizer"
    and save
  Then a new version (v2) is created
    and the previous version (v1) remains in history

Scenario: User attempts to create a workflow with an invalid connection
  Given the user is editing a workflow
    and node A outputs a string
    and node B expects an object with a "summary" field
  When they connect node A to node B
  Then the system shows a warning: "Output type does not match expected input"
    and prevents saving until fixed
```

**Traceability:** REQ‑FUNC‑003, REQ‑FUNC‑004, REQ‑FUNC‑005

---

### 2.3 Workflow Execution

```
Scenario: User runs a workflow and sees progress
  Given the user has a workflow with two agents
  When they click "Run"
  Then a new run is created with status "pending"
    and the UI polls the run status
    and after a few seconds, the status becomes "running"
    and node 1 shows "completed", node 2 "running"
    and finally both nodes "completed"
    and the final output of the last node is displayed
    and the run is marked "completed" with a timestamp

Scenario: Workflow fails at a node and stops
  Given a workflow with two agents
    and the first agent is configured to always fail
  When the user runs the workflow
  Then the run status becomes "failed"
    and the first node is marked "failed"
    and the second node is not executed
    and the run details show the error message

Scenario: Sandbox mode does not consume quota
  Given a new user with 0 sandbox runs
    and 0 quota used this month
  When they run a workflow in sandbox mode
  Then the run succeeds
    and their quota usage remains 0
    and sandbox_used becomes 1

Scenario: Workflow hits free‑tier limit
  Given the user is on the free plan
    and has already used 10 generations this month
  When they attempt to run a workflow
  Then the system rejects the request
    and shows a message: "You have reached your monthly limit. Upgrade to continue."
```

**Traceability:** REQ‑FUNC‑007, REQ‑FUNC‑008, REQ‑FUNC‑010, REQ‑FUNC‑020, REQ‑FUNC‑021

---

### 2.4 GitHub Integration

```
Scenario: GitHub Action triggers workflow with OIDC token
  Given a GitHub Action configured in a repository
    and a valid OIDC token
  When the Action calls POST /api/v1/github-action/trigger
    with the token and event data
  Then the API validates the token
    and starts the configured workflow
    and returns a job ID

Scenario: Per‑repo config overrides workflow parameters
  Given a repository contains a .codecontent.yaml file
    with custom prompt for the copywriting agent
  When the GitHub Action triggers the workflow
  Then the workflow uses the custom prompt
    and the generated content reflects it
```

**Traceability:** REQ‑FUNC‑014, REQ‑FUNC‑015

---

### 2.5 Output Connectors

```
Scenario: Publish to GitHub PR
  Given a completed run with a markdown artifact
    and a configured GitHub PR connector
  When the user clicks "Publish as PR"
    and selects target path "docs/new-feature.md"
  Then a new branch is created
    and a PR is opened with the content
    and the run details show the PR link

Scenario: Publish to WordPress
  Given a completed run with a blog post artifact
    and a configured WordPress connector
  When the user clicks "Publish to WordPress"
    and enters a title and category
  Then a new WordPress post is created
    and the run details show the post URL
```

**Traceability:** REQ‑FUNC‑017, REQ‑FUNC‑018

---

### 2.6 Edge Cases and Unwanted Behaviour

```
Scenario: Circuit breaker opens after repeated LLM failures
  Given the LLM service is failing
  When 5 workflow runs are attempted in quick succession
  Then the 6th run fails immediately with "LLM service temporarily unavailable"
    and does not call the LLM API

Scenario: Invalid OIDC token is rejected
  Given a GitHub Action call with an expired token
  When the API receives the request
  Then it returns 401 Unauthorized
    and does not start a workflow

Scenario: Sandbox limit reached
  Given a user has used 3 sandbox runs
  When they attempt another sandbox run
  Then the system blocks it with a message
    and suggests signing up for a paid plan
```

**Traceability:** NFR‑SEC‑004, REQ‑FUNC‑014, REQ‑FUNC‑022

---

## 3. Test Strategy

### 3.1 Test Pyramid / Trophy
- **Static checks:** TypeScript, ESLint, Prettier.
- **Unit tests:** Individual functions, agent execution (mocked LLM).
- **Integration tests:** API endpoints with test database; workflow engine.
- **End‑to‑end tests:** Critical user journeys with Playwright.
- **Contract tests:** For GitHub and WordPress APIs (Pact).
- **Performance tests:** k6 for load testing.
- **Security tests:** SAST, dependency scanning, penetration testing.

### 3.2 Test Case Specifications (Sample)

| Test ID | Requirement | Description | Steps | Expected Result | Automation |
|---------|-------------|-------------|-------|------------------|------------|
| TC‑AUTH‑001 | REQ‑FUNC‑001 | New user sign‑in via GitHub | 1. Navigate to /login 2. Click GitHub 3. Authorize | Redirect to dashboard, user created | Playwright |
| TC‑WORKFLOW‑001 | REQ‑FUNC‑003 | Create workflow with two nodes | 1. New workflow 2. Add nodes 3. Connect 4. Save | Workflow saved; appears in list | API test |
| TC‑RUN‑008 | REQ‑FUNC‑008 | Node failure stops run | 1. Create workflow with failing node 2. Run 3. Check run status | Run status = failed; second node not executed | API test |
| TC‑SAND‑001 | REQ‑FUNC‑010 | Sandbox usage | 1. New user runs sandbox 2. Check quota | quota unchanged, sandbox count =1 | API test |
| TC‑OIDC‑001 | REQ‑FUNC‑014 | Valid OIDC token | 1. Mock GitHub OIDC token 2. Call endpoint | 200 OK, run started | Integration test |
| TC‑OIDC‑002 | REQ‑FUNC‑014 | Invalid token | 1. Call with bad token | 401 Unauthorized | Integration test |
| TC‑CONFIG‑001 | REQ‑FUNC‑015 | Per‑repo config | 1. Mock repo with config 2. Trigger workflow | Workflow uses custom prompt | Integration test |
| TC‑PUB‑001 | REQ‑FUNC‑017 | Publish to GitHub PR | 1. Completed run 2. Publish to PR | PR created with content | Integration test |
| TC‑CIRCUIT‑001 | NFR‑SEC‑004 | Circuit breaker opens | 1. Simulate LLM failures 2. 6th request | Fast failure with error | Integration test |

---

## 4. Verification Methods per Requirement (I/A/D/T)

| Requirement | Verification Method | Artefact / Evidence |
|-------------|---------------------|----------------------|
| REQ‑FUNC‑001 | Test | TC‑AUTH‑001 |
| REQ‑FUNC‑002 | Test | TC‑AUTH‑002 (profile check) |
| REQ‑FUNC‑003 | Test | TC‑WORKFLOW‑001 |
| REQ‑FUNC‑004 | Test | TC‑WORKFLOW‑002 (editor) |
| REQ‑FUNC‑005 | Test | TC‑WORKFLOW‑003 (versioning) |
| REQ‑FUNC‑006 | Test | TC‑AGENT‑001 (list) |
| REQ‑FUNC‑007 | Test | TC‑AGENT‑002 (execution) |
| REQ‑FUNC‑008 | Test | TC‑RUN‑008 |
| REQ‑FUNC‑010 | Test | TC‑SAND‑001 |
| REQ‑FUNC‑011 | Test | TC‑GITHUB‑001 (list repos) |
| REQ‑FUNC‑012 | Analysis + Test | Code review; test with large repo |
| REQ‑FUNC‑013 | Test | TC‑WEBHOOK‑001 |
| REQ‑FUNC‑014 | Test | TC‑OIDC‑001, TC‑OIDC‑002 |
| REQ‑FUNC‑015 | Test | TC‑CONFIG‑001 |
| REQ‑FUNC‑016 | Test | TC‑CONN‑001 (configure) |
| REQ‑FUNC‑017 | Test | TC‑PUB‑001 |
| REQ‑FUNC‑018 | Test | TC‑PUB‑002 |
| REQ‑FUNC‑019 | Test | TC‑PUB‑003 (publish from run) |
| REQ‑FUNC‑020 | Test | TC‑QUOTA‑001 (track) |
| REQ‑FUNC‑021 | Test | TC‑QUOTA‑002 (enforce) |
| REQ‑FUNC‑022 | Test | TC‑SAND‑002 (limit) |
| REQ‑FUNC‑023 | Inspection | Code review, encryption check |
| REQ‑FUNC‑024 | Analysis | Data flow audit |
| NFR‑PERF‑001 | Test | k6 load test |
| NFR‑PERF‑002 | Test | k6 load test |
| NFR‑REL‑001 | Analysis | Uptime monitoring |
| NFR‑SEC‑001 | Inspection | SSL scan |
| NFR‑SEC‑002 | Inspection | Code review |
| NFR‑SEC‑003 | Analysis | Data flow audit |
| NFR‑SEC‑004 | Test | TC‑CIRCUIT‑001 |
| NFR‑UI‑001 | Demonstration + Test | Usability test, analytics |
| NFR‑UI‑002 | Test | Cross‑browser testing |

---

## 5. Requirements Traceability Matrix (RTM) – Sample

| Business Goal | Stakeholder Need | SRS Requirement | BDD Scenario | Test Case ID |
|---------------|------------------|-----------------|--------------|--------------|
| BG‑1 | SN‑1, SN‑3 | REQ‑FUNC‑007 | 2.3‑run | TC‑AGENT‑002 |
| BG‑1 | SN‑10 | REQ‑FUNC‑010 | 2.3‑sandbox | TC‑SAND‑001 |
| BG‑1 | SN‑3, SN‑4 | REQ‑FUNC‑014, REQ‑FUNC‑015 | 2.4‑oidc, 2.4‑config | TC‑OIDC‑001, TC‑CONFIG‑001 |
| BG‑4 | SN‑7 | REQ‑FUNC‑008 | 2.3‑failure | TC‑RUN‑008 |
| BG‑4 | SN‑8, SN‑9 | REQ‑FUNC‑009 (v2), REQ‑FUNC‑010, REQ‑FUNC‑023, REQ‑FUNC‑024 | – | TC‑SAND‑001, code review |

---

## 6. Living Documentation Strategy

- **BDD scenarios** stored as `.feature` files in `tests/features/`, written in Gherkin.
- **Test results** published in CI and linked to feature files.
- **RTM** maintained as a markdown table (or Google Sheet) updated each release.
- **Review cadence:** At end of each sprint, review and update scenarios to reflect new features.

---

## 7. Conclusion

This document provides a comprehensive verification strategy for the AI Content Agent Dashboard. By combining BDD scenarios, a test pyramid, and traceability, we ensure that all requirements are verifiable and that the system meets the quality expectations set forth in the SRS.

---

**Document Status:** Approved.

---
---


# UX Design Specification

| Field | Value |
|-------|-------|
| Project | AI Content Agent Dashboard |
| Document | UX Design Specification |
| Version | 1.0 (Updated) |
| Date | 2026-03-14 |
| Author | Senior UX Architect |
| Status | Approved |

---

## 1. Overview & Goals

### 1.1 Product Vision
Empower solo developers to effortlessly create high‑quality product content by assembling AI‑powered agents into automated workflows, and publish results to the platforms their audience uses.

### 1.2 UX Goals
- **Simplicity:** Reduce cognitive load; allow users to focus on content strategy, not tool configuration.
- **Transparency:** Show what the AI is doing at each step; build trust through observability.
- **Efficiency:** Enable power users to move quickly with keyboard shortcuts and templates.
- **Extensibility:** Make adding new agents and connectors feel natural, even if initially predefined.
- **Delight:** Celebrate completed workflows and published content with subtle animations and success feedback.

### 1.3 Target Users
- **Primary:** Solo developers (bootstrapped founders, open‑source maintainers) who are comfortable with code but not necessarily with AI prompt engineering.
- **Secondary:** Technical co‑founders in tiny startups who need to produce content for investors and users.

---

## 2. User Personas

### 2.1 Alex – The Bootstrapped Founder
- **Background:** 5 years dev experience, building a SaaS product alone. Wears many hats: coding, marketing, support.
- **Goals:** Quickly announce new features via blog posts; keep documentation updated without manual effort.
- **Frustrations:** Writing takes time away from coding; generic AI tools produce content that doesn’t understand his codebase.
- **Needs:** A tool that integrates with his GitHub repo, generates accurate content from code, and lets him publish directly to his blog.

### 2.2 Jamie – The Open‑Source Maintainer
- **Background:** Maintains a popular OSS project, collaborates with contributors worldwide.
- **Goals:** Keep README and contributor docs current; generate release notes from commit history.
- **Frustrations:** Manual doc updates are tedious; users complain about outdated information.
- **Needs:** Automated workflows triggered on merge/release, with outputs pushed as PRs to the repo.

### 2.3 Taylor – The Technical Co‑founder
- **Background:** Part of a 2‑person startup, handles both development and investor communication.
- **Goals:** Create compelling technical descriptions for pitch decks; document internal architecture for future hires.
- **Frustrations:** Translating technical complexity into business‑friendly language is hard; needs content that is accurate but accessible.
- **Needs:** A way to generate structured summaries from code, with ability to edit and refine.

---

## 3. User Journey Maps

### 3.1 First‑Time User Journey (Alex)

| Stage | Actions | Touchpoints | Emotions | Pain Points | Opportunities |
|-------|---------|-------------|----------|-------------|---------------|
| **Discovery** | Hears about tool from a newsletter, visits landing page. | Landing page | Curious, skeptical | Unclear value proposition | Show a demo video of a workflow in action; highlight integration with GitHub. |
| **Sign‑up** | Clicks "Sign in with GitHub", authorizes app. | GitHub OAuth screen | Cautious | Concern about permissions | Request only minimal repo access (read), explain why. |
| **Onboarding** | Lands on empty dashboard, sees a sample workflow template. | Dashboard | Overwhelmed | Doesn't know where to start | Offer a guided tour or a "Quick Start" template that’s ready to run. Also offer sandbox mode: "Try it now – run on your own repo for free (3 tries)". |
| **First Run** | Clicks "Run" on the sample workflow. | Workflow editor / run view | Anticipatory | Long wait; no progress feedback | Show real‑time step completion; add a progress bar; indicate sandbox mode usage. |
| **Review & Publish** | Sees generated blog post, edits, and publishes to GitHub PR. | Editor + publish modal | Satisfied | Publishing fails due to misconfigured connector | Provide a test button for connectors; show clear error messages; after successful publish, show PR link. |
| **Retention** | Returns to create a custom workflow for release notes. | Workflow editor | Confident | Forgets how to use the editor | Save templates; provide inline help and tooltips. |

---

## 4. Information Architecture

### 4.1 Sitemap

```
Dashboard
├── Home / Overview
│   ├── Recent runs
│   ├── Quick actions (Run a workflow)
│   └── Tip of the day
├── Workflows
│   ├── List view
│   ├── Create new
│   └── Workflow editor (with version history)
├── Runs
│   ├── List of past runs (status, duration)
│   └── Run details (node outputs, logs, publish options)
├── Agents
│   ├── Library of available agents (formerly "skills")
│   └── Agent detail (description, input/output schemas, examples)
├── Connectors
│   ├── List of configured connectors (GitHub PR first, WordPress second)
│   ├── Add/edit connector
│   └── Test connector
├── Settings
│   ├── Profile (GitHub info)
│   ├── API keys (LLM providers)
│   ├── Billing / Plan (shows usage and sandbox used)
│   └── GitHub integration (webhooks, Actions)
└── Help & Documentation
    ├── Getting started
    ├── FAQ
    └── Community (Discord link)
```

### 4.2 Navigation
- **Sidebar** (collapsible) with icons for main sections: Home, Workflows, Runs, Agents, Connectors, Settings, Help.
- **Top bar** shows user avatar, plan badge, sandbox used indicator (e.g., "Sandbox: 1/3"), and a global search.

---

## 5. Wireframes / Key Screens

### 5.1 Dashboard Home
- **Layout:** Two‑column. Left column: Recent runs (cards with status, time, workflow name). Right column: Quick start templates, tip of the day, and a call‑to‑action to create a new workflow. Also shows sandbox usage.

### 5.2 Workflows List
- **Table** with columns: Name, last run status, last run time, number of runs, actions (edit, run, delete).
- **Search/filter** bar at top.
- **Floating action button** to create new workflow.

### 5.3 Workflow Editor
- **Canvas** – drag‑and‑drop area where nodes are placed.
- **Node palette** – on the left, list of available agents (renamed from "skills") with icons. Users drag nodes onto canvas.
- **Node configuration panel** – on the right, appears when a node is selected. Shows input fields (prefilled from previous node outputs where possible) and a "Test node" button. Includes a toggle: "Use repository config (if present)" or a field to specify config file path.
- **Connections** – users drag from output port of one node to input port of another. Ports are colour‑coded by data type.
- **Toolbar** – above canvas: Undo/redo, zoom, fit to screen, run workflow, save, version history.
- **Version indicator** – shows current version (e.g., "v3"). Click opens side panel with version history.

### 5.4 Run Details
- **Header:** Workflow name, run ID, status, start/end time. If sandbox run, badge: "Sandbox – does not count toward quota".
- **Node list:** Expandable cards for each node, showing:
  - Inputs (with ability to view raw JSON)
  - Outputs (formatted preview)
  - Logs (if any)
  - Error message (if failed) – node highlighted in red.
- **Publish section:** Buttons for eligible connectors (GitHub PR first, WordPress second). After publish, show link.
- **Actions:** Re‑run, share (copy run ID), delete.

### 5.5 Agents Library
- **Grid of agent cards** with name, brief description, and an icon.
- Clicking a card opens a detail view: full description, input/output schema (with examples), and a "Use in workflow" button that creates a new workflow with that node pre‑added.

### 5.6 Connectors Configuration
- **List** of available connectors (GitHub PR, WordPress, etc.) with status (configured/not configured). GitHub PR listed first.
- **Add connector flow:** User selects connector, enters required fields (API keys, URLs), and clicks "Test". On success, the connector is saved.
- **Edit/delete** options.

### 5.7 Settings
- **Profile:** Display GitHub info; option to disconnect/reconnect.
- **LLM API Keys:** Input fields for OpenAI, Anthropic, etc. Keys are masked and encrypted.
- **Billing:** Show current plan, usage stats (generations used this month, sandbox used), upgrade button.
- **GitHub Integration:** List of repositories with webhook status; toggle to enable/disable triggers. Option to install GitHub App or configure webhook manually.

---

## 6. Interaction Design

### 6.1 Workflow Editor Interactions
- **Drag‑and‑drop:** Smooth, with snap‑to‑grid and guidelines when near other nodes.
- **Selection:** Single‑click selects node; double‑click opens configuration. Shift‑click for multi‑select.
- **Keyboard shortcuts:**
  - `Ctrl+Z` / `Cmd+Z` – undo
  - `Delete` – delete selected node(s)
  - `Space` – pan canvas (drag mode)
  - `Ctrl+R` / `Cmd+R` – run workflow
  - `Ctrl+S` / `Cmd+S` – save
- **Autosave:** Workflow saved automatically every 30 seconds, indicator "Saved just now".
- **Validation:** When connecting nodes, incompatible ports are highlighted in red; hover shows error message.

### 6.2 Run Execution Feedback
- **Progress bar** at top of canvas showing overall completion.
- **Node highlighting:** Border pulses while running, turns green on success, red on failure.
- **Live logs:** A small terminal‑like panel at bottom can be expanded to see real‑time log output from nodes.

### 6.3 Publishing Flow
- After a successful run, the run details page shows a "Publish" button next to each eligible artifact.
- Clicking opens a modal: choose connector, review options (e.g., target path, title, categories), and click "Publish".
- Publishing is asynchronous; a toast notification shows "Publishing started". When complete, the toast updates with a link to the published content.

### 6.4 Sandbox Mode
- On the run page, a checkbox "Use sandbox mode (does not count toward quota)" appears if user has remaining sandbox tries. If they exceed, the checkbox is disabled with tooltip: "No sandbox runs left. Upgrade to continue testing."
- Sandbox runs have a badge on the run details.

### 6.5 Circuit Breaker Error
- A toast notification: "LLM service is currently unavailable. We're retrying automatically." After circuit opens: "Service temporarily unavailable. Please try again in a few minutes."

### 6.6 Onboarding
- First‑time user sees a **welcome modal** with three options:
  1. **Create a new workflow from scratch**
  2. **Use a template** (e.g., "Blog post from code", "Release notes on merge")
  3. **Take a quick tour** (overlay highlighting key areas)
- After selection, user is guided appropriately.

---

## 7. Visual Design Guidelines

### 7.1 Brand & Tone
- **Professional yet approachable:** Clean lines, subtle gradients, friendly copy.
- **Developer‑centric:** Use monospace for code snippets, but avoid overwhelming with too much technical detail.

### 7.2 Colour Palette
- **Primary:** Indigo (#4F46E5) – for actions, links, active states.
- **Secondary:** Slate (#64748B) – for text, icons, borders.
- **Success:** Green (#10B981)
- **Error:** Red (#EF4444)
- **Warning:** Amber (#F59E0B)
- **Background:** White with light grey for panels (#F9FAFB).
- **Dark mode:** Support (optional MVP, but design with variables).

### 7.3 Typography
- **Headings:** Inter (sans‑serif)
- **Body:** Inter
- **Code:** JetBrains Mono or Fira Code (monospace)

### 7.4 Iconography
- Use a consistent icon set (e.g., Heroicons or Phosphor). Icons should be outline style, 20x20px.
- Agent icons could be simple shapes representing the agent type (e.g., research = magnifying glass, copywriting = pen).

### 7.5 Spacing & Layout
- Use an 8‑point grid system.
- Sidebar: 64px collapsed, 240px expanded.
- Content area padding: 24px.

---

## 8. Usability Testing Plan

### 8.1 Objectives
- Validate that users can complete the core tasks without assistance.
- Identify pain points in the workflow editor.
- Assess clarity of terminology (agent, node, connector, etc.).
- Measure time to first successful publish.

### 8.2 Methodology
- **Remote moderated testing** with 5‑8 participants matching personas.
- Tasks:
  1. Sign up with GitHub and create a workflow that generates a blog post from a sample repo.
  2. Run the workflow and publish the output to a GitHub PR.
  3. Edit the workflow to add a humanizer node and re‑run.
  4. Configure a GitHub webhook to trigger a workflow on push.
  5. Use sandbox mode to test on your own repo.
- **Metrics:** Task success rate, time on task, error rate, System Usability Scale (SUS).

### 8.3 Post‑test Interviews
- Gather qualitative feedback on terminology, discoverability of features, and overall satisfaction.

### 8.4 Iteration
- Use findings to refine UI, improve onboarding, and simplify complex interactions.

---

## 9. Accessibility Considerations

- Ensure colour contrast meets WCAG AA (minimum 4.5:1 for text).
- All interactive elements focusable and operable via keyboard.
- Provide alt text for icons (unless decorative).
- Use semantic HTML and ARIA labels where needed.
- Support screen readers for all major actions.

---

## 10. Technical Constraints & Considerations

- **Responsive design:** Dashboard should be usable on tablets; mobile usage expected to be low but should support viewing runs and simple edits.
- **Performance:** The canvas should handle up to 50 nodes without lag (use virtual rendering if necessary).
- **Real‑time updates:** Use Server‑Sent Events or WebSockets for run progress, with fallback to polling.

---

**Document Status:** Approved – reflects stakeholder feedback.
