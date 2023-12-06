import { Database } from '@/lib/supabase/database.types';

export type Role = Database['public']['Enums']['role'];

export enum ExerciseTags {
  UPPER_BODY = 'UPPER BODY',
  LOWER_BODY = 'LOWER BODY',
  FLEXIBILITY = 'FLEXIBILITY',
  MOBILITY = 'MOBILITY',
  STRENGTH = 'STRENGTH',
  CARDIO = 'CARDIO',
}
