'use client';

import { Database } from '@/lib/supabase/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session, User, UserResponse } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

interface ExtendedUser extends User {
  details: Database['public']['Tables']['users']['Row'];
}

export const AuthContext = createContext<{
  user: ExtendedUser | null;
  session: Session | null;
}>({ user: null, session: null });

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    console.log('auth rendered');
    const supabase = createClientComponentClient<Database>();

    supabase.auth
      .getSession()
      .then((response) => setSession(response.data.session));

    const getUserDetails = async () => {
      const authUser = await supabase.auth.getUser();
      const additionalData = await supabase.from('users').select('*').single();

      if (authUser.data.user && additionalData.data) {
        setUser({ ...authUser.data.user, details: additionalData.data });
      }
    };

    getUserDetails();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        getUserDetails();
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
}
