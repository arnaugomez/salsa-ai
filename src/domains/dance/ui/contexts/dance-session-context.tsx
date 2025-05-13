'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DanceStep } from '../../domain/entities';
import { 
  DanceSessionViewModel, 
  createDanceSessionViewModel, 
  updateElapsedTime 
} from '../../data/view-models';
import { 
  startDanceSessionUseCase, 
  stopDanceSessionUseCase 
} from '../../domain/usecases';
import { configurationRepository } from '@/domains/configuration/data/repositories';

// Define the context type
interface DanceSessionContextType {
  session: DanceSessionViewModel;
  startSession: (initialStep: DanceStep) => Promise<void>;
  stopSession: () => void;
  updateCurrentStep: (step: DanceStep) => void;
}

// Create the context with a default value
const DanceSessionContext = createContext<DanceSessionContextType | undefined>(undefined);

// Provider component
export function DanceSessionProvider({ children }: { children: React.ReactNode }) {
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
  
  // Create the context value
  const contextValue: DanceSessionContextType = {
    session,
    startSession,
    stopSession,
    updateCurrentStep
  };
  
  return (
    <DanceSessionContext.Provider value={contextValue}>
      {children}
    </DanceSessionContext.Provider>
  );
}

// Custom hook to use the dance session context
export function useDanceSession() {
  const context = useContext(DanceSessionContext);
  
  if (context === undefined) {
    throw new Error('useDanceSession must be used within a DanceSessionProvider');
  }
  
  return context;
}
