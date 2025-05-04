/**
 * Voice configuration for text-to-speech
 */
export interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female';
  locale: string;
}

/**
 * Available voices for the instructor
 */
export const availableVoices: Voice[] = [
  {
    id: 'es-CU-BelkysNeural',
    name: 'Belkys (Cubana)',
    gender: 'female',
    locale: 'es-CU'
  },
  {
    id: 'es-CU-ManuelNeural',
    name: 'Manuel (Cubano)',
    gender: 'male',
    locale: 'es-CU'
  },
  {
    id: 'es-ES-ElviraNeural',
    name: 'Elvira (Española)',
    gender: 'female',
    locale: 'es-ES'
  },
  {
    id: 'es-ES-AlvaroNeural',
    name: 'Álvaro (Español)',
    gender: 'male',
    locale: 'es-ES'
  },
  {
    id: 'es-ES-ArnauNeural',
    name: 'Arnau (Español)',
    gender: 'male',
    locale: 'es-ES'
  },
  {
    id: 'es-ES-LaiaNeural',
    name: 'Laia (Española)',
    gender: 'female',
    locale: 'es-ES'
  }
];
