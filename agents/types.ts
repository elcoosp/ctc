// agents/types.ts
import * as z from 'zod';

export interface Agent {
  name: string;
  description: string;
  inputSchema: z.ZodObject<any>;
  outputSchema: z.ZodObject<any>;
  execute: (input: any, context: { codeContext: string }) => Promise<any>;
}
