'use client';

import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Avatar } from '../ui/avatar';
import { BsFillPersonFill } from 'react-icons/bs';
import useAuth from '@/hooks/useAuth';

function UserAvatar() {
  const { user } = useAuth();

  return (
    <div>
      <Avatar className='bg-slate-200 flex items-center justify-center h-12 w-12'>
        <AvatarImage src={user?.user_metadata?.avatar_url} />
        <AvatarFallback>
          <BsFillPersonFill className='h-8 w-8' />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export default UserAvatar;
