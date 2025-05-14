import { DanceStep } from '../entities';
import { Configuration } from '@/domains/configuration/domain/entities';

/**
 * Find the basic step for a given dance and mode
 * @param allSteps - All available dance steps
 * @param config - Current configuration
 * @returns The basic step or null if not found
 */
export function findBasicStepUseCase(
  allSteps: DanceStep[],
  config: Configuration
): DanceStep | null {
  // Construct the basic step ID based on the dance and mode
  const basicStepId = `${config.selectedDance}-${config.selectedMode}-basico`;
  
  // Find the "Básico" step for the current dance and mode
  const basicStep = allSteps.find(
    (step) =>
      step.id === basicStepId && config.selectedSteps.includes(step.id)
  );
  
  // Return the basic step or null if not found
  return basicStep || null;
}
