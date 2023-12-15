'use client';

import useAuth from '@/hooks/useAuth';
import { Button } from '../ui/button';
import { Power } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

function SessionManagement() {
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (!user) return null;

  return (
    <div className='flex flex-col gap-2 bg-neutral-600/10 py-2 px-4 rounded-xl hover:bg-neutral-600/20'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-neutral-400/80 '>User</p>
        <Button
          variant={'ghost'}
          className='bg-red-600/30 p-2 h-fit'
          onClick={logout}
        >
          <Power size={17} />
        </Button>
      </div>
      <h4>{user.email?.substring(0, user.email?.indexOf('@'))}</h4>
    </div>
  );
}

export default SessionManagement;
