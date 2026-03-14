---
id: set-up-end-to-end-testing-with-playwright-for-crit
title: Set up end-to-end testing with Playwright for critical user journeys
labels:
  - testing
  - must
  - feature
  - 'size:medium'
assignees:
  - elcoosp
references:
  - ../spec/impl-plan.md#task-51-end-to-end-testing-with-playwright
  - ../spec/test-verification.md#tc-auth-001
state: open
createdAt: '2026-03-14T16:57:20.487Z'
priority: must
effort: 1d
dependencies:
  - task-2.2-workflow-editor-ui
  - task-3.2-run-details-ui
---
## Context

End-to-end testing ensures the application works correctly from the user's perspective. We need to set up Playwright and write tests for the critical user journeys: authentication, workflow creation, and run execution.

**Related Plan Section:**
- [Task 5.1: End-to-end testing with Playwright](../spec/impl-plan.md#task-51-end-to-end-testing-with-playwright)

**Related Requirements:**
- [NFR-UI-001](../spec/srs.md#nfr-ui-001) - First-time UX
- [NFR-UI-002](../spec/srs.md#nfr-ui-002) - Mobile Responsive

**Related Tests:**
- [TC-AUTH-001](../spec/test-verification.md#tc-auth-001) - New user sign-in via GitHub
- [TC-WORKFLOW-001](../spec/test-verification.md#tc-workflow-001) - Create workflow with two nodes
- [TC-RUN-008](../spec/test-verification.md#tc-run-008) - Node failure stops run

## Problem Statement

We need to configure Playwright for E2E testing and write test specifications for the authentication flow, workflow creation, and run execution. Tests should use role-based selectors and avoid implementation-specific selectors.

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `playwright.config.ts` — Playwright configuration
- `e2e/auth.spec.ts` — Authentication E2E tests
- `e2e/workflow.spec.ts` — Workflow creation E2E tests
- `e2e/run.spec.ts` — Run execution E2E tests
- `package.json` — Add Playwright dependencies and test:e2e script

**Key interfaces:**
- `playwright.config.ts` — Configure browsers, base URL, test match
- `auth.spec.ts` — Test sign-in flow (with mocked GitHub OAuth)
- `workflow.spec.ts` — Test workflow CRUD operations
- `run.spec.ts` — Test run creation and status polling

## Acceptance Criteria

- [ ] Playwright installed and configured
- [ ] Test configuration uses base URL from environment
- [ ] Auth test verifies sign-in button exists and redirects
- [ ] Workflow test creates a new workflow
- [ ] Workflow test edits an existing workflow
- [ ] Run test starts a workflow run
- [ ] Run test polls for completion status
- [ ] All tests use role-based selectors (getByRole, getByText)
- [ ] No React-specific selectors used
- [ ] test:e2e script added to package.json
- [ ] Tests can run in CI environment

## Testing Requirements

**E2E tests:**
- Authentication flow
- Workflow creation and editing
- Run execution and status polling

## Dependencies

- **Blocked by:** Task 2.2 (Workflow UI), Task 3.2 (Run details UI)
- **Blocks:** None

## Effort Estimate

- **Complexity:** Medium
- **Effort:** 1d
