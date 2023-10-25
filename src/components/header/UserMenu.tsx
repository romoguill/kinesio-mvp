'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import UserAvatar from './UserAvatar';
import { useRouter } from 'next/navigation';

type Props = {};

function UserMenu({}: Props) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.replace('/auth/login');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
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
