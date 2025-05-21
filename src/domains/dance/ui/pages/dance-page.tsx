"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/shared/components";
import { StepDisplay, TimerDisplay, PlaylistGrid } from "../components";
import { useDanceSession, useStepSequence } from "../hooks";
import { Configuration } from "@/domains/configuration/domain/entities";
import { playlistRepository, stepRepository } from "../../data/repositories";
import { Playlist } from "../../domain/entities";
import { toast } from "sonner";

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
    const dancePlaylists = playlistRepository.getByDanceType(
      config.selectedDance
    );
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
        toast.error("No hay pasos disponibles para esta configuración");
        return;
      }

      // When no steps are selected, add all available steps to the configuration
      // This ensures the Básico step will be included in the selection
      config.selectedSteps = availableSteps.map((step) => step.id);

      // Select the Básico step as the initial step
      const initialStep = selectInitialStep();

      if (initialStep) {
        await startSession(initialStep);
      } else {
        toast.error("No se pudo seleccionar un paso inicial");
      }
    } else {
      // Select the Básico step as the initial step
      const initialStep = selectInitialStep();

      if (initialStep) {
        await startSession(initialStep);
      } else {
        toast.error("No se pudo seleccionar un paso inicial");
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

            {/** ADD THE Safari iOS warning alert here */}
            <IosSafariWarning />

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

// Component to display a warning for iOS Safari users
function IosSafariWarning() {
  const [isIosSafari, setIsIosSafari] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    if (isIOS && isSafari) {
      setIsIosSafari(true);
    }
  }, []);

  if (!isIosSafari) {
    return null;
  }

  return (
    <div
      className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-4"
      role="alert"
    >
      <p className="font-bold">Advertencia</p>
      <p>
        El sonido no funcione en este navegador (iOS Safari). Recomendamos usar
        otro navegador para una mejor experiencia.
      </p>
    </div>
  );
}
