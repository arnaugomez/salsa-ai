"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { DanceStep } from "../../domain/entities";
import {
  Configuration,
  getTimeBetweenSteps,
} from "@/domains/configuration/domain/entities";
import {
  getNextStepUseCase,
  selectRandomStepUseCase,
  findBasicStepUseCase,
} from "../../domain/usecases";
import { stepRepository } from "../../data/repositories";
import { DanceSessionViewModel } from "../../data/view-models";

/**
 * Custom hook for managing the step sequence in a dance session
 * @param session - Current dance session
 * @param config - Current configuration
 */
export function useStepSequence(
  session: DanceSessionViewModel,
  config: Configuration
) {
  // State for the current step
  const [currentStep, setCurrentStep] = useState<DanceStep | null>(
    session.currentStep
  );

  // Store all steps once to avoid recreating on each render
  const allStepsRef = useRef(stepRepository.getAll());

  // Store interval ID to manage cleanup
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Store mutable references to session and config to avoid dependency issues
  const sessionRef = useRef(session);
  const configRef = useRef(config);

  // Update refs when props change
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  // Function to select the initial step - wrapped in useCallback for consistency
  const selectInitialStep = useCallback(() => {
    const currentConfig = configRef.current;

    // Try to find the basic step using the use case
    const basicStep = findBasicStepUseCase(allStepsRef.current, currentConfig);

    // If the "Básico" step is available, use it
    if (basicStep) {
      setCurrentStep(basicStep);
      return basicStep;
    }

    // Otherwise, fall back to random selection
    console.log("Básico step not found, falling back to random selection");
    const step = selectRandomStepUseCase(allStepsRef.current, currentConfig);
    setCurrentStep(step);
    return step;
  }, []); // No dependencies as it uses refs

  // Function to get the next step - wrapped in useCallback to maintain reference stability
  const getNextStep = useCallback(async () => {
    const currentSession = sessionRef.current;
    const currentConfig = configRef.current;
    const currentStepValue = currentStep;

    if (!currentSession.isActive || !currentStepValue) return null;

    console.log("Getting next step, current step:", currentStepValue.name);

    try {
      const updatedSession = await getNextStepUseCase(
        currentSession,
        allStepsRef.current,
        currentConfig.selectedSteps,
        currentConfig.selectedVoice
      );

      if (updatedSession.currentStep) {
        console.log("New step selected:", updatedSession.currentStep.name);
        setCurrentStep(updatedSession.currentStep);
        return updatedSession.currentStep;
      }
    } catch (error) {
      console.error("Error getting next step:", error);
    }

    return null;
  }, [currentStep]); // Only depend on currentStep

  // Store the getNextStep function in a ref to avoid dependency issues
  const getNextStepRef = useRef(getNextStep);

  // Update the getNextStep ref when the function changes
  useEffect(() => {
    getNextStepRef.current = getNextStep;
  }, [getNextStep]);

  // Set up and clean up the interval for step changes
  useEffect(() => {
    // Clean up any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only set up interval if session is active
    if (!session.isActive) {
      return;
    }

    console.log("Setting up step sequence interval");

    // Calculate time between steps based on difficulty
    const stepInterval = getTimeBetweenSteps(config);
    console.log(`Step interval: ${stepInterval}ms`);

    // Set up interval to change steps
    intervalRef.current = setInterval(() => {
      console.log("Interval triggered, getting next step");
      // We call the function from the ref to ensure we're using the latest version
      getNextStepRef.current();
    }, stepInterval);

    // Return cleanup function
    return () => {
      console.log("Cleaning up step sequence interval");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [session.isActive, config]); // Only depend on session.isActive and config

  return {
    currentStep,
    selectInitialStep,
    getNextStep,
  };
}
