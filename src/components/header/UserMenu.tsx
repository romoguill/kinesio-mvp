'use client';

import useAuth from '@/hooks/useAuth';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import UserAvatar from './UserAvatar';
import { useEffect, useState } from 'react';
import { Database } from '@/lib/supabase/database.types';

type Props = {};

function UserMenu({}: Props) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const { user, session } = useAuth();
  const [role, setRole] = useState<Database['public']['Enums']['role'] | null>(
    null
  );

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.refresh();
    }
  };

  useEffect(() => {
    const getRole = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id);

      data && setRole(data[0].role);
    };

    getRole();
  }, [supabase, user]);

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        collisionPadding={10}
        sideOffset={10}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>Account {`(${role})`}</DropdownMenuLabel>
        <DropdownMenuItem>{user.email}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='text-red-500 hover:text-red-500 font-semibold hover:bg-red-50 cursor-pointer'
          onClick={signOut}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
