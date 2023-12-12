import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './database.types';
import { notFound } from 'next/navigation';

const supabase = createClientComponentClient<Database>();

export const getExcerciseById = async (id: string) => {
  const { data, error } = await supabase
    .from('excercises')
    .select('*')
    .eq('id', id);

  if (error) throw new Error('Supabase Error', { cause: error.code });

  if (data.length === 0) {
    return notFound();
  }

  return data[0];
};
