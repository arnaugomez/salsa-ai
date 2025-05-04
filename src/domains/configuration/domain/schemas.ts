import { z } from 'zod';

/**
 * Zod schema for validating Configuration objects
 */
export const configurationSchema = z.object({
  selectedDance: z.string().min(1),
  selectedMode: z.string().min(1),
  difficulty: z.number().int().min(1).max(5),
  selectedSteps: z.array(z.string()),
  selectedVoice: z.string().min(1)
});

/**
 * Zod schema for validating voice selection
 */
export const voiceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  gender: z.enum(['male', 'female'])
});
