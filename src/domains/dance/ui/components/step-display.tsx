'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DanceStep } from '../../domain/entities';

interface StepDisplayProps {
  step: DanceStep | null;
  className?: string;
}

export function StepDisplay({ step, className = '' }: StepDisplayProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Add animation when step changes
  useEffect(() => {
    if (step) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [step]);
  
  if (!step) {
    return (
      <Card className={`w-full ${className}`}>
        <CardHeader>
          <CardTitle className="text-center text-primary">Paso actual</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            No hay paso seleccionado
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card 
      className={`w-full transition-all duration-500 ${className} ${
        isAnimating ? 'scale-105 bg-primary/5' : ''
      }`}
    >
      <CardHeader>
        <CardTitle className="text-center text-primary">Paso actual</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">{step.name}</h2>
          <p className="text-sm text-muted-foreground">
            {step.mode === 'single' ? 'Individual' : 'Pareja'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
