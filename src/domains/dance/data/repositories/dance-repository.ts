import { Dance, DanceMode } from '../../domain/entities';
import { dances, danceModes } from './data';

/**
 * Repository for accessing dance types and modes
 */
export const danceRepository = {
  /**
   * Get all dance types
   * @returns Array of all dance types
   */
  getAllDances: (): Dance[] => {
    return dances;
  },

  /**
   * Get a dance type by ID
   * @param id - Dance type ID
   * @returns Dance type or undefined if not found
   */
  getDanceById: (id: string): Dance | undefined => {
    return dances.find(dance => dance.id === id);
  },

  /**
   * Get all dance modes
   * @returns Array of all dance modes
   */
  getAllModes: (): DanceMode[] => {
    return danceModes;
  },

  /**
   * Get a dance mode by ID
   * @param id - Dance mode ID
   * @returns Dance mode or undefined if not found
   */
  getModeById: (id: string): DanceMode | undefined => {
    return danceModes.find(mode => mode.id === id);
  },

  /**
   * Get available modes for a dance type
   * @param danceId - Dance type ID
   * @returns Array of dance modes available for the specified dance
   */
  getModesForDance: (danceId: string): DanceMode[] => {
    const dance = dances.find(d => d.id === danceId);
    if (!dance) return [];
    
    return danceModes.filter(mode => dance.availableModes.includes(mode.id));
  }
};
