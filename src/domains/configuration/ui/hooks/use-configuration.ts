"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ConfigurationViewModel,
  createConfigurationViewModel,
} from "../../data/view-models";
import { configurationRepository } from "../../data/repositories";
import { saveConfigurationUseCase } from "../../domain/usecases";
import {
  ConfigurationState,
  createDefaultConfigurationState,
} from "../state/configuration-state";
import { Configuration } from "../../domain/entities";

/**
 * Custom hook for managing configuration
 */
export function useConfiguration() {
  // State for configuration view model (form data)
  const [configViewModel, setConfigViewModel] =
    useState<ConfigurationViewModel | null>(null);

  // State for UI state (error and saving status)
  const [configState, setConfigState] = useState<ConfigurationState>(
    createDefaultConfigurationState()
  );

  // Reference to store the previous configuration for comparison
  const prevConfigRef = useRef<Configuration | null>(null);

  // Load configuration on mount
  useEffect(() => {
    const config = configurationRepository.getConfiguration();
    const voices = configurationRepository.getAvailableVoices();

    // Initialize view model with form data
    setConfigViewModel(createConfigurationViewModel(config, voices));

    // Initialize the previous config reference
    prevConfigRef.current = config;
  }, []);

  /**
   * Update selected steps
   * @param selectedSteps - New selected steps
   */
  const updateSelectedSteps = useCallback(
    (selectedSteps: string[]) => {
      if (!configViewModel) return;

      setConfigViewModel((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          configuration: {
            ...prev.configuration,
            selectedSteps,
          },
        };
      });
    },
    [configViewModel]
  );

  /**
   * Update selected voice
   * @param selectedVoice - New selected voice
   */
  const updateSelectedVoice = useCallback(
    (selectedVoice: string) => {
      if (!configViewModel) return;

      setConfigViewModel((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          configuration: {
            ...prev.configuration,
            selectedVoice,
          },
        };
      });
    },
    [configViewModel]
  );

  /**
   * Save configuration
   * @returns Promise that resolves to true if saved successfully
   */
  const saveConfiguration = useCallback(async (): Promise<boolean> => {
    if (!configViewModel) return false;

    try {
      // Call the use case with the current state and configuration
      const result = await saveConfigurationUseCase(
        configState,
        configViewModel.configuration
      );

      // Update the UI state
      setConfigState(result.state);

      return result.success;
    } catch (error) {
      console.error("Error saving configuration:", error);
      return false;
    }
  }, [configViewModel, configState]);

  // Listen for configuration changes and save automatically
  useEffect(() => {
    // Skip if no view model is available yet
    if (!configViewModel) return;

    // Skip the initial render
    if (!prevConfigRef.current) {
      prevConfigRef.current = configViewModel.configuration;
      return;
    }

    // If the configuration reference has changed, save it
    if (prevConfigRef.current !== configViewModel.configuration) {
      // Update the previous config reference
      prevConfigRef.current = configViewModel.configuration;
      console.log("save")

      // Save the configuration
      saveConfiguration();
    }
  }, [configViewModel, saveConfiguration]);

  return {
    configViewModel,
    configState,
    updateSelectedSteps,
    updateSelectedVoice,
    saveConfiguration,
  };
}
