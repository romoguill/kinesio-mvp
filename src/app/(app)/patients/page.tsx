import { getUserDetails } from '@/lib/supabase/supabase-server';
import { redirect } from 'next/navigation';
import InviteModal from './InviteModal';

async function PatientPage() {
  const user = await getUserDetails();

  if (!user) redirect('/auth/login');

  const { role } = user;

  if (role !== 'therapist') redirect('/forbidden');

  return (
    <>
      <div className='flex justify-end'>
        <InviteModal />
      </div>
    </>
  );
}

export default PatientPage;
