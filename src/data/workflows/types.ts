import { z } from 'zod';

/**
 * Schema for workflow components
 */
export const workflowComponentSchema = z.object({
  name: z.string(),
  description: z.string()
});

/**
 * Schema for implementation steps
 */
export const implementationStepSchema = z.object({
  title: z.string(),
  tasks: z.array(z.string()).optional()
});

/**
 * Schema for workflow data
 */
export const workflowSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  industryId: z.string(),
  tags: z.array(z.string()),
  image: z.string().url(),
  features: z.array(z.string()),
  components: z.array(workflowComponentSchema),
  requirements: z.array(z.string()),
  implementation_steps: z.array(implementationStepSchema).optional()
});

/**
 * TypeScript type for workflow components
 */
export type WorkflowComponent = z.infer<typeof workflowComponentSchema>;

/**
 * TypeScript type for implementation steps
 */
export type ImplementationStep = z.infer<typeof implementationStepSchema>;

/**
 * TypeScript type for workflow data
 */
export type Workflow = z.infer<typeof workflowSchema>;