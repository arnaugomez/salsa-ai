import { DanceStep, getNextSteps } from '../entities';
import { DanceSessionViewModel, updateCurrentStep } from '../../data/view-models';
import { soundService } from '../../data/services';
import { getRandomInt } from '@/shared/utils';

/**
 * Get the next dance step in a session
 * @param session - Current session view model
 * @param allSteps - All available dance steps
 * @param availableStepIds - IDs of steps that are currently available/selected
 * @param voiceId - Voice ID for audio instructions
 * @returns Updated session view model
 */
export async function getNextStepUseCase(
  session: DanceSessionViewModel,
  allSteps: DanceStep[],
  availableStepIds: string[],
  voiceId: string
): Promise<DanceSessionViewModel> {
  // If there's no current step or the session is not active, return the session unchanged
  if (!session.currentStep || !session.isActive) {
    return session;
  }
  
  // Get possible next steps based on the current step
  const possibleNextSteps = getNextSteps(session.currentStep, allSteps, availableStepIds);
  
  // If there are no possible next steps, select a random step from all available steps
  let nextStep: DanceStep;
  if (possibleNextSteps.length === 0) {
    // Filter steps by dance and mode of the current step
    const fallbackSteps = allSteps.filter(step => 
      availableStepIds.includes(step.id) && 
      step.dance === session.currentStep!.dance && 
      step.mode === session.currentStep!.mode
    );
    
    // If there are still no steps available, return the session unchanged
    if (fallbackSteps.length === 0) {
      return session;
    }
    
    // Select a random step from the fallback steps
    const randomIndex = getRandomInt(0, fallbackSteps.length - 1);
    nextStep = fallbackSteps[randomIndex];
  } else {
    // Select a random step from the possible next steps
    const randomIndex = getRandomInt(0, possibleNextSteps.length - 1);
    nextStep = possibleNextSteps[randomIndex];
  }
  
  // Play the sound for the next step
  soundService.playStepSound(nextStep, voiceId);
  
  // Update the session with the new step
  return updateCurrentStep(session, nextStep);
}
