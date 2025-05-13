"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/shared/components";
import { DanceSelectionForm } from "../components";
import { configurationRepository } from "@/domains/configuration/data/repositories";
import { Configuration } from "@/domains/configuration/domain/entities";
import {
  ConfigurationViewModel,
  createConfigurationViewModel,
} from "@/domains/configuration/data/view-models";

interface StartPageProps {
  onStartDance: (config: Configuration) => void;
}

export function StartPage({ onStartDance }: StartPageProps) {
  const [configViewModel, setConfigViewModel] =
    useState<ConfigurationViewModel | null>(null);

  // Load configuration on mount
  useEffect(() => {
    const config = configurationRepository.getConfiguration();
    const voices = configurationRepository.getAvailableVoices();
    setConfigViewModel(createConfigurationViewModel(config, voices));
  }, []);

  // Handle form submission
  const handleSubmit = (values: {
    danceType: string;
    mode: string;
    difficulty: string;
  }) => {
    console.log("StartPage handleSubmit received values:", values);
    console.log("Mode value received in StartPage:", values.mode);

    if (!configViewModel) {
      console.error("configViewModel is null, cannot submit form");
      return;
    }

    console.log("Current configViewModel before update:", configViewModel);

    // Update configuration
    const updatedConfig: Configuration = {
      ...configViewModel.configuration,
      selectedDance: values.danceType,
      selectedMode: values.mode,
      difficulty: parseInt(values.difficulty, 10),
    };

    console.log("Updated configuration:", updatedConfig);
    console.log("Mode in updated configuration:", updatedConfig.selectedMode);

    // Start dance session
    onStartDance(updatedConfig);
  };

  return (
    <PageContainer title="Salsa Pro">
      <div className="flex flex-col items-center gap-8 w-full">
        <p className="text-xl text-center">
          Bienvenido a tu instructor de baile personal
        </p>

        {/* Configuration link */}
        <div className="w-full flex justify-end">
          <Link href="/configuration">
            <Button variant="outline">Configuración</Button>
          </Link>
        </div>

        {/* Dance selection form */}
        <DanceSelectionForm onSubmit={handleSubmit} />
      </div>
    </PageContainer>
  );
}
