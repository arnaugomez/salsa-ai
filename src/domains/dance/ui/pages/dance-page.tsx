'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PageContainer } from '@/shared/components';
import { StepDisplay, TimerDisplay, PlaylistGrid } from '../components';
import { useDanceSession, useStepSequence } from '../hooks';
import { Configuration } from '@/domains/configuration/domain/entities';
import { playlistRepository, stepRepository } from '../../data/repositories';
import { Playlist } from '../../domain/entities';
import { toast } from 'sonner';

interface DancePageProps {
  config: Configuration;
  onStopDance: () => void;
}

export function DancePage({ config, onStopDance }: DancePageProps) {
  // State for playlists
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  
  // Use custom hooks
  const { session, startSession, stopSession } = useDanceSession();
  const { currentStep, selectInitialStep } = useStepSequence(session, config);
  
  // Load playlists on mount
  useEffect(() => {
    const dancePlaylists = playlistRepository.getByDanceType(config.selectedDance);
    setPlaylists(dancePlaylists);
  }, [config.selectedDance]);
  
  // Handle start dance button click
  const handleStartDance = async () => {
    // Check if there are selected steps
    if (config.selectedSteps.length === 0) {
      // If no steps are selected, use all steps for the selected dance and mode
      const availableSteps = stepRepository.getByDanceAndMode(
        config.selectedDance,
        config.selectedMode
      );
      
      if (availableSteps.length === 0) {
        toast.error('No hay pasos disponibles para esta configuración');
        return;
      }
      
      // Select a random initial step
      const initialStep = selectInitialStep();
      if (initialStep) {
        await startSession(initialStep);
      } else {
        toast.error('No se pudo seleccionar un paso inicial');
      }
    } else {
      // Select a random initial step from the selected steps
      const initialStep = selectInitialStep();
      if (initialStep) {
        await startSession(initialStep);
      } else {
        toast.error('No se pudo seleccionar un paso inicial');
      }
    }
  };
  
  // Handle stop dance button click
  const handleStopDance = () => {
    stopSession();
    onStopDance();
  };
  
  return (
    <PageContainer title="Sesión de baile">
      <div className="flex flex-col items-center gap-8 w-full">
        {!session.isActive ? (
          <>
            {/* Start button */}
            <Button 
              size="lg" 
              className="w-full max-w-md text-lg py-6"
              onClick={handleStartDance}
            >
              Comenzar a bailar
            </Button>
            
            {/* Playlists */}
            <div className="w-full mt-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Playlists recomendadas
              </h2>
              <PlaylistGrid playlists={playlists} />
            </div>
          </>
        ) : (
          <>
            {/* Dance session */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <StepDisplay step={currentStep} />
              <TimerDisplay elapsedTime={session.elapsedTime} />
            </div>
            
            {/* Stop button */}
            <Button 
              variant="destructive" 
              size="lg" 
              className="mt-4"
              onClick={handleStopDance}
            >
              Terminar sesión
            </Button>
          </>
        )}
      </div>
    </PageContainer>
  );
}
