---
id: implement-github-pr-connector-for-publishing-workf
title: Implement GitHub PR connector for publishing workflow results
labels:
  - backend
  - frontend
  - must
  - feature
  - 'size:medium'
assignees:
  - elcoosp
references:
  - ../spec/impl-plan.md#task-41-implement-github-pr-connector
  - ../spec/srs.md#req-func-017
  - ../spec/archi.md#adr-006-output-connectors--pluggable-adapter-pattern
state: open
createdAt: '2026-03-14T16:57:03.525Z'
priority: must
effort: 1.5d
dependencies:
  - task-1.2-nextauth-github
  - task-3.1-workflow-execution-engine
  - task-3.2-run-details-ui
---
## Context

After a workflow run completes, users need to publish the results as a GitHub Pull Request. This requires creating a connector that can create a branch, commit a file, and open a PR in the user's repository using their OAuth token.

**Related Plan Section:**
- [Task 4.1: Implement GitHub PR connector](../spec/impl-plan.md#task-41-implement-github-pr-connector)

**Related Requirements:**
- [REQ-FUNC-016](../spec/srs.md#req-func-016) - Connector Configuration
- [REQ-FUNC-017](../spec/srs.md#req-func-017) - GitHub PR Connector
- [REQ-FUNC-019](../spec/srs.md#req-func-019) - Publish from Run

**Related Architecture:**
- [ADR-006: Output Connectors – Pluggable Adapter Pattern](../spec/archi.md#adr-006-output-connectors--pluggable-adapter-pattern)

**Related UX:**
- [Publishing Flow](../spec/ux.md#63-publishing-flow) - Publish button and modal
- [Run Details - Publish section](../spec/ux.md#54-run-details) - Buttons for eligible connectors

**Related Tests:**
- [TC-PUB-001](../spec/test-verification.md#tc-pub-001) - Publish to GitHub PR
- [TC-PUB-003](../spec/test-verification.md#tc-pub-003) - Publish from run

## Problem Statement

We need to implement a GitHub PR connector that takes the output from a completed run, creates a new branch in the target repository, commits the content as a file, and opens a pull request. The connector configuration and publish endpoint must be implemented.

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `connectors/github-pr.ts` — GitHub PR creation logic (create branch, commit file, open PR)
- `app/api/v1/connectors/route.ts` — GET (list) and POST (create) connectors
- `app/api/v1/connectors/[id]/route.ts` — GET, PUT, DELETE single connector
- `app/api/v1/connectors/[id]/test/route.ts` — POST to test connector configuration
- `app/api/v1/runs/[id]/publish/route.ts` — POST to publish run results
- `components/runs/publish-buttons.tsx` — Publish buttons component for run details page

**Key interfaces:**
- `createPR(repoFullName, filePath, content, branchName?)` — Creates branch, commits file, opens PR
- `POST /api/v1/connectors` — Create connector config (encrypted)
- `GET /api/v1/connectors` — List user's connectors
- `POST /api/v1/connectors/:id/test` — Test connector connection
- `POST /api/v1/runs/:id/publish` — Publish run artifact via connector
- `PublishButtons` — Client component with publish buttons for each connector

## Acceptance Criteria

- [ ] GitHub PR connector creates branch from main
- [ ] Connector commits content as base64-encoded file
- [ ] Connector opens PR with title and body
- [ ] PR URL returned and stored in run.finalArtifacts
- [ ] Connector config stored encrypted in database
- [ ] Connectors API supports CRUD operations
- [ ] Test endpoint validates connector configuration
- [ ] Publish endpoint retrieves run results and connector config
- [ ] Publish endpoint extracts last node output as content
- [ ] Publish endpoint calls appropriate connector based on type
- [ ] PublishButtons component shows available connectors
- [ ] Publish buttons disabled while publishing
- [ ] Toast notification shows success with PR link
- [ ] Toast notification shows error on failure

## Testing Requirements

**BDD scenarios:**
- [TC-PUB-001](../spec/test-verification.md#tc-pub-001) - Publish to GitHub PR
- [TC-PUB-003](../spec/test-verification.md#tc-pub-003) - Publish from run

**Integration tests:**
- Test connector CRUD operations
- Test publish endpoint with mocked GitHub API
- Test error handling for failed PR creation

## Dependencies

- **Blocked by:** Task 1.2 (NextAuth), Task 3.1 (Workflow execution), Task 3.2 (Run details UI)
- **Blocks:** None

## Effort Estimate

- **Complexity:** Medium
- **Effort:** 1.5d
