import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session, User, UserResponse } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext<{
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
    const getAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(user);
      setSession(session);
    };
  }, [supabase.auth]);

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
}
