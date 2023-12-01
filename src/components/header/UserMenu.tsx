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

type Props = {};

function UserMenu({}: Props) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { user, session } = useAuth();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.refresh();
    }
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent collisionPadding={10} sideOffset={10}>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
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
