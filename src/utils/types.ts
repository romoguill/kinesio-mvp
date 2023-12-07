import { Database } from '@/lib/supabase/database.types';

export type Role = Database['public']['Enums']['role'];

export enum ExerciseTags {
  UPPER_BODY = 'upper body',
  LOWER_BODY = 'lower body',
  FLEXIBILITY = 'flexibility',
  MOBILITY = 'mobility',
  STRENGTH = 'strength',
  CARDIO = 'cardio',
}
