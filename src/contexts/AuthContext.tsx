'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session, User, UserResponse } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{
  user: User | null;
  session: Session | null;
}>({ user: null, session: null });

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then((response) => setSession(response.data.session));
    supabase.auth.getUser().then((response) => setUser(response.data.user));

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        supabase.auth.getUser().then((response) => setUser(response.data.user));
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
}