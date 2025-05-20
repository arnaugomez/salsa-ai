
/**
 * Share a dance session by copying a URL to the clipboard
 * @returns Promise that resolves to true if the URL was copied successfully
 */
export async function shareSessionUseCase(
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
