'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageContainer } from '@/shared/components';
import { DanceSelectionForm } from '../components';
import { configurationRepository } from '@/domains/configuration/data/repositories';
import { Configuration } from '@/domains/configuration/domain/entities';
import { saveConfigurationUseCase } from '@/domains/configuration/domain/usecases';
import { ConfigurationViewModel, createConfigurationViewModel } from '@/domains/configuration/data/view-models';
import { toast } from 'sonner';

interface StartPageProps {
  onStartDance: (config: Configuration) => void;
}

export function StartPage({ onStartDance }: StartPageProps) {
  const [configViewModel, setConfigViewModel] = useState<ConfigurationViewModel | null>(null);
  
  // Load configuration on mount
  useEffect(() => {
    const config = configurationRepository.getConfiguration();
    const voices = configurationRepository.getAvailableVoices();
    setConfigViewModel(createConfigurationViewModel(config, voices));
  }, []);
  
  // Handle form submission
  const handleSubmit = async (values: { danceType: string; mode: string; difficulty: string }) => {
    if (!configViewModel) return;
    
    // Update configuration
    const updatedConfig: Configuration = {
      ...configViewModel.configuration,
      selectedDance: values.danceType,
      selectedMode: values.mode,
      difficulty: parseInt(values.difficulty, 10)
    };
    
    // Save configuration
    const updatedViewModel = await saveConfigurationUseCase(configViewModel, updatedConfig);
    setConfigViewModel(updatedViewModel);
    
    // Show success message
    if (!updatedViewModel.error) {
      toast.success('Configuración guardada');
      
      // Start dance session
      onStartDance(updatedConfig);
    } else {
      toast.error(updatedViewModel.error);
    }
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
            <Button variant="outline">
              Configuración
            </Button>
          </Link>
        </div>
        
        {/* Dance selection form */}
        <DanceSelectionForm onSubmit={handleSubmit} />
      </div>
    </PageContainer>
  );
}
