'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageContainer } from '@/shared/components';
import { StepSelector, VoiceSelector } from '../components';
import { useConfiguration } from '../hooks/use-configuration';
import { toast } from 'sonner';
import { validateStepsConfigurationUseCase } from '../../domain/usecases';
import { stepRepository } from '@/domains/dance/data/repositories';

export function ConfigurationPage() {
  const {
    configViewModel,
    updateSelectedSteps,
    updateSelectedVoice,
    saveConfiguration
  } = useConfiguration();
  
  // Handle step selection change
  const handleStepsChange = (selectedSteps: string[]) => {
    if (!configViewModel) return;
    
    // Validate step configuration
    const allSteps = stepRepository.getAll();
    const validation = validateStepsConfigurationUseCase(selectedSteps, allSteps);
    
    // Update selected steps
    updateSelectedSteps(selectedSteps);
    
    // Show warning if there are invalid steps
    if (!validation.isValid) {
      const invalidStepsMessage = validation.invalidStepNames.join(', ');
      toast.warning(
        `Los siguientes pasos no tienen movimientos siguientes disponibles: ${invalidStepsMessage}`,
        { duration: 5000 }
      );
    }
  };
  
  // Handle voice selection change
  const handleVoiceChange = (voiceId: string) => {
    if (!configViewModel) return;
    updateSelectedVoice(voiceId);
  };
  
  // Handle save button click
  const handleSave = async () => {
    if (!configViewModel) return;
    
    const success = await saveConfiguration();
    
    if (success) {
      toast.success('Configuración guardada correctamente');
    } else if (configViewModel.error) {
      toast.error(configViewModel.error);
    }
  };
  
  if (!configViewModel) {
    return (
      <PageContainer title="Configuración">
        <div className="flex justify-center items-center h-64">
          <p>Cargando configuración...</p>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer title="Configuración">
      <div className="flex flex-col gap-8 w-full">
        {/* Back button */}
        <div className="w-full flex justify-start">
          <Link href="/">
            <Button variant="outline">
              Volver
            </Button>
          </Link>
        </div>
        
        {/* Voice selector */}
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Voz del instructor
          </h2>
          <VoiceSelector
            selectedVoice={configViewModel.configuration.selectedVoice}
            onVoiceChange={handleVoiceChange}
          />
        </div>
        
        {/* Step selector */}
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Pasos de baile
          </h2>
          <StepSelector
            selectedSteps={configViewModel.configuration.selectedSteps}
            danceType={configViewModel.configuration.selectedDance}
            mode={configViewModel.configuration.selectedMode}
            onStepsChange={handleStepsChange}
          />
        </div>
        
        {/* Save button */}
        <div className="w-full flex justify-end mt-4">
          <Button 
            onClick={handleSave}
            disabled={configViewModel.isSaving}
          >
            {configViewModel.isSaving ? 'Guardando...' : 'Guardar configuración'}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
