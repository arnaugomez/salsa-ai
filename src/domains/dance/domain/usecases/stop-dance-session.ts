import { DanceSessionViewModel, endDanceSession } from '../../data/view-models';

/**
 * Stop an active dance session
 * @param session - Current session view model
 * @returns Updated session view model
 */
export function stopDanceSessionUseCase(
  session: DanceSessionViewModel
): DanceSessionViewModel {
  // Only end the session if it's active
  if (!session.isActive) {
    return session;
  }
  
  return endDanceSession(session);
}
