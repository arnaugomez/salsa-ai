import { Playlist } from '../../domain/entities';
import { allPlaylists } from './data';

/**
 * Repository for accessing playlists
 */
export const playlistRepository = {
  /**
   * Get all playlists
   * @returns Array of all playlists
   */
  getAll: (): Playlist[] => {
    return allPlaylists;
  },

  /**
   * Get playlists by dance type
   * @param danceType - Dance type ID
   * @returns Array of playlists for the specified dance
   */
  getByDanceType: (danceType: string): Playlist[] => {
    return allPlaylists.filter(playlist => playlist.dance === danceType);
  }
};
