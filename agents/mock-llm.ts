// agents/mock-llm.ts
export async function mockLLM(prompt: string): Promise<string> {
  console.log('Mock LLM called with prompt:', prompt);
  return JSON.stringify({
    summary: 'This is a mock summary of the code changes.',
    citations: ['Mock Source 1', 'Mock Source 2'],
  });
}
