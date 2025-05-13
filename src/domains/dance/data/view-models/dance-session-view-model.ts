import { DanceStep } from "../../domain/entities";

/**
 * View model for a dance session
 */
export interface DanceSessionViewModel {
  /**
   * Whether the session is currently active
   */
  isActive: boolean;

  /**
   * Current dance step
   */
  currentStep: DanceStep | null;

  /**
   * Time elapsed in seconds
   */
  elapsedTime: number;

  /**
   * Start time of the session
   */
  startTime: Date | null;

  /**
   * End time of the session
   */
  endTime: Date | null;
}

/**
 * Create a new dance session view model
 * @returns Empty dance session view model
 */
export function createDanceSessionViewModel(): DanceSessionViewModel {
  return {
    isActive: false,
    currentStep: null,
    elapsedTime: 0,
    startTime: null,
    endTime: null,
  };
}

/**
 * Start a dance session
 * @param session - Current session view model
 * @param initialStep - Initial dance step
 * @returns Updated session view model
 */
export function startDanceSession(
  session: DanceSessionViewModel,
  initialStep: DanceStep
): DanceSessionViewModel {
  return {
    ...session,
    isActive: true,
    currentStep: initialStep,
    elapsedTime: 0,
    startTime: new Date(),
    endTime: null,
  };
}

/**
 * Update the current step in a dance session
 * @param session - Current session view model
 * @param step - New dance step
 * @returns Updated session view model
 */
export function updateCurrentStep(
  session: DanceSessionViewModel,
  step: DanceStep
): DanceSessionViewModel {
  return {
    ...session,
    currentStep: step,
  };
}

/**
 * Update the elapsed time in a dance session
 * @param session - Current session view model
 * @param elapsedTime - New elapsed time in seconds
 * @returns Updated session view model
 */
export function updateElapsedTime(
  session: DanceSessionViewModel,
  elapsedTime: number
): DanceSessionViewModel {
  return {
    ...session,
    elapsedTime,
  };
}

/**
 * End a dance session
 * @param session - Current session view model
 * @returns Updated session view model
 */
export function endDanceSession(
  session: DanceSessionViewModel
): DanceSessionViewModel {
  const endTime = new Date();

  // Calculate the final elapsed time based on start and end times
  let finalElapsedTime = session.elapsedTime;
  if (session.startTime) {
    finalElapsedTime = Math.floor(
      (endTime.getTime() - session.startTime.getTime()) / 1000
    );
  }

  return {
    ...session,
    isActive: false,
    elapsedTime: finalElapsedTime,
    endTime: endTime,
  };
}
