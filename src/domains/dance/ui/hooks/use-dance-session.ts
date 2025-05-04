'use client';

import { useState, useEffect, useCallback } from 'react';
import { DanceStep } from '../../domain/entities';
import { DanceSessionViewModel, createDanceSessionViewModel, updateElapsedTime } from '../../data/view-models';
import { startDanceSessionUseCase, stopDanceSessionUseCase } from '../../domain/usecases';
import { configurationRepository } from '@/domains/configuration/data/repositories';

/**
 * Custom hook for managing a dance session
 */
export function useDanceSession() {
  // State for the dance session
  const [session, setSession] = useState<DanceSessionViewModel>(createDanceSessionViewModel());
  
  // Update elapsed time every second when session is active
  useEffect(() => {
    if (!session.isActive) return;
    
    const intervalId = setInterval(() => {
      if (session.startTime) {
        const now = new Date();
        const elapsedSeconds = Math.floor((now.getTime() - session.startTime.getTime()) / 1000);
        setSession(prev => updateElapsedTime(prev, elapsedSeconds));
      }
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [session.isActive, session.startTime]);
  
  /**
   * Start a new dance session
   * @param initialStep - Initial dance step
   */
  const startSession = useCallback(async (initialStep: DanceStep) => {
    const config = configurationRepository.getConfiguration();
    const newSession = await startDanceSessionUseCase(session, initialStep, config.selectedVoice);
    setSession(newSession);
  }, [session]);
  
  /**
   * Stop the current dance session
   */
  const stopSession = useCallback(() => {
    const newSession = stopDanceSessionUseCase(session);
    setSession(newSession);
  }, [session]);
  
  /**
   * Update the current step in the session
   * @param step - New dance step
   */
  const updateCurrentStep = useCallback((step: DanceStep) => {
    setSession(prev => ({
      ...prev,
      currentStep: step
    }));
  }, []);
  
  return {
    session,
    startSession,
    stopSession,
    updateCurrentStep
  };
}
