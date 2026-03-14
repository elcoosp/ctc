// agents/registry.test.ts
import { describe, it, expect } from 'vitest';
import { researchWriter, copywriting } from './registry';

describe('agents', () => {
  it('researchWriter output schema validates', () => {
    const validOutput = { summary: 'test', citations: ['a'] };
    expect(() => researchWriter.outputSchema.parse(validOutput)).not.toThrow();
  });

  it('copywriting output schema validates', () => {
    const validOutput = { draft: 'test draft' };
    expect(() => copywriting.outputSchema.parse(validOutput)).not.toThrow();
  });
});
