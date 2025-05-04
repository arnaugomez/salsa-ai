import { DanceStep } from '../entities';
import { DanceSessionViewModel, startDanceSession } from '../../data/view-models';
import { soundService } from '../../data/services';

/**
 * Start a new dance session
 * @param session - Current session view model
 * @param initialStep - Initial dance step
 * @param voiceId - Voice ID for audio instructions
 * @returns Updated session view model
 */
export async function startDanceSessionUseCase(
  session: DanceSessionViewModel,
  initialStep: DanceStep,
  voiceId: string
): Promise<DanceSessionViewModel> {
  // Create a new session with the initial step
  const newSession = startDanceSession(session, initialStep);
  
  // Play the sound for the initial step
  await soundService.playStepSound(initialStep, voiceId);
  
  return newSession;
}
