import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './database.types';
import { notFound } from 'next/navigation';
import { InsertExcerciseSchema } from '@/app/(app)/admin/wiki/ExcerciseForm';
import { nanoid } from 'nanoid/non-secure';

const supabase = createClientComponentClient<Database>();

// -------- EXERCISES ------

export const getExcerciseById = async (id: string) => {
  const { data, error } = await supabase
    .from('excercises')
    .select('*')
    .eq('id', id);

  if (error) throw new Error('Supabase Error', { cause: error.code });

  if (data.length === 0) {
    console.log('not found');
    return notFound();
  }

  return data[0];
};

export const createExcercise = async (excercise: InsertExcerciseSchema) => {
  const id = nanoid(8);

  const { data, error } = await supabase
    .from('excercises')
    .insert({ ...excercise, id })
    .select();

  if (error) {
    return {
      error: `Supabase Error: ${error.code}`,
      data: null,
    };
  }

  return {
    error: null,
    data: data[0],
  };
};

export const updateExcercise = async (
  id: string,
  excercise: Partial<InsertExcerciseSchema>
) => {
  const { data, error } = await supabase
    .from('excercises')
    .update({ ...excercise })
    .eq('id', id)
    .select();

  if (error) {
    return {
      error: `Supabase Error: ${error.code}`,
      data: null,
    };
  }

  return {
    error: null,
    data: data[0],
  };
};

export const deleteExcercise = async (id: string) => {
  const response = await supabase.from('excercises').delete().eq('id', id);

  const { error } = response;

  if (error) {
    return {
      error: `Supabase Error: ${error.code}`,
      data: null,
    };
  }

  return {
    error: null,
    data: 'ok',
  };
};

export const getPatients = async () => {
  const { data, error } = await supabase.from('patients').select('*');

  if (error) {
    return {
      error: `Supabase Error: ${error.code}`,
      data: null,
    };
  }

  return {
    error: null,
    data,
  };
};
