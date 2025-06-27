import { z } from 'zod';

/**
 * Schema for solution components
 */
export const solutionComponentSchema = z.object({
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
 * Schema for solution data
 */
export const solutionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  industryId: z.string(),
  tags: z.array(z.string()),
  image: z.string().url(),
  features: z.array(z.string()),
  components: z.array(solutionComponentSchema),
  requirements: z.array(z.string()),
  implementation_steps: z.array(implementationStepSchema).optional()
});

/**
 * TypeScript type for solution components
 */
export type SolutionComponent = z.infer<typeof solutionComponentSchema>;

/**
 * TypeScript type for implementation steps
 */
export type ImplementationStep = z.infer<typeof implementationStepSchema>;

/**
 * TypeScript type for solution data
 */
export type Solution = z.infer<typeof solutionSchema>;