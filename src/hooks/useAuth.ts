import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';

function useAuth() {
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getAuth = async () => {
      const user = await supabase.auth.getUser();
      const session = await supabase.auth.getSession();
    };
  }, []);
}

export default useAuth;
