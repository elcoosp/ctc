// agents/registry.ts
import * as z from 'zod';
import { Agent } from './types';
import { MockLLMAdapter } from '@/services/llm/adapter';

const llm = new MockLLMAdapter();

export const researchWriter: Agent = {
  name: 'research-writer',
  description: 'Researches topics and adds citations',
  inputSchema: z.object({
    topic: z.string(),
  }),
  outputSchema: z.object({
    summary: z.string(),
    citations: z.array(z.string()),
  }),
  execute: async (input, { codeContext }) => {
    const prompt = `Research the topic "${input.topic}" using this code context:\n${codeContext}\nProvide JSON with fields: summary (string), citations (array of strings).`;
    const result = await llm.generateContent({ codeContext, prompt, agentType: 'research-writer' });
    return JSON.parse(result);
  },
};

export const copywriting: Agent = {
  name: 'copywriting',
  description: 'Writes marketing copy from research',
  inputSchema: z.object({
    research: z.string(),
  }),
  outputSchema: z.object({
    draft: z.string(),
  }),
  execute: async (input, { codeContext }) => {
    const prompt = `Based on this research:\n${input.research}\nWrite a compelling blog post draft using code context:\n${codeContext}\nReturn JSON with field: draft (string).`;
    const result = await llm.generateContent({ codeContext, prompt, agentType: 'copywriting' });
    return JSON.parse(result);
  },
};

export const agents = {
  'research-writer': researchWriter,
  'copywriting': copywriting,
};

export function getAgent(name: string): Agent | undefined {
  return agents[name as keyof typeof agents];
}
