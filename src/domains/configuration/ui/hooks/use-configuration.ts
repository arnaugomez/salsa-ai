'use client';

import { useState, useEffect, useCallback } from 'react';
import { ConfigurationViewModel, createConfigurationViewModel } from '../../data/view-models';
import { configurationRepository } from '../../data/repositories';
import { saveConfigurationUseCase } from '../../domain/usecases';

/**
 * Custom hook for managing configuration
 */
export function useConfiguration() {
  // State for configuration view model
  const [configViewModel, setConfigViewModel] = useState<ConfigurationViewModel | null>(null);
  
  // Load configuration on mount
  useEffect(() => {
    const config = configurationRepository.getConfiguration();
    const voices = configurationRepository.getAvailableVoices();
    setConfigViewModel(createConfigurationViewModel(config, voices));
  }, []);
  
  /**
   * Update selected steps
   * @param selectedSteps - New selected steps
   */
  const updateSelectedSteps = useCallback((selectedSteps: string[]) => {
    if (!configViewModel) return;
    
    setConfigViewModel(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        configuration: {
          ...prev.configuration,
          selectedSteps
        }
      };
    });
  }, [configViewModel]);
  
  /**
   * Update selected voice
   * @param selectedVoice - New selected voice
   */
  const updateSelectedVoice = useCallback((selectedVoice: string) => {
    if (!configViewModel) return;
    
    setConfigViewModel(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        configuration: {
          ...prev.configuration,
          selectedVoice
        }
      };
    });
  }, [configViewModel]);
  
  /**
   * Save configuration
   * @returns Promise that resolves to true if saved successfully
   */
  const saveConfiguration = useCallback(async (): Promise<boolean> => {
    if (!configViewModel) return false;
    
    try {
      const updatedViewModel = await saveConfigurationUseCase(
        configViewModel,
        configViewModel.configuration
      );
      
      setConfigViewModel(updatedViewModel);
      
      return !updatedViewModel.error;
    } catch (error) {
      console.error('Error saving configuration:', error);
      return false;
    }
  }, [configViewModel]);
  
  return {
    configViewModel,
    updateSelectedSteps,
    updateSelectedVoice,
    saveConfiguration
  };
}
