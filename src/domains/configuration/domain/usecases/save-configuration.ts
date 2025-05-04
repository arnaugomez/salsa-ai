import { Configuration } from '../entities';
import { ConfigurationViewModel, setSaving, setError, updateConfiguration } from '../../data/view-models';
import { configurationRepository } from '../../data/repositories';

/**
 * Save configuration to local storage
 * @param viewModel - Current configuration view model
 * @param config - Configuration to save
 * @returns Updated configuration view model
 */
export async function saveConfigurationUseCase(
  viewModel: ConfigurationViewModel,
  config: Configuration
): Promise<ConfigurationViewModel> {
  // Set saving state
  let updatedViewModel = setSaving(viewModel, true);
  
  try {
    // Save configuration to local storage
    const success = configurationRepository.saveConfiguration(config);
    
    if (!success) {
      return setError(
        setSaving(updatedViewModel, false),
        'Error al guardar la configuración'
      );
    }
    
    // Update the view model with the new configuration
    updatedViewModel = updateConfiguration(updatedViewModel, config);
    
    // Clear any previous error
    updatedViewModel = setError(updatedViewModel, null);
    
    return setSaving(updatedViewModel, false);
  } catch (error) {
    console.error('Error saving configuration:', error);
    
    return setError(
      setSaving(updatedViewModel, false),
      'Error al guardar la configuración'
    );
  }
}
