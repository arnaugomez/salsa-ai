import { Dance, DanceMode } from '@/domains/dance/domain/entities';

/**
 * Available dance types
 */
export const dances: Dance[] = [
  {
    id: 'salsa',
    name: 'Salsa',
    availableModes: ['single', 'couple']
  }
];

/**
 * Available dance modes
 */
export const danceModes: DanceMode[] = [
  {
    id: 'single',
    name: 'Individual'
  },
  {
    id: 'couple',
    name: 'Pareja'
  }
];
