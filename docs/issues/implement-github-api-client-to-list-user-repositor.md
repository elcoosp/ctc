---
id: implement-github-api-client-to-list-user-repositor
title: Implement GitHub API client to list user repositories
labels:
  - backend
  - frontend
  - must
  - feature
  - 'size:medium'
assignees:
  - elcoosp
references:
  - >-
    ../spec/impl-plan.md#task-15-implement-github-api-client-to-list-repositories-with-async-session
  - ../spec/srs.md#req-func-011
state: closed
createdAt: '2026-03-14T16:54:41.941Z'
priority: must
effort: 1d
dependencies:
  - task-1.2-better-auth-github
  - task-1.4-next-rest-framework
---

## Context

Users need to select a GitHub repository when creating workflows. This requires fetching their repositories via the GitHub API using the OAuth access token stored in their session.

**Related Plan Section:**
- [Task 1.5: Implement GitHub API client to list repositories](../spec/impl-plan.md#task-15-implement-github-api-client-to-list-repositories-with-async-session)

**Related Requirements:**
- [REQ-FUNC-011](../spec/srs.md#req-func-011) - List Repositories
- [REQ-FUNC-012](../spec/srs.md#req-func-012) - Fetch Code

**Related Tests:**
- [TC-GITHUB-001](../spec/test-verification.md#tc-github-001) - List repos

## Implementation Status (Completed)

The GitHub API client and repository selector have been implemented:

- `lib/github.ts` — Fetches user repos using access token from better-auth session.
- `app/api/v1/github/repos/route.ts` — next-rest-framework endpoint returning Zod-validated repo list.
- `components/repo-selector.tsx` — shadcn/ui Select component with loading and error states.
- The endpoint correctly handles authentication errors.

All acceptance criteria have been met, and the component is ready to be used in the workflow creation form.

## Closing Note

This task is complete. No further work required.
