"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dance, DanceMode } from "../../domain/entities";
import { danceRepository } from "../../data/repositories";
import { configurationRepository } from "@/domains/configuration/data/repositories";
import { Configuration } from "@/domains/configuration/domain/entities";

// Define the form schema with Zod
const formSchema = z.object({
  danceType: z.string().min(1, {
    message: "Por favor selecciona un tipo de baile",
  }),
  mode: z.string().min(1, {
    message: "Por favor selecciona un modo",
  }),
  difficulty: z.string().min(1, {
    message: "Por favor selecciona un nivel de dificultad",
  }),
});

// Define the form values type
type FormValues = z.infer<typeof formSchema>;

// Define the props for the component
interface DanceSelectionFormProps {
  onSubmit: (values: FormValues) => void;
}

export function DanceSelectionForm({ onSubmit }: DanceSelectionFormProps) {
  // State for available dances and modes
  const [dances, setDances] = useState<Dance[]>([]);
  const [modes, setModes] = useState<DanceMode[]>([]);

  // Initialize the form with sensible defaults
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      danceType: "salsa", // Default to salsa if no configuration exists
      mode: "couple", // Default to couple mode if no configuration exists
      difficulty: "3",
    },
  });

  // Load dances and initial configuration on mount
  useEffect(() => {
    // Get all available dances
    const availableDances = danceRepository.getAllDances();
    setDances(availableDances);

    // Load saved configuration
    const config = configurationRepository.getConfiguration();

    // Determine the dance type to use (from config or default to first available dance or 'salsa')
    const danceType = config.selectedDance || availableDances[0]?.id || "salsa";

    // Load available modes for the selected dance
    const danceModes = danceRepository.getModesForDance(danceType);
    setModes(danceModes);

    // Determine the mode to use (from config or default to first available mode or 'couple')
    const mode = config.selectedMode || danceModes[0]?.id || "couple";

    // Set form default values from saved configuration with fallbacks
    form.reset({
      danceType: danceType,
      mode: mode,
      difficulty: config.difficulty.toString() || "3",
    });
  }, [form]);

  // Save configuration to local storage
  const saveConfiguration = (values: Partial<FormValues>) => {
    // Get current configuration
    const currentConfig = configurationRepository.getConfiguration();

    // Update with new values
    const updatedConfig: Configuration = {
      ...currentConfig,
      selectedDance: values.danceType || currentConfig.selectedDance,
      selectedMode: values.mode || currentConfig.selectedMode,
      difficulty: values.difficulty
        ? parseInt(values.difficulty, 10)
        : currentConfig.difficulty,
    };

    // Save to local storage
    configurationRepository.saveConfiguration(updatedConfig);
  };

  // Handle dance type change
  const handleDanceTypeChange = (value: string) => {
    // Get available modes for the selected dance
    const danceModes = danceRepository.getModesForDance(value);
    setModes(danceModes);

    // Get current mode
    const currentMode = form.getValues("mode");

    // Check if current mode is available for the selected dance
    if (!danceModes.some((mode) => mode.id === currentMode)) {
      // If not available, set to first available mode or default to 'couple'
      const newMode = danceModes[0]?.id || "couple";
      form.setValue("mode", newMode);

      // Save configuration with new dance type and mode
      saveConfiguration({
        danceType: value,
        mode: newMode,
      });
    } else {
      // Save configuration with just the new dance type
      saveConfiguration({ danceType: value });
    }
  };

  // Handle mode change
  const handleModeChange = (value: string) => {
    // Save configuration with new mode
    saveConfiguration({ mode: value });
  };

  // Handle difficulty change
  const handleDifficultyChange = (value: string) => {
    // Save configuration with new difficulty
    saveConfiguration({ difficulty: value });
  };

  // Handle form submission
  const handleSubmit = (values: FormValues) => {
    // Save all form values to configuration
    saveConfiguration(values);

    // Call the onSubmit callback
    onSubmit(values);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-primary">
          Selecciona tu baile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Dance Type Selection */}
            <FormField
              control={form.control}
              name="danceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de baile</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleDanceTypeChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo de baile" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dances.map((dance) => (
                        <SelectItem key={dance.id} value={dance.id}>
                          {dance.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mode Selection */}
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modo</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleModeChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un modo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {modes.map((mode) => (
                        <SelectItem key={mode.id} value={mode.id}>
                          {mode.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Difficulty Selection */}
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel de dificultad</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleDifficultyChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un nivel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Muy fácil</SelectItem>
                      <SelectItem value="2">Fácil</SelectItem>
                      <SelectItem value="3">Medio</SelectItem>
                      <SelectItem value="4">Difícil</SelectItem>
                      <SelectItem value="5">Muy difícil</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Comenzar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
