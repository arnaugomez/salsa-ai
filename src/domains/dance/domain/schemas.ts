import { z } from 'zod';

/**
 * Zod schema for validating Dance objects
 */
export const danceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  availableModes: z.array(z.string().min(1))
});

/**
 * Zod schema for validating DanceMode objects
 */
export const danceModeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1)
});

/**
 * Zod schema for validating DanceStep objects
 */
export const danceStepSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  sayings: z.array(z.string()),
  dance: z.string().min(1),
  mode: z.string().min(1),
  course: z.string().min(1),
  nextMoves: z.array(z.string())
});

/**
 * Zod schema for validating DanceCourse objects
 */
export const danceCourseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  steps: z.array(z.string())
});

/**
 * Zod schema for validating Playlist objects
 */
export const playlistSchema = z.object({
  name: z.string().min(1),
  image: z.string().url(),
  description: z.string(),
  url: z.string().url(),
  dance: z.string().min(1)
});
