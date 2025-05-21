"use client";

import { useState } from "react";
import { StartPage } from "@/domains/dance/ui/pages/start-page";
import { DancePage } from "@/domains/dance/ui/pages/dance-page";
import { ConfigurationPage } from "@/domains/configuration/ui/pages/configuration-page";
import { SharePage } from "@/domains/sharing/ui/pages/share-page";
import { Configuration } from "@/domains/configuration/domain/entities";
import { configurationRepository } from "@/domains/configuration/data/repositories";
import { DanceSessionProvider } from "@/domains/dance/ui/contexts/dance-session-context";

// Define the possible app states
type AppState = "start" | "dance" | "configuration" | "share";

export default function Home() {
  // State for the current app state
  const [appState, setAppState] = useState<AppState>("start");

  // State for the configuration
  const [config, setConfig] = useState<Configuration>(() =>
    configurationRepository.getConfiguration()
  );

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
    switch (appState) {
      case "start":
        return <StartPage onStartDance={handleStartDance} />;
      case "dance":
        return <DancePage config={config} onStopDance={handleStopDance} />;
      case "configuration":
        return <ConfigurationPage />;
      case "share":
        return <SharePage onBackToStart={handleBackToStart} />;
      default:
        return <StartPage onStartDance={handleStartDance} />;
    }
  };

  return (
    <DanceSessionProvider>
      <div className="min-h-screen flex flex-col">
        {renderPage()}

        <footer className="mt-auto py-4 text-center text-sm text-muted-foreground">
          <p>
            Salsa AI, proyecto de AI-nau. Si sabes programar o quieres sugerir
            una mejora,{" "}
            <a className="underline" href="https://github.com/arnaugomez/salsa-ai" target="_blank">
              ¡contribuye en GitHub!
            </a>
          </p>
        </footer>
      </div>
    </DanceSessionProvider>
  );
}
