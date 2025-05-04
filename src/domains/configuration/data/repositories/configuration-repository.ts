import { Configuration, createDefaultConfiguration } from '../../domain/entities';
import { availableVoices } from './data';

// Local storage keys
const CONFIG_STORAGE_KEY = 'salsa-pro-configuration';

/**
 * Repository for accessing and storing configuration
 */
export const configurationRepository = {
  /**
   * Get the current configuration
   * @returns Current configuration or default if not found
   */
  getConfiguration: (): Configuration => {
    if (typeof window === 'undefined') {
      return createDefaultConfiguration();
    }
    
    try {
      const storedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (!storedConfig) {
        return createDefaultConfiguration();
      }
      
      return JSON.parse(storedConfig) as Configuration;
    } catch (error) {
      console.error('Error loading configuration from localStorage:', error);
      return createDefaultConfiguration();
    }
  },
  
  /**
   * Save configuration to local storage
   * @param config - Configuration to save
   * @returns True if saved successfully
   */
  saveConfiguration: (config: Configuration): boolean => {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
      return true;
    } catch (error) {
      console.error('Error saving configuration to localStorage:', error);
      return false;
    }
  },
  
  /**
   * Get all available voices
   * @returns Array of all available voices
   */
  getAvailableVoices: () => {
    return availableVoices;
  },
  
  /**
   * Get a voice by ID
   * @param id - Voice ID
   * @returns Voice or undefined if not found
   */
  getVoiceById: (id: string) => {
    return availableVoices.find(voice => voice.id === id);
  }
};
