"use client";

import { useState, useEffect } from "react";
import { StartPage } from "@/domains/dance/ui/pages/start-page";
import { DancePage } from "@/domains/dance/ui/pages/dance-page";
import { ConfigurationPage } from "@/domains/configuration/ui/pages/configuration-page";
import { SharePage } from "@/domains/sharing/ui/pages/share-page";
import { Configuration } from "@/domains/configuration/domain/entities";
import { configurationRepository } from "@/domains/configuration/data/repositories";
import { useDanceSession } from "@/domains/dance/ui/hooks/use-dance-session";

// Define the possible app states
type AppState = "start" | "dance" | "configuration" | "share";

export default function Home() {
  // State for the current app state
  const [appState, setAppState] = useState<AppState>("start");

  // State for the configuration
  const [config, setConfig] = useState<Configuration | null>(null);

  // Use the dance session hook
  const { session } = useDanceSession();

  // Load configuration on mount
  useEffect(() => {
    const savedConfig = configurationRepository.getConfiguration();
    setConfig(savedConfig);
  }, []);

  // Handle start dance button click
  const handleStartDance = (newConfig: Configuration) => {
    setConfig(newConfig);
    setAppState("dance");
  };

  // Handle stop dance button click
  const handleStopDance = () => {
    setAppState("share");
  };

  // Handle back to start button click
  const handleBackToStart = () => {
    setAppState("start");
  };

  // Render the appropriate page based on the app state
  const renderPage = () => {
    if (!config) {
      return <div>Cargando configuración...</div>;
    }

    switch (appState) {
      case "start":
        return <StartPage onStartDance={handleStartDance} />;
      case "dance":
        return <DancePage config={config} onStopDance={handleStopDance} />;
      case "configuration":
        return <ConfigurationPage />;
      case "share":
        return (
          <SharePage session={session} onBackToStart={handleBackToStart} />
        );
      default:
        return <StartPage onStartDance={handleStartDance} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {renderPage()}

      <footer className="mt-auto py-4 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Salsa Pro - Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
