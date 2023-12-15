import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageContainer from '@/components/utils/PageContainer';
import SearchInput from '@/components/utils/SearchInput';
import useDebounce from '@/hooks/useDebounce';
import { getSession, getUserDetails } from '@/lib/supabase/supabase-server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';

async function AdminPage() {
  const user = await getUserDetails();

  if (!user) redirect('/auth/login');

  const { role } = user;

  if (role !== 'admin') redirect('/forbidden');

  return (
    <>
      <h2>Excercise Wiki</h2>
      <div className='flex gap-4'>
        <Button asChild>
          <Link href='/admin/wiki/create'>Add new</Link>
        </Button>
        <Button asChild>
          <Link href='/admin/wiki/edit'>Modify/Delete</Link>
        </Button>
      </div>
    </>
  );
}

export default AdminPage;
