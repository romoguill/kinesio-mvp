import { Button } from '@/components/ui/button';
import { getSession, getUserDetails } from '@/lib/supabase/supabase-server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function AdminPage() {
  const user = await getUserDetails();

  if (!user) redirect('/auth/login');

  const { role } = user;

  if (role !== 'admin') redirect('/forbidden');

  return (
    <section>
      <h2>Excercise Wiki</h2>
      <div className='flex gap-4'>
        <Button asChild>
          <Link href='/admin/wiki/create'>Add new</Link>
        </Button>
        <Button>Modify/Delete</Button>
      </div>
    </section>
  );
}

export default AdminPage;
