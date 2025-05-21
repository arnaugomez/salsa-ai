"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Playlist } from "../../domain/entities";
import { YoutubeIcon } from "lucide-react";

interface PlaylistCardProps {
  playlist: Playlist;
  className?: string;
}

export function PlaylistCard({ playlist, className = "" }: PlaylistCardProps) {
  const handleOpenPlaylist = () => {
    window.open(playlist.url, "_blank");
  };

  return (
    <Card
      className={`w-full max-w-sm overflow-hidden pt-0 flex flex-col items-stretch ${className}`}
    >
      <div className="flex-1 flex flex-col gap-6">
        <div className="relative h-48 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={playlist.image}
            alt={playlist.name}
            className="absolute top-0 left-0 h-full w-full"
            style={{ objectFit: "cover" }}
          />
        </div>
        <CardHeader>
          <CardTitle>{playlist.name}</CardTitle>
          <CardDescription>{playlist.description}</CardDescription>
        </CardHeader>
      </div>
      <div className="flex-none">
        <CardFooter>
          <Button onClick={handleOpenPlaylist} className="w-full">
            {playlist.url.includes("youtube") ? (
              <YoutubeIcon color="white" className="mr-2" />
            ) : (
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
                fill="white"
              >
                <title>Spotify</title>
                <path
                  d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
                  fill="white"
                />
              </svg>
            )}
            Abrir playlist
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

interface PlaylistGridProps {
  playlists: Playlist[];
  className?: string;
}

export function PlaylistGrid({ playlists, className = "" }: PlaylistGridProps) {
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
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.url} playlist={playlist} />
      ))}
    </div>
  );
}
