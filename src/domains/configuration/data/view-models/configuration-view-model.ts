import { Configuration } from '../../domain/entities';
import { Voice } from '../repositories/data/voices';

/**
 * View model for configuration
 */
export interface ConfigurationViewModel {
  /**
   * Current configuration
   */
  configuration: Configuration;
  
  /**
   * Available voices
   */
  availableVoices: Voice[];
  
  /**
   * Error message (if any)
   */
  error: string | null;
  
  /**
   * Whether the configuration is being saved
   */
  isSaving: boolean;
}

/**
 * Create a new configuration view model
 * @param config - Initial configuration
 * @param voices - Available voices
 * @returns Configuration view model
 */
export function createConfigurationViewModel(
  config: Configuration,
  voices: Voice[]
): ConfigurationViewModel {
  return {
    configuration: config,
    availableVoices: voices,
    error: null,
    isSaving: false
  };
}

/**
 * Update the configuration in a view model
 * @param viewModel - Current view model
 * @param config - New configuration
 * @returns Updated view model
 */
export function updateConfiguration(
  viewModel: ConfigurationViewModel,
  config: Configuration
): ConfigurationViewModel {
  return {
    ...viewModel,
    configuration: config
  };
}

/**
 * Set the error message in a view model
 * @param viewModel - Current view model
 * @param error - Error message
 * @returns Updated view model
 */
export function setError(
  viewModel: ConfigurationViewModel,
  error: string | null
): ConfigurationViewModel {
  return {
    ...viewModel,
    error
  };
}

/**
 * Set the saving state in a view model
 * @param viewModel - Current view model
 * @param isSaving - Whether the configuration is being saved
 * @returns Updated view model
 */
export function setSaving(
  viewModel: ConfigurationViewModel,
  isSaving: boolean
): ConfigurationViewModel {
  return {
    ...viewModel,
    isSaving
  };
}
