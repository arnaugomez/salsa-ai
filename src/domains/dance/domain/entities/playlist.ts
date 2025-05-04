/**
 * Represents a music playlist recommended for dancing
 */
export interface Playlist {
  /**
   * Name of the playlist in Spanish
   */
  name: string;
  
  /**
   * URL to the playlist image
   */
  image: string;
  
  /**
   * Description of the playlist in Spanish
   */
  description: string;
  
  /**
   * URL to the playlist (e.g., Spotify, YouTube)
   */
  url: string;
  
  /**
   * Dance type identifier
   * Example: "salsa", "bachata"
   */
  dance: string;
}

/**
 * Get playlists for a specific dance type
 * @param playlists - Array of all playlists
 * @param danceType - Dance type to filter by
 * @returns Filtered array of playlists
 */
export function getPlaylistsByDanceType(playlists: Playlist[], danceType: string): Playlist[] {
  return playlists.filter(playlist => playlist.dance === danceType);
}
