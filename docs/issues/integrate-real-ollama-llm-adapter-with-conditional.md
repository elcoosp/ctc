---
id: integrate-real-ollama-llm-adapter-with-conditional
title: Integrate real Ollama LLM adapter with conditional fallback
labels:
  - backend
  - must
  - feature
  - 'size:small'
assignees:
  - elcoosp
references:
  - ../spec/impl-plan.md#task-43-integrate-real-ollama-llm
  - ../spec/archi.md#adr-005-ai-service-abstraction-with-pluggable-adapter
  - ../spec/tech-desing-api.md#7-ollama-hosting-on-free-cloud-tiers
state: open
createdAt: '2026-03-14T16:57:03.527Z'
priority: must
effort: 0.5d
dependencies:
  - task-1.6-agent-registry
---

## Context

For production use, the workflow execution needs to call a real LLM. We'll use Ollama as the LLM provider, with conditional fallback to the mock adapter when `OLLAMA_BASE_URL` is not configured. This allows development without requiring an Ollama instance.

**Related Plan Section:**
- [Task 4.3: Integrate real Ollama LLM](../spec/impl-plan.md#task-43-integrate-real-ollama-llm)

**Related Requirements:**
- [REQ-FUNC-007](../spec/srs.md#req-func-007) - Execute Agent
- [NFR-SEC-004](../spec/srs.md#nfr-sec-004) - Circuit Breaker

**Related Architecture:**
- [ADR-005: AI Service Abstraction with Pluggable Adapter](../spec/archi.md#adr-005-ai-service-abstraction-with-pluggable-adapter)
- [Section 7: Ollama Hosting on Free Cloud Tiers](../spec/tech-desing-api.md#7-ollama-hosting-on-free-cloud-tiers)

## Problem Statement

We need to implement an Ollama adapter that calls the Ollama API to generate content, with model selection based on agent type. The registry should conditionally use the real or mock adapter based on environment configuration.

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `services/llm/ollama.ts` — Ollama adapter implementation
- `agents/registry.ts` — Modify to conditionally use Ollama or Mock adapter
- `.env.example` already includes `OLLAMA_BASE_URL` and `OLLAMA_DEFAULT_MODEL`

**Key interfaces:**
- `OllamaAdapter` — Implements `LLMAdapter` interface
- `generateContent(params)` — Calls Ollama `/api/generate` endpoint
- `selectModel(agentType)` — Maps agent types to appropriate models
- Conditional adapter selection based on `OLLAMA_BASE_URL` env var

## Acceptance Criteria

- [ ] `OllamaAdapter` implements `LLMAdapter` interface
- [ ] `OllamaAdapter` calls Ollama `/api/generate` endpoint
- [ ] Request includes model, prompt, `stream: false`, `format: 'json'`
- [ ] Model selection based on agent type (research-writer → `deepseek-r1:8b`, copywriting → `llama3.2:3b`)
- [ ] Default model configurable via `OLLAMA_DEFAULT_MODEL`
- [ ] Registry conditionally uses `OllamaAdapter` when `OLLAMA_BASE_URL` is set
- [ ] Registry falls back to `MockLLMAdapter` when `OLLAMA_BASE_URL` is not set
- [ ] Error handling for Ollama API failures

## Testing Requirements

**Unit tests:**
- Test `OllamaAdapter` with mocked fetch
- Test model selection logic
- Test conditional adapter selection

**Integration tests:**
- Test with real Ollama instance (optional, requires setup)

## Dependencies

- **Blocked by:** Task 1.6 (Agent registry with mock LLM)
- **Blocks:** None

## Effort Estimate

- **Complexity:** Low
- **Effort:** 0.5d
