import { Configuration } from "../entities";
import {
  ConfigurationState,
  setError,
  setSaving,
} from "../../ui/state/configuration-state";
import { configurationRepository } from "../../data/repositories";

/**
 * Save configuration to local storage
 * @param state - Current UI state
 * @param config - Configuration to save
 * @returns Updated UI state and a boolean indicating success
 */
export async function saveConfigurationUseCase(
  state: ConfigurationState,
  config: Configuration
): Promise<{ state: ConfigurationState; success: boolean }> {
  // Set saving state
  let updatedState = setSaving(state, true);

  try {
    // Save configuration to local storage
    const success = configurationRepository.saveConfiguration(config);

    if (!success) {
      return {
        state: setError(
          setSaving(updatedState, false),
          "Error al guardar la configuración"
        ),
        success: false,
      };
    }

    // Update the view model with the new configuration (handled by the caller)

    // Clear any previous error
    updatedState = setError(updatedState, null);

    return {
      state: setSaving(updatedState, false),
      success: true,
    };
  } catch (error) {
    console.error("Error saving configuration:", error);

    return {
      state: setError(
        setSaving(updatedState, false),
        "Error al guardar la configuración"
      ),
      success: false,
    };
  }
}
