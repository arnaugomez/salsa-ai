import { DanceCourse, DanceStep } from "../../domain/entities";
import { allCourses } from "./data";
import { allSteps } from "./data/steps";

/**
 * Repository for accessing dance courses
 */
export const courseRepository = {
  /**
   * Get all dance courses
   * @returns Array of all dance courses
   */
  getAll: (): DanceCourse[] => {
    return allCourses;
  },

  /**
   * Get a dance course by ID
   * @param id - Course ID
   * @returns Dance course or undefined if not found
   */
  getById: (id: string): DanceCourse | undefined => {
    return allCourses.find((course) => course.id === id);
  },

  /**
   * Get dance courses by dance type
   * @param danceType - Dance type ID
   * @returns Array of dance courses for the specified dance
   */
  getByDanceType: (danceType: string): DanceCourse[] => {
    // Currently, we infer dance type from the course ID
    // This could be improved by adding a dance field to the DanceCourse interface
    return allCourses.filter((course) => course.id.startsWith(`${danceType}-`));
  },

  /**
   * Get all steps for a course
   * @param courseId - Course ID
   * @returns Array of steps for the specified course
   */
  getStepsForCourse: (courseId: string): DanceStep[] => {
    const course = allCourses.find((c) => c.id === courseId);
    if (!course) return [];

    return allSteps.filter((step) => step.course === courseId);
  },

  /**
   * Get all steps for a course by dance type and mode
   * @param courseId - Course ID
   * @param danceType - Dance type ID
   * @param mode - Dance mode ID
   * @returns Array of steps for the specified course, dance type, and mode
   */
  getStepsForCourseByDanceAndMode: (
    courseId: string,
    danceType: string,
    mode: string
  ): DanceStep[] => {
    const course = allCourses.find((c) => c.id === courseId);
    if (!course) return [];

    return allSteps.filter(
      (step) =>
        step.course === courseId &&
        step.dance === danceType &&
        step.mode === mode
    );
  },
};
