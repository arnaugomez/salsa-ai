import { DanceStep } from '../../domain/entities';

/**
 * Service for handling sound playback
 */
export const soundService = {
  /**
   * Get the sound file path for a dance step
   * @param step - Dance step
   * @param voiceId - Voice ID
   * @param sayingIndex - Index of the saying to use (defaults to 0)
   * @returns Path to the sound file
   */
  getSoundPath: (step: DanceStep, voiceId: string, sayingIndex = 0): string => {
    // Ensure the saying index is valid
    const index = sayingIndex < step.sayings.length ? sayingIndex : 0;
    
    // Format: /sounds/{voiceId}_{stepId}_{sayingIndex}.mp3
    return `/sounds/${voiceId}_${step.id}_${index}.mp3`;
  },
  
  /**
   * Check if a sound file exists
   * @param path - Path to the sound file
   * @returns Promise that resolves to true if the file exists
   */
  soundExists: async (path: string): Promise<boolean> => {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('Error checking sound file existence:', error);
      return false;
    }
  },
  
  /**
   * Play a sound file
   * @param path - Path to the sound file
   * @returns Promise that resolves when the sound has finished playing
   */
  playSound: async (path: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const audio = new Audio(path);
        
        audio.onended = () => {
          resolve();
        };
        
        audio.onerror = (error) => {
          console.error('Error playing sound:', error);
          reject(error);
        };
        
        audio.play().catch(error => {
          console.error('Error playing sound:', error);
          reject(error);
        });
      } catch (error) {
        console.error('Error creating Audio object:', error);
        reject(error);
      }
    });
  },
  
  /**
   * Play a sound for a dance step
   * @param step - Dance step
   * @param voiceId - Voice ID
   * @param sayingIndex - Index of the saying to use (random if not specified)
   * @returns Promise that resolves when the sound has finished playing
   */
  playStepSound: async (
    step: DanceStep, 
    voiceId: string, 
    sayingIndex?: number
  ): Promise<void> => {
    // If no saying index is provided, choose a random one
    const index = sayingIndex !== undefined 
      ? sayingIndex 
      : Math.floor(Math.random() * step.sayings.length);
    
    const soundPath = soundService.getSoundPath(step, voiceId, index);
    
    // Check if the sound exists
    const exists = await soundService.soundExists(soundPath);
    
    if (!exists) {
      console.warn(`Sound file not found: ${soundPath}`);
      return Promise.resolve();
    }
    
    return soundService.playSound(soundPath);
  }
};
