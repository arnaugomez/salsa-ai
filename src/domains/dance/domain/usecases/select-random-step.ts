import { DanceStep } from '../entities';
import { Configuration } from '@/domains/configuration/domain/entities';
import { getRandomInt } from '@/shared/utils';

/**
 * Select a random initial step based on configuration
 * @param allSteps - All available dance steps
 * @param config - Current configuration
 * @returns Selected dance step or null if no steps are available
 */
export function selectRandomStepUseCase(
  allSteps: DanceStep[],
  config: Configuration
): DanceStep | null {
  // Filter steps based on configuration
  const availableSteps = allSteps.filter(step => 
    step.dance === config.selectedDance &&
    step.mode === config.selectedMode &&
    config.selectedSteps.includes(step.id)
  );
  
  // If there are no available steps, return null
  if (availableSteps.length === 0) {
    return null;
  }
  
  // Select a random step from the available steps
  const randomIndex = getRandomInt(0, availableSteps.length - 1);
  return availableSteps[randomIndex];
}
