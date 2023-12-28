import { getUserDetails } from '@/lib/supabase/supabase-server';
import { redirect } from 'next/navigation';
import PatientProfile from './PatientProfile';

async function PatientProfilePage() {
  const user = await getUserDetails();
  console.log(user);

  if (!user) redirect('/auth/login');

  const { role } = user;

  if (role !== 'therapist') redirect('/forbidden');

  return (
    <div>
      <PatientProfile />
    </div>
  );
}

export default PatientProfilePage;
