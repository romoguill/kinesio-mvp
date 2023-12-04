import { getSession, getUserDetails } from '@/lib/supabase/supabase-server';
import { redirect } from 'next/navigation';

async function AdminPage() {
  const user = await getUserDetails();

  if (!user) redirect('/auth/login');

  const { role } = user;

  if (role !== 'admin') redirect('/forbidden');

  return <div>AdminPage</div>;
}

export default AdminPage;
