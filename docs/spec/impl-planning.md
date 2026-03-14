# Implementation Planning: MVP Scope & User Stories

| Field | Value |
|-------|-------|
| Project | AI Content Agent Dashboard |
| Document | Implementation Plan & MVP Scope |
| Version | 1.0 |
| Date | 2026-03-14 |
| Author | [Product Manager / Architect] |
| Status | Draft – For Team Review |

---

## 1. MVP Vision

The Minimum Viable Product (MVP) will enable a solo developer to:

- Sign in with GitHub.
- Create a simple workflow using **two AI agents** (e.g., research‑writer → copywriting).
- Run the workflow on a selected GitHub repository.
- View the generated content in the UI.
- Publish the result as a **GitHub Pull Request** (e.g., update a docs file).
- Track runs and see node‑level outputs.
- Have a free tier with **sandbox mode** (3 free runs) to test the product.

This MVP validates the core value proposition: **turning code into content with minimal effort**.

---

## 2. MVP Scope (Must‑Have)

| Area | Features / Requirements | SRS References |
|------|-------------------------|----------------|
| **Authentication** | GitHub OAuth sign‑in, session management, user profile storage. | REQ‑FUNC‑001, REQ‑FUNC‑002 |
| **GitHub Integration** | List user repositories, fetch code on demand (ephemeral). | REQ‑FUNC‑011, REQ‑FUNC‑012 |
| **Agent Registry** | At least two agents: `research-writer` and `copywriting`. Agent definitions include input/output schemas. | REQ‑FUNC‑006, REQ‑FUNC‑007 |
| **Workflow Engine** | Create a workflow definition (JSON) with nodes and connections. Manual run trigger. Background worker to execute nodes sequentially. | REQ‑FUNC‑003, REQ‑FUNC‑004, REQ‑FUNC‑008 |
| **Run Tracking** | Store runs in DB with status and node results (structured outputs). Polling endpoint for frontend. | REQ‑FUNC‑015, REQ‑FUNC‑020 |
| **Frontend** | Dashboard home, workflows list, workflow editor (basic), run details view. | UX spec |
| **Output Connector** | GitHub PR connector: publish a generated file as a PR to the user’s repo. | REQ‑FUNC‑016, REQ‑FUNC‑017 |
| **Quota & Sandbox** | Free tier limit: 10 runs/month. Sandbox mode: 3 free runs (does not consume quota). | REQ‑FUNC‑010, REQ‑FUNC‑021, REQ‑FUNC‑022 |
| **Error Handling** | Stop workflow on node failure, display error in UI. Circuit breaker for LLM calls (basic). | REQ‑FUNC‑008, NFR‑SEC‑004 |
| **Infrastructure** | Turso DB setup, Ollama VM (or mock LLM), Vercel deployment, CI for OpenAPI validation. | – |

---

## 3. Out of Scope for MVP (Post‑MVP)

- GitHub webhook / Action triggers (manual runs only).
- WordPress connector.
- Version history for workflows.
- Per‑repo config via `.codecontent.yaml`.
- Advanced workflow editor features (e.g., zoom, undo/redo).
- Multiple output connectors per run.
- Team collaboration features.
- Other agents (SEO, humanizer, security scanner).

---

## 4. User Stories by Feature Area

### 4.1 Authentication & User Management

| ID | Story | Acceptance Criteria | Effort |
|----|-------|---------------------|--------|
| AUTH‑1 | As a user, I want to sign in with GitHub so that I can access the dashboard. | – Click "Sign in with GitHub" redirects to GitHub OAuth.<br>– After authorization, user is redirected to dashboard.<br>– User profile (GitHub username, avatar) is displayed. | 2 |
| AUTH‑2 | As a user, I want to see my current plan and usage (free tier). | – Dashboard shows plan (Free) and runs used this month.<br>– Sandbox runs used are shown separately. | 1 |

### 4.2 GitHub Repository Integration

| ID | Story | Acceptance Criteria | Effort |
|----|-------|---------------------|--------|
| GITHUB‑1 | As a user, I want to see a list of my GitHub repositories after signing in. | – On the "New Workflow" page, a dropdown/list of repos appears.<br>– Repositories are fetched via GitHub API using OAuth token. | 2 |
| GITHUB‑2 | As a user, I want to select a repository for my workflow so that the agents can access its code. | – Selected repo is stored with the workflow definition.<br>– When running the workflow, code is fetched from that repo (ephemeral). | 2 |

### 4.3 Agent Definitions

| ID | Story | Acceptance Criteria | Effort |
|----|-------|---------------------|--------|
| AGENT‑1 | As a developer, I want to define an agent with a Zod input/output schema. | – Agent registry contains `research-writer` and `copywriting`.<br>– Each agent has a `execute` method that calls LLM and validates output. | 3 |
| AGENT‑2 | As a user, I want to see available agents in the UI when building a workflow. | – "Agents" page lists agents with descriptions.<br>– In workflow editor, a palette shows agents that can be dragged. | 2 |

### 4.4 Workflow Management

| ID | Story | Acceptance Criteria | Effort |
|----|-------|---------------------|--------|
| WF‑1 | As a user, I want to create a new workflow by giving it a name and selecting a repository. | – Form with name, repo selector, and optional description.<br>– After creation, user is taken to the workflow editor. | 2 |
| WF‑2 | As a user, I want to add agents to my workflow and connect them. | – Workflow editor allows dropping agents onto canvas.<br>– Nodes can be connected (simple edge).<br>– Workflow definition JSON is auto‑generated. | 5 |
| WF‑3 | As a user, I want to configure an agent's inputs (constants or from previous node). | – Clicking a node opens a side panel with input fields based on agent schema.<br>– User can choose "constant" or "from previous node" and select the node/output key. | 4 |
| WF‑4 | As a user, I want to save my workflow. | – "Save" button stores workflow definition and creates a new version (v1).<br>– Workflow appears in the workflows list. | 2 |

### 4.5 Workflow Execution

| ID | Story | Acceptance Criteria | Effort |
|----|-------|---------------------|--------|
| RUN‑1 | As a user, I want to run my workflow and see progress in real time. | – "Run" button starts execution; frontend polls run status.<br>– Nodes highlight as they complete (green) or fail (red).<br>– Final output of last node displayed. | 5 |
| RUN‑2 | As a user, I want to see detailed results of each node (structured output). | – Run details page shows expandable cards for each node with output (formatted). | 2 |
| RUN‑3 | As a user, I want the run to stop if a node fails, and see the error. | – Failed node is marked red; error message shown.<br>– Subsequent nodes are not executed. | 2 |

### 4.6 Publishing

| ID | Story | Acceptance Criteria | Effort |
|----|-------|---------------------|--------|
| PUB‑1 | As a user, I want to configure a GitHub PR connector with my repo and target path. | – Settings page has "Connectors" tab.<br>– User enters repo, branch, file path, and personal access token (or uses OAuth).<br>– "Test" button verifies connection. | 3 |
| PUB‑2 | As a user, I want to publish a run's output as a GitHub PR. | – On run details, a "Publish as PR" button appears if a connector is configured.<br>– Click opens modal with target path (prefilled from connector) and optional branch name.<br>– After publish, a link to the PR is shown. | 3 |

### 4.7 Quota & Sandbox

| ID | Story | Acceptance Criteria | Effort |
|----|-------|---------------------|--------|
| QUOTA‑1 | As a user on the free plan, I want to know how many runs I have left this month. | – Dashboard displays "Runs used this month: X/10".<br>– When limit reached, "Run" button is disabled with upgrade message. | 2 |
| QUOTA‑2 | As a new user, I want to try the product without consuming my quota (sandbox mode). | – On run modal, a checkbox "Use sandbox mode (does not count toward quota)" appears if sandbox runs remaining.<br>– After 3 sandbox runs, checkbox disabled with message. | 2 |

### 4.8 Technical / Infrastructure Stories

| ID | Story | Acceptance Criteria | Effort |
|----|-------|---------------------|--------|
| INFRA‑1 | Set up Turso database and Drizzle schema. | – Database created, migrations run.<br>– Schema matches design (users, workflows, workflow_versions, runs, connectors). | 2 |
| INFRA‑2 | Deploy Ollama VM (or mock LLM) and configure environment variables. | – VM accessible from Vercel.<br>– Environment variables set in Vercel. | 3 |
| INFRA‑3 | Set up Next.js project with next-rest-framework and generate OpenAPI in CI. | – API routes follow next-rest-framework patterns.<br>– `generate:openapi` script works; CI validates. | 2 |
| INFRA‑4 | Implement background worker (Vercel cron or separate service). | – Worker processes pending runs every minute.<br>– Updates run status and nodeResults. | 3 |
| INFRA‑5 | Set up error logging and circuit breaker for LLM calls. | – Circuit breaker wraps LLM calls; logs errors.<br>– User sees friendly message when LLM unavailable. | 2 |

---

## 5. Prioritized Sprint Plan (Suggested)

### Sprint 1 (Foundation)
- AUTH‑1, AUTH‑2
- INFRA‑1, INFRA‑3
- GITHUB‑1
- AGENT‑1 (basic implementation with mock LLM)

**Goal:** User can sign in, see repos, and have a basic agent definition.

### Sprint 2 (Workflow Creation)
- WF‑1, WF‑2 (simplified canvas – maybe a list instead of drag‑drop initially)
- GITHUB‑2
- AGENT‑2
- INFRA‑4 (basic worker that just logs)

**Goal:** User can create a workflow with two nodes and save it.

### Sprint 3 (Execution & UI)
- RUN‑1 (polling), RUN‑2, RUN‑3
- WF‑3, WF‑4
- INFRA‑5

**Goal:** User can run a workflow and see results.

### Sprint 4 (Publishing & Quota)
- PUB‑1, PUB‑2
- QUOTA‑1, QUOTA‑2
- INFRA‑2 (integrate real LLM)

**Goal:** User can publish to GitHub PR and has quota/sandbox.

### Sprint 5 (Polish & Bug Fixes)
- Remaining UI polish from UX feedback
- End‑to‑end testing
- Documentation

---

## 6. Technical Dependencies

- GitHub OAuth requires registered OAuth app.
- Turso database must be provisioned before Sprint 1.
- LLM endpoint (Ollama) needed by Sprint 4 (can use mock before).
- Vercel project and domains set up early.

---

## 7. Success Criteria for MVP

- User can complete the entire flow without assistance.
- Average time from sign‑up to first publish < 5 minutes.
- No critical bugs (workflow engine fails gracefully).
- OpenAPI spec is generated and passes validation.
