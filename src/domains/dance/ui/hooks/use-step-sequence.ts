"use client";

import { useState, useEffect, useCallback } from "react";
import { DanceStep } from "../../domain/entities";
import {
  Configuration,
  getTimeBetweenSteps,
} from "@/domains/configuration/domain/entities";
import {
  getNextStepUseCase,
  selectRandomStepUseCase,
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

  // Get all steps
  const allSteps = stepRepository.getAll();

  /**
   * Select the "Básico" step as the initial step
   * Falls back to random selection if "Básico" is not available
   */
  const selectInitialStep = useCallback(() => {
    // Find the "Básico" step for the current dance and mode
    const basicStepId = `${config.selectedDance}-${config.selectedMode}-basico`;
    const basicStep = allSteps.find(
      (step) =>
        step.id === basicStepId && config.selectedSteps.includes(step.id)
    );

    // If the "Básico" step is available, use it
    if (basicStep) {
      setCurrentStep(basicStep);
      return basicStep;
    }

    // Otherwise, fall back to random selection
    console.log("Básico step not found, falling back to random selection");
    const step = selectRandomStepUseCase(allSteps, config);
    setCurrentStep(step);
    return step;
  }, [allSteps, config]);

  /**
   * Get the next step in the sequence
   */
  const getNextStep = useCallback(async () => {
    if (!session.isActive || !currentStep) return null;

    const updatedSession = await getNextStepUseCase(
      session,
      allSteps,
      config.selectedSteps,
      config.selectedVoice
    );

    if (updatedSession.currentStep) {
      setCurrentStep(updatedSession.currentStep);
      return updatedSession.currentStep;
    }

    return null;
  }, [
    session,
    currentStep,
    allSteps,
    config.selectedSteps,
    config.selectedVoice,
  ]);

  /**
   * Start automatic step sequence
   */
  const startStepSequence = useCallback(() => {
    if (!session.isActive) return;

    // Calculate time between steps based on difficulty
    const stepInterval = getTimeBetweenSteps(config);

    // Set up interval to change steps
    const intervalId = setInterval(() => {
      getNextStep();
    }, stepInterval);

    // Clean up interval when session ends
    return () => clearInterval(intervalId);
  }, [session.isActive, config, getNextStep]);

  // Start step sequence when session becomes active
  useEffect(() => {
    if (session.isActive) {
      const cleanup = startStepSequence();
      return cleanup;
    }
  }, [session.isActive, startStepSequence]);

  return {
    currentStep,
    selectInitialStep,
    getNextStep,
  };
}
