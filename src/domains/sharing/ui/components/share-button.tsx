"use client";

import { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { shareSessionUseCase } from "../../domain/usecases";
import { toast } from "sonner";

interface ShareButtonProps extends Omit<ButtonProps, "onClick"> {
  onShareSuccess?: () => void;
  onShareError?: () => void;
}

export function ShareButton({
  onShareSuccess,
  onShareError,
  children = "Compartir",
  ...props
}: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);

    try {
      const success = await shareSessionUseCase();

      if (success) {
        toast.success("¡Enlace copiado al portapapeles!");
        onShareSuccess?.();
      } else {
        toast.error("No se pudo compartir la sesión");
        onShareError?.();
      }
    } catch (error) {
      console.error("Error sharing session:", error);
      toast.error("Error al compartir la sesión");
      onShareError?.();
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Button onClick={handleShare} disabled={isSharing} {...props}>
      {children}
    </Button>
  );
}
