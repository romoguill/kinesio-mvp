import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  createServerSupabaseClient,
  getUserDetails,
} from '@/lib/supabase/supabase-server';
import PendingInvitation from './PendingInvitation';

async function Account() {
  const supabase = createServerSupabaseClient();
  const user = await getUserDetails();

  return (
    <div>
      <p className='text-2xl'>{user?.full_name}</p>
      <PendingInvitation />
    </div>
  );
}

export default Account;
