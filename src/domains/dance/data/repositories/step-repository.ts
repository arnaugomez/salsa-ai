import { DanceStep } from '../../domain/entities';
import { allSteps } from './data';

/**
 * Repository for accessing dance steps
 */
export const stepRepository = {
  /**
   * Get all dance steps
   * @returns Array of all dance steps
   */
  getAll: (): DanceStep[] => {
    return allSteps;
  },

  /**
   * Get a dance step by ID
   * @param id - Step ID
   * @returns Dance step or undefined if not found
   */
  getById: (id: string): DanceStep | undefined => {
    return allSteps.find(step => step.id === id);
  },

  /**
   * Get dance steps by dance type
   * @param danceType - Dance type ID
   * @returns Array of dance steps for the specified dance
   */
  getByDanceType: (danceType: string): DanceStep[] => {
    return allSteps.filter(step => step.dance === danceType);
  },

  /**
   * Get dance steps by mode
   * @param mode - Dance mode ID
   * @returns Array of dance steps for the specified mode
   */
  getByMode: (mode: string): DanceStep[] => {
    return allSteps.filter(step => step.mode === mode);
  },

  /**
   * Get dance steps by dance type and mode
   * @param danceType - Dance type ID
   * @param mode - Dance mode ID
   * @returns Array of dance steps for the specified dance and mode
   */
  getByDanceAndMode: (danceType: string, mode: string): DanceStep[] => {
    return allSteps.filter(step => step.dance === danceType && step.mode === mode);
  },

  /**
   * Get dance steps by course
   * @param courseId - Course ID
   * @returns Array of dance steps for the specified course
   */
  getByCourse: (courseId: string): DanceStep[] => {
    return allSteps.filter(step => step.course === courseId);
  },

  /**
   * Get dance steps by IDs
   * @param ids - Array of step IDs
   * @returns Array of dance steps with the specified IDs
   */
  getByIds: (ids: string[]): DanceStep[] => {
    return allSteps.filter(step => ids.includes(step.id));
  }
};
