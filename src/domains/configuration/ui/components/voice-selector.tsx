'use client';

import { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Voice } from '../../data/repositories/data/voices';
import { configurationRepository } from '../../data/repositories';

interface VoiceSelectorProps {
  selectedVoice: string;
  onVoiceChange: (voiceId: string) => void;
}

export function VoiceSelector({
  selectedVoice,
  onVoiceChange
}: VoiceSelectorProps) {
  // State for available voices
  const [voices, setVoices] = useState<Voice[]>([]);
  
  // Load voices on mount
  useEffect(() => {
    const availableVoices = configurationRepository.getAvailableVoices();
    setVoices(availableVoices);
  }, []);
  
  // Group voices by gender
  const femaleVoices = voices.filter(voice => voice.gender === 'female');
  const maleVoices = voices.filter(voice => voice.gender === 'male');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Voz del instructor</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedVoice}
          onValueChange={onVoiceChange}
          className="space-y-6"
        >
          {/* Female voices */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Voces femeninas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {femaleVoices.map(voice => (
                <div key={voice.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={voice.id} id={`voice-${voice.id}`} />
                  <Label htmlFor={`voice-${voice.id}`}>{voice.name}</Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Male voices */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Voces masculinas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {maleVoices.map(voice => (
                <div key={voice.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={voice.id} id={`voice-${voice.id}`} />
                  <Label htmlFor={`voice-${voice.id}`}>{voice.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
