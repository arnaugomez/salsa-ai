'use client';

import { useState, useCallback } from 'react';
import { DanceSessionViewModel } from '@/domains/dance/data/view-models';
import { shareSessionUseCase } from '../../domain/usecases';
import { toast } from 'sonner';

/**
 * Custom hook for sharing functionality
 * @param session - Dance session to share
 */
export function useShare(session: DanceSessionViewModel) {
  const [isSharing, setIsSharing] = useState(false);
  
  /**
   * Share the dance session
   * @returns Promise that resolves to true if shared successfully
   */
  const shareSession = useCallback(async (): Promise<boolean> => {
    setIsSharing(true);
    
    try {
      const success = await shareSessionUseCase(session);
      
      if (success) {
        toast.success('¡Enlace copiado al portapapeles!');
      } else {
        toast.error('No se pudo compartir la sesión');
      }
      
      return success;
    } catch (error) {
      console.error('Error sharing session:', error);
      toast.error('Error al compartir la sesión');
      return false;
    } finally {
      setIsSharing(false);
    }
  }, [session]);
  
  return {
    isSharing,
    shareSession
  };
}
