import { Configuration } from "../../domain/entities";
import { Voice } from "../repositories/data/voices";

/**
 * View model for configuration
 * Contains only the form data
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
}

/**
 * Create a new configuration view model
 * @param config - Initial configuration
 * @param voices - Available voices
 */
export function createConfigurationViewModel(
  config: Configuration,
  voices: Voice[]
): ConfigurationViewModel {
  return {
    configuration: config,
    availableVoices: voices,
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
    configuration: config,
  };
}
