import { DanceStep, hasValidNextMoves } from '@/domains/dance/domain/entities';

/**
 * Validate that each selected step has valid next moves
 * @param selectedStepIds - IDs of selected steps
 * @param allSteps - All available dance steps
 * @returns Object with validation result and error message if any
 */
export function validateStepsConfigurationUseCase(
  selectedStepIds: string[],
  allSteps: DanceStep[]
): { isValid: boolean; invalidStepNames: string[] } {
  // If no steps are selected, it's valid (but not useful)
  if (selectedStepIds.length === 0) {
    return { isValid: true, invalidStepNames: [] };
  }
  
  // Get the selected steps
  const selectedSteps = allSteps.filter(step => selectedStepIds.includes(step.id));
  
  // Check each step for valid next moves
  const invalidSteps = selectedSteps.filter(step => !hasValidNextMoves(step, selectedStepIds));
  
  // If there are invalid steps, return their names
  if (invalidSteps.length > 0) {
    return {
      isValid: false,
      invalidStepNames: invalidSteps.map(step => step.name)
    };
  }
  
  return { isValid: true, invalidStepNames: [] };
}
