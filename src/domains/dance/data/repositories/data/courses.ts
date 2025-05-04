import { DanceCourse } from '@/domains/dance/domain/entities';

/**
 * Salsa dance courses
 * To get the steps of a course, use the course ID in course field of the DanceStep interface
 */
export const salsaCourses: DanceCourse[] = [
  {
    id: 'salsa-1',
    name: 'Salsa Nivel 1',
  },
  {
    id: 'salsa-2',
    name: 'Salsa Nivel 2',
  }
];

/**
 * All dance courses
 */
export const allCourses: DanceCourse[] = [
  ...salsaCourses
];
