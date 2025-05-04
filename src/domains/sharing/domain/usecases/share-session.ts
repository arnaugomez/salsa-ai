import { DanceSessionViewModel } from '@/domains/dance/data/view-models';

/**
 * Share a dance session by copying a URL to the clipboard
 * @param session - Dance session to share
 * @returns Promise that resolves to true if the URL was copied successfully
 */
export async function shareSessionUseCase(
  session: DanceSessionViewModel
): Promise<boolean> {
  try {
    // Get the current URL
    const url = window.location.href;
    
    // Copy the URL to the clipboard
    await navigator.clipboard.writeText(url);
    
    return true;
  } catch (error) {
    console.error('Error sharing session:', error);
    return false;
  }
}
