/**
 * State for configuration UI
 */
export interface ConfigurationState {
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
 * Create default configuration state
 * @returns Default configuration state
 */
export function createDefaultConfigurationState(): ConfigurationState {
  return {
    error: null,
    isSaving: false
  };
}

/**
 * Set the error message in configuration state
 * @param state - Current state
 * @param error - Error message
 * @returns Updated state
 */
export function setError(
  state: ConfigurationState,
  error: string | null
): ConfigurationState {
  return {
    ...state,
    error
  };
}

/**
 * Set the saving state in configuration state
 * @param state - Current state
 * @param isSaving - Whether the configuration is being saved
 * @returns Updated state
 */
export function setSaving(
  state: ConfigurationState,
  isSaving: boolean
): ConfigurationState {
  return {
    ...state,
    isSaving
  };
}
