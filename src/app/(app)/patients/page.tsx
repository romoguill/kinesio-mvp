import { getUserDetails } from '@/lib/supabase/supabase-server';
import { redirect } from 'next/navigation';
import InviteModal from './InviteModal';
import PatientList from './PatientList';

async function PatientPage() {
  const user = await getUserDetails();

  if (!user) redirect('/auth/login');

  const { role } = user;

  if (role !== 'therapist') redirect('/forbidden');

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl'>Patients</h1>
          <InviteModal />
        </div>
        <PatientList />
      </div>
    </>
  );
}

export default PatientPage;
