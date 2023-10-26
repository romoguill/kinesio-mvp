import { AuthContext } from '@/contexts/AuthContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useContext, useEffect } from 'react';

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default useAuth;
