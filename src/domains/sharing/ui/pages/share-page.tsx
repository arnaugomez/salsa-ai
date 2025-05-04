'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/shared/components';
import { ShareButton } from '../components';
import { DanceSessionViewModel } from '@/domains/dance/data/view-models';
import { formatTime } from '@/shared/utils';

interface SharePageProps {
  session: DanceSessionViewModel;
  onBackToStart: () => void;
}

export function SharePage({ session, onBackToStart }: SharePageProps) {
  // Format the dance time
  const formattedTime = formatTime(session.elapsedTime);
  
  return (
    <PageContainer title="¡Felicidades!">
      <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              Resumen de tu sesión
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-lg mb-2">Has bailado durante</p>
              <p className="text-4xl font-bold text-primary">{formattedTime}</p>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-lg mb-4">
                ¡Comparte tu logro con tus amigos!
              </p>
              <ShareButton 
                session={session}
                size="lg"
                className="w-full"
              >
                Compartir en redes sociales
              </ShareButton>
            </div>
          </CardContent>
        </Card>
        
        <Button 
          variant="outline" 
          onClick={onBackToStart}
          className="mt-4"
        >
          Volver al inicio
        </Button>
      </div>
    </PageContainer>
  );
}
