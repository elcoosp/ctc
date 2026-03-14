// services/llm/adapter.ts
import { mockLLM } from '@/agents/mock-llm';

export interface LLMAdapter {
  generateContent(params: {
    codeContext: string;
    prompt?: string;
    agentType: string;
  }): Promise<string>;
}

export class MockLLMAdapter implements LLMAdapter {
  async generateContent(params: { codeContext: string; prompt?: string; agentType: string }): Promise<string> {
    if (params.agentType === 'research-writer') {
      return JSON.stringify({
        summary: 'Mock research summary',
        citations: ['Mock citation 1', 'Mock citation 2'],
      });
    } else if (params.agentType === 'copywriting') {
      return JSON.stringify({
        draft: 'Mock blog post draft about the code changes.',
      });
    }
    return mockLLM(params.prompt || '');
  }
}
