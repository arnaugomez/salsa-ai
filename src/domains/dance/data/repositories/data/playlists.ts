import { Playlist } from '@/domains/dance/domain/entities';

/**
 * Recommended playlists for salsa dancing
 */
export const salsaPlaylists: Playlist[] = [
  {
    name: 'Salsa Clásica',
    image: '/images/playlists/salsa-clasica.jpg',
    description: 'Los mejores temas de salsa clásica para bailar',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX8q2xGbUCikR',
    dance: 'salsa'
  },
  {
    name: 'Salsa Moderna',
    image: '/images/playlists/salsa-moderna.jpg',
    description: 'Éxitos recientes de salsa para bailar',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX6XE7HRLM75P',
    dance: 'salsa'
  },
  {
    name: 'Salsa Cubana',
    image: '/images/playlists/salsa-cubana.jpg',
    description: 'Lo mejor de la salsa cubana',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX1VaFjJCgXm4',
    dance: 'salsa'
  }
];

/**
 * All recommended playlists
 */
export const allPlaylists: Playlist[] = [
  ...salsaPlaylists
];
