---
id: implement-workflow-execution-engine-with-code-fetc
title: Implement workflow execution engine with code fetcher and background worker
labels:
  - backend
  - must
  - feature
  - 'size:large'
assignees:
  - elcoosp
references:
  - ../spec/impl-plan.md#task-31-implement-workflow-execution-engine
  - ../spec/srs.md#req-func-007
  - ../spec/srs.md#req-func-008
  - ../spec/archi.md#adr-003-background-job-processing-with-database-polling
state: open
createdAt: '2026-03-14T16:55:51.442Z'
priority: must
effort: 2d
dependencies:
  - task-1.1-database-schema
  - task-1.2-nextauth-github
  - task-1.6-agent-registry
  - task-2.1-workflow-crud-api
---
## Context

The workflow execution engine is the core processing system that runs AI agents sequentially, fetches code context from GitHub, and stores results. This includes a background worker for processing pending runs and quota enforcement.

**Related Plan Section:**
- [Task 3.1: Implement workflow execution engine](../spec/impl-plan.md#task-31-implement-workflow-execution-engine)

**Related Requirements:**
- [REQ-FUNC-007](../spec/srs.md#req-func-007) - Execute Agent
- [REQ-FUNC-008](../spec/srs.md#req-func-008) - Error Handling
- [REQ-FUNC-010](../spec/srs.md#req-func-010) - Sandbox Mode
- [REQ-FUNC-012](../spec/srs.md#req-func-012) - Fetch Code
- [REQ-FUNC-020](../spec/srs.md#req-func-020) - Track Generations
- [REQ-FUNC-021](../spec/srs.md#req-func-021) - Enforce Quota
- [REQ-FUNC-022](../spec/srs.md#req-func-022) - Sandbox Quota
- [NFR-PERF-001](../spec/srs.md#nfr-perf-001) - Generation Latency
- [NFR-SEC-004](../spec/srs.md#nfr-sec-004) - Circuit Breaker

**Related Architecture:**
- [ADR-003: Background Job Processing with Database Polling](../spec/archi.md#adr-003-background-job-processing-with-database-polling)
- [ADR-010: Circuit Breaker for LLM Calls](../spec/archi.md#adr-010-circuit-breaker-for-llm-calls)
- [ADR-011: Workflow Error Handling – Stop on Failure](../spec/archi.md#adr-011-workflow-error-handling--stop-on-failure)

**Related Tests:**
- [TC-AGENT-002](../spec/test-verification.md#tc-agent-002) - Execute agent
- [TC-RUN-008](../spec/test-verification.md#tc-run-008) - Node failure stops run
- [TC-SAND-001](../spec/test-verification.md#tc-sand-001) - Sandbox usage
- [TC-QUOTA-001](../spec/test-verification.md#tc-quota-001) - Track generations
- [TC-QUOTA-002](../spec/test-verification.md#tc-quota-002) - Enforce quota
- [TC-CIRCUIT-001](../spec/test-verification.md#tc-circuit-001) - Circuit breaker opens

## Problem Statement

We need to implement the workflow execution engine that fetches code from GitHub, executes agents sequentially, handles errors by stopping on failure, enforces quota limits, and processes runs in the background via a Vercel cron job.

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `lib/workflow-engine/code-fetcher.ts` — Fetch repository code from GitHub API
- `lib/workflow-engine/executor.ts` — Execute workflow nodes sequentially
- `app/api/v1/workflows/[id]/run/route.ts` — POST endpoint to start run with quota checks
- `workers/run-processor.ts` — Background worker to process pending runs
- `app/api/cron/process-runs/route.ts` — Vercel cron endpoint (protected by secret)

**Key interfaces:**
- `fetchRepositoryCode(repoFullName)` — Fetches code files from GitHub, returns concatenated context
- `executeWorkflow(definition, repo)` — Executes nodes sequentially, resolves inputs, returns results
- `POST /api/v1/workflows/:id/run` — Creates run record, checks quota, returns runId
- `processPendingRuns()` — Worker function that processes runs with status 'pending'
- `GET /api/cron/process-runs` — Cron endpoint protected by CRON_SECRET

## Acceptance Criteria

- [ ] Code fetcher retrieves repository tree and file contents from GitHub
- [ ] Code fetcher filters out markdown and text files
- [ ] Code fetcher limits to first 10 code files for MVP
- [ ] Executor resolves node inputs from constants or previous node outputs
- [ ] Executor calls agent.execute() for each node sequentially
- [ ] Executor stores results in nodeResults with status per node
- [ ] Executor stops on first node failure and marks run as failed
- [ ] Run endpoint checks monthly quota (10 for free tier)
- [ ] Run endpoint checks sandbox quota (3 total)
- [ ] Run endpoint creates run record with status 'pending'
- [ ] Background worker updates run status to 'running'
- [ ] Background worker increments usage counters on completion
- [ ] Cron endpoint validates CRON_SECRET header
- [ ] All errors properly caught and stored in nodeResults

## Testing Requirements

**BDD scenarios:**
- [TC-AGENT-002](../spec/test-verification.md#tc-agent-002) - Execute agent
- [TC-RUN-008](../spec/test-verification.md#tc-run-008) - Node failure stops run
- [TC-SAND-001](../spec/test-verification.md#tc-sand-001) - Sandbox usage
- [TC-QUOTA-001](../spec/test-verification.md#tc-quota-001) - Track generations
- [TC-QUOTA-002](../spec/test-verification.md#tc-quota-002) - Enforce quota
- [TC-CIRCUIT-001](../spec/test-verification.md#tc-circuit-001) - Circuit breaker opens

**Unit tests:**
- Test code fetcher with mocked GitHub API
- Test executor with mocked agents
- Test quota enforcement logic

**Integration tests:**
- Test run creation and processing
- Test failure handling

## Dependencies

- **Blocked by:** Task 1.1 (Database schema), Task 1.2 (NextAuth), Task 1.6 (Agent registry), Task 2.1 (Workflow API)
- **Blocks:** Task 3.2 (Run details UI), Task 4.1 (GitHub PR connector)

## Effort Estimate

- **Complexity:** High
- **Effort:** 2d
