# UX Design Specification: AI Content Agent Dashboard

| Field | Value |
|-------|-------|
| Project | AI Content Agent Dashboard |
| Document | UX Design Specification |
| Version | 1.0 (Draft) |
| Date | 2026-03-14 |
| Author | Senior UX Architect |
| Status | Draft — For Review |

---

## 1. Overview & Goals

### 1.1 Product Vision
Empower solo developers to effortlessly create high‑quality product content by assembling AI‑powered skills into automated workflows, and publish results to the platforms their audience uses.

### 1.2 UX Goals
- **Simplicity:** Reduce cognitive load; allow users to focus on content strategy, not tool configuration.
- **Transparency:** Show what the AI is doing at each step; build trust through observability.
- **Efficiency:** Enable power users to move quickly with keyboard shortcuts and templates.
- **Extensibility:** Make adding new skills and connectors feel natural, even if initially predefined.
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
- **Background:** Part of a 2‑person startup, handles both development and investor pitches.
- **Goals:** Create compelling technical summaries for pitch decks; document internal architecture for future hires.
- **Frustrations:** Translating technical complexity into business‑friendly language is hard; needs content that is accurate but accessible.
- **Needs:** A way to generate structured summaries from code, with ability to edit and refine.

---

## 3. User Journey Maps

### 3.1 First‑Time User Journey (Alex)

| Stage | Actions | Touchpoints | Emotions | Pain Points | Opportunities |
|-------|---------|-------------|----------|-------------|---------------|
| **Discovery** | Hears about tool from a newsletter, visits landing page. | Landing page | Curious, skeptical | Unclear value proposition | Show a demo video of a workflow in action; highlight integration with GitHub. |
| **Sign‑up** | Clicks "Sign in with GitHub", authorizes app. | GitHub OAuth screen | Cautious | Concern about permissions | Request only minimal repo access (read), explain why. |
| **Onboarding** | Lands on empty dashboard, sees a sample workflow template. | Dashboard | Overwhelmed | Doesn't know where to start | Offer a guided tour or a "Quick Start" template that’s ready to run. |
| **First Run** | Clicks "Run" on the sample workflow. | Workflow editor / run view | Anticipatory | Long wait; no progress feedback | Show real‑time step completion; add a progress bar. |
| **Review & Publish** | Sees generated blog post, edits, and publishes to WordPress. | Editor + publish modal | Satisfied | Publishing fails due to misconfigured connector | Provide a test button for connectors; show clear error messages. |
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
├── Skills
│   ├── Library of available skills
│   └── Skill detail (description, input/output schemas, examples)
├── Connectors
│   ├── List of configured connectors
│   ├── Add/edit connector
│   └── Test connector
├── Settings
│   ├── Profile (GitHub info)
│   ├── API keys (LLM providers)
│   ├── Billing / Plan
│   └── GitHub integration (webhooks, Actions)
└── Help & Documentation
    ├── Getting started
    ├── FAQ
    └── Community (Discord link)
```

### 4.2 Navigation
- **Sidebar** (collapsible) with icons for main sections: Home, Workflows, Runs, Skills, Connectors, Settings, Help.
- **Top bar** shows user avatar, plan badge, and a global search (for workflows/runs).

---

## 5. Wireframes / Key Screens

### 5.1 Dashboard Home
- **Layout:** Two‑column. Left column: Recent runs (cards with status, time, workflow name). Right column: Quick start templates, tip of the day, and a call‑to‑action to create a new workflow.
- **Purpose:** Provide at‑a‑glance status and encourage next actions.

### 5.2 Workflows List
- **Table** with columns: Name, last run status, last run time, number of runs, actions (edit, run, delete).
- **Search/filter** bar at top.
- **Floating action button** to create new workflow.

### 5.3 Workflow Editor
This is the most complex screen. We'll design a node‑based visual editor similar to Zapier or n8n, but simpler.

**Components:**
- **Canvas** – drag‑and‑drop area where nodes are placed.
- **Node palette** – on the left, list of available skills with icons. Users drag nodes onto canvas.
- **Node configuration panel** – on the right, appears when a node is selected. Shows input fields (prefilled from previous node outputs where possible) and a "Test node" button.
- **Connections** – users drag from output port of one node to input port of another. Ports are colour‑coded by data type.
- **Toolbar** – above canvas: Undo/redo, zoom, fit to screen, run workflow, save, version history.

**Interaction Flow:**
1. User drags a skill onto canvas.
2. Node appears with a default name. Input ports on left, output ports on right.
3. User clicks node to open configuration panel.
4. User fills in any required inputs (constants or references to upstream outputs).
5. User connects nodes by dragging between ports.
6. User clicks "Run" to execute; the canvas highlights each node as it completes, with a checkmark or error icon.

**Versioning:** A small indicator shows current version (e.g., "v3"). Clicking opens a side panel with version history (timeline, option to restore).

### 5.4 Run Details
- **Header:** Workflow name, run ID, status, start/end time.
- **Node list:** Expandable cards for each node, showing:
  - Inputs (with ability to view raw JSON)
  - Outputs (formatted preview)
  - Logs (if any)
  - Error message (if failed)
- **Publish section:** If any output connectors are configured, show a button to publish each artifact. After publish, show link to the live content.
- **Actions:** Re‑run, share (copy run ID), delete.

### 5.5 Skills Library
- **Grid of skill cards** with name, brief description, and an icon.
- Clicking a card opens a detail view: full description, input/output schema (with examples), and a "Use in workflow" button that creates a new workflow with that node pre‑added.

### 5.6 Connectors Configuration
- **List** of available connectors (WordPress, LinkedIn, Twitter, GitHub, etc.) with status (configured/not configured).
- **Add connector flow:** User selects connector, enters required fields (API keys, URLs), and clicks "Test". On success, the connector is saved.
- **Edit/delete** options.

### 5.7 Settings
- **Profile:** Display GitHub info; option to disconnect/reconnect.
- **LLM API Keys:** Input fields for OpenAI, Anthropic, etc. Keys are masked and encrypted.
- **Billing:** Show current plan, usage stats, upgrade button.
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
- **Autosave:** Workflow is saved automatically every 30 seconds, with a small indicator "Saved just now".
- **Validation:** When connecting nodes, incompatible ports are highlighted in red; hover shows error message.

### 6.2 Run Execution Feedback
- **Progress bar** at top of canvas showing overall completion.
- **Node highlighting:** Border pulses while running, turns green on success, red on failure.
- **Live logs:** A small terminal‑like panel at bottom can be expanded to see real‑time log output from nodes.

### 6.3 Publishing Flow
- After a successful run, the run details page shows a "Publish" button next to each eligible artifact.
- Clicking opens a modal: choose connector, review any options (e.g., post title, categories), and click "Publish".
- Publishing is asynchronous; a toast notification shows "Publishing started". When complete, the toast updates with a link to the published content.

### 6.4 Onboarding
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
- Skill icons could be simple shapes representing the skill type (e.g., research = magnifying glass, copywriting = pen).

### 7.5 Spacing & Layout
- Use an 8‑point grid system.
- Sidebar: 64px collapsed, 240px expanded.
- Content area padding: 24px.

---

## 8. Usability Testing Plan

### 8.1 Objectives
- Validate that users can complete the core tasks without assistance.
- Identify pain points in the workflow editor.
- Assess clarity of terminology (skill, node, connector, etc.).
- Measure time to first successful publish.

### 8.2 Methodology
- **Remote moderated testing** with 5‑8 participants matching personas.
- Tasks:
  1. Sign up with GitHub and create a workflow that generates a blog post from a sample repo.
  2. Run the workflow and publish the output to a test WordPress site.
  3. Edit the workflow to add a humanizer node and re‑run.
  4. Configure a GitHub webhook to trigger a workflow on push.
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

## 11. Next Steps

1. **Review** this UX spec with stakeholders.
2. **Create high‑fidelity mockups** in Figma.
3. **Prototype** key flows for usability testing.
4. **Refine** based on feedback.
5. **Handoff** to development with detailed annotations and component library.
