'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Database } from '@/lib/supabase/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  FormEvent,
  FormEventHandler,
  SetStateAction,
  useState,
} from 'react';
import toast from 'react-hot-toast';

interface InviteFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function InviteForm({ setOpen }: InviteFormProps) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
      .from('invites')
      .insert({ patient_email: email });

    if (error) {
      toast.error('Error sending invitation. Try again later');
      return;
    }

    toast.success('Invite sent to patient');
    setOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-lg flex flex-col gap-2 mt-5'
    >
      <div className='flex gap-4'>
        <Input
          type='email'
          placeholder='New patient email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button type='submit'>Send Invite</Button>
      </div>
    </form>
  );
}

export default InviteForm;
