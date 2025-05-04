import { DanceStep } from "./dance-step";

/**
 * Represents a dance course in the application
 * A course is a collection of related dance steps
 */
export interface DanceCourse {
  /**
   * Unique identifier for the course in kebab-case
   * Example: "salsa-1"
   */
  id: string;

  /**
   * Name of the course in Spanish
   * Example: "Salsa 1"
   */
  name: string;
}

/**
 * Get a display name for a dance course
 * @param course - The dance course
 * @returns Formatted display name
 */
export function getDanceCourseDisplayName(course: DanceCourse): string {
  return course.name;
}

/**
 * Check if a course contains a specific step
 * @param course - The dance course
 * @param step - The dance step to check
 * @returns True if the course contains the step
 */
export function courseContainsStep(
  course: DanceCourse,
  step: DanceStep
): boolean {
  return step.course === course.id;
}

/**
 * Get all steps for a course from a list of steps
 * @param course - The dance course
 * @param allSteps - All available dance steps
 * @returns Array of steps that belong to the course
 */
export function getStepsForCourse(
  course: DanceCourse,
  allSteps: DanceStep[]
): DanceStep[] {
  return allSteps.filter((step) => step.course === course.id);
}
