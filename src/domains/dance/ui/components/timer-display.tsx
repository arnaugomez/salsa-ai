'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTime } from '@/shared/utils';

interface TimerDisplayProps {
  elapsedTime: number;
  className?: string;
}

export function TimerDisplay({ elapsedTime, className = '' }: TimerDisplayProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="text-center text-primary">Tiempo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-center">{formatTime(elapsedTime)}</h2>
          <p className="text-sm text-muted-foreground">
            Tiempo bailando
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
