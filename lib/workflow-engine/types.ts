// lib/workflow-engine/types.ts
import * as z from 'zod';

export const nodeInputSourceSchema = z.discriminatedUnion('source', [
  z.object({ source: z.literal('constant'), value: z.any() }),
  z.object({ source: z.literal('node'), nodeId: z.string(), outputKey: z.string() }),
]);

export const nodeSchema = z.object({
  id: z.string(),
  agent: z.string(),
  inputs: z.record(z.string(), nodeInputSourceSchema),
});

export const workflowDefinitionSchema = z.object({
  nodes: z.array(nodeSchema),
  edges: z.array(z.object({ from: z.string(), to: z.string() })),
  outputConnectors: z.array(z.object({
    connector: z.string(),
    config: z.record(z.string(), z.any()),
    artifactSelector: z.string(),
  })).optional(),
});

export type WorkflowDefinition = z.infer<typeof workflowDefinitionSchema>;
