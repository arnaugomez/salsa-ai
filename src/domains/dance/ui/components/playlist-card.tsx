'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Playlist } from '../../domain/entities';

interface PlaylistCardProps {
  playlist: Playlist;
  className?: string;
}

export function PlaylistCard({ playlist, className = '' }: PlaylistCardProps) {
  const handleOpenPlaylist = () => {
    window.open(playlist.url, '_blank');
  };
  
  return (
    <Card className={`w-full max-w-sm overflow-hidden ${className}`}>
      <div className="relative h-48 w-full">
        <Image
          src={playlist.image}
          alt={playlist.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <CardHeader>
        <CardTitle>{playlist.name}</CardTitle>
        <CardDescription>{playlist.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleOpenPlaylist} className="w-full">
          Abrir playlist
        </Button>
      </CardFooter>
    </Card>
  );
}

interface PlaylistGridProps {
  playlists: Playlist[];
  className?: string;
}

export function PlaylistGrid({ playlists, className = '' }: PlaylistGridProps) {
  if (playlists.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <p className="text-center text-muted-foreground">
          No hay playlists disponibles
        </p>
      </div>
    );
  }
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.url} playlist={playlist} />
      ))}
    </div>
  );
}
