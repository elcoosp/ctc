---
id: define-agent-registry-with-mock-llm-adapter
title: Define agent registry with mock LLM adapter
labels:
  - backend
  - must
  - feature
  - 'size:medium'
assignees:
  - elcoosp
references:
  - >-
    ../spec/impl-plan.md#task-16-define-agent-registry-with-mock-llm-zod-4-updates
  - ../spec/archi.md#adr-005-ai-service-abstraction-with-pluggable-adapter
state: open
createdAt: '2026-03-14T16:54:41.942Z'
priority: must
effort: 1d
dependencies: []
---

## Context

The workflow engine needs a registry of AI agents that can be executed. For MVP, we need at least two agents: research-writer and copywriting. Initially, we'll use a mock LLM adapter to enable development without a real LLM service.

**Related Plan Section:**
- [Task 1.6: Define agent registry with mock LLM](../spec/impl-plan.md#task-16-define-agent-registry-with-mock-llm-zod-4-updates)

**Related Requirements:**
- [REQ-FUNC-006](../spec/srs.md#req-func-006) - Agent Library
- [REQ-FUNC-007](../spec/srs.md#req-func-007) - Execute Agent

**Related Architecture:**
- [ADR-005: AI Service Abstraction with Pluggable Adapter](../spec/archi.md#adr-005-ai-service-abstraction-with-pluggable-adapter)
- [ADR-008: Structured Output Schemas](../spec/archi.md#adr-008-structured-output-schemas)

**Related Tests:**
- [TC-AGENT-001](../spec/test-verification.md#tc-agent-001) - List agents
- [TC-AGENT-002](../spec/test-verification.md#tc-agent-002) - Execute agent

## Problem Statement

We need to define an agent registry with input/output schemas using Zod, and create a mock LLM adapter that returns structured outputs for development and testing. The registry should support the research-writer and copywriting agents.

## Solution Approach

### Implementation Details

**Files to create:**
- `agents/types.ts` — Agent interface definition
- `agents/mock-llm.ts` — Mock LLM function for testing
- `services/llm/adapter.ts` — LLMAdapter interface and MockLLMAdapter implementation
- `agents/registry.ts` — Agent registry with research-writer and copywriting
- `agents/registry.test.ts` — Unit tests for agent schemas

**Key interfaces:**
- `Agent` — name, description, inputSchema, outputSchema, execute function
- `LLMAdapter` — generateContent(params) interface
- `MockLLMAdapter` — Returns mock JSON responses
- `researchWriter` — Agent for research with citations
- `copywriting` — Agent for writing marketing copy

## Acceptance Criteria

- [ ] Agent interface defined with Zod schemas
- [ ] LLMAdapter interface created
- [ ] MockLLMAdapter returns valid JSON for each agent type
- [ ] research-writer agent defined with input/output schemas
- [ ] copywriting agent defined with input/output schemas
- [ ] `getAgent()` function retrieves agents by name
- [ ] Unit tests verify schema validation
- [ ] Zod 4 import syntax used

## Testing Requirements

**Unit tests:**
- Test researchWriter output schema validation
- Test copywriting output schema validation
- Test getAgent returns correct agent

## Dependencies

- **Blocked by:** None
- **Blocks:** Task 2.1 (Workflow API), Task 3.1 (Workflow execution)

## Effort Estimate

- **Complexity:** Medium
- **Effort:** 1d
