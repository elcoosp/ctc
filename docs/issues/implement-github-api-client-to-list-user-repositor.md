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
state: open
createdAt: '2026-03-14T16:54:41.941Z'
priority: must
effort: 1d
dependencies:
  - task-1.2-nextauth-github
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

## Problem Statement

We need to create a GitHub API client that fetches the user's repositories using their OAuth access token, and expose this via a type-safe API endpoint. A frontend component should allow users to select a repository.

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `lib/github.ts` — GitHub API client with fetchUserRepos function
- `app/api/v1/github/repos/route.ts` — API endpoint using next-rest-framework
- `components/repo-selector.tsx` — Client component for repository selection

**Key interfaces:**
- `fetchUserRepos()` — Fetches repos from GitHub API with auth token
- `GET /api/v1/github/repos` — Returns array of repos with Zod-validated response
- `RepoSelector` — shadcn/ui Select component for repo selection

## Acceptance Criteria

- [ ] GitHub client fetches repos with proper authentication
- [ ] API endpoint returns validated Zod schema response
- [ ] Error handling for unauthenticated users
- [ ] RepoSelector component uses shadcn/ui Select
- [ ] Loading and error states handled in RepoSelector
- [ ] SelectGroup used for repo list organization

## Testing Requirements

**BDD scenarios:**
- [TC-GITHUB-001](../spec/test-verification.md#tc-github-001) - List repositories

**Unit tests:**
- Test fetchUserRepos with mocked auth
- Test API endpoint response schema

## Dependencies

- **Blocked by:** Task 1.2 (NextAuth setup), Task 1.4 (next-rest-framework)
- **Blocks:** Task 2.2 (Workflow editor UI)

## Effort Estimate

- **Complexity:** Medium
- **Effort:** 1d
