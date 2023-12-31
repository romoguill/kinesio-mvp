import { cache } from 'react';
import { Database } from './database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const session = await getSession();

    if (!session) throw new Error('No session found');

    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();
    return userDetails;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
}
