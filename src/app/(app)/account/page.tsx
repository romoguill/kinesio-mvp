import {
  createServerSupabaseClient,
  getSession,
  getUserDetails,
} from '@/lib/supabase/supabase-server';
import PendingInvitation from './PendingInvitation';
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/supabase/database.types';

const supabase = createServerSupabaseClient();
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

const getPendingInvitations = async (email: string) => {
  const { data, error } = await supabase
    .from('invites')
    .select('*')
    .eq('patient_email', email);

  if (error) {
    return {
      error: `Supabase Error: ${error.code}`,
      data: [],
    };
  }

  return {
    error: null,
    data,
  };
};

const getTherapistDetail = async (id: string) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('full_name')
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
    return {
      error: `Supabase Error: ${error.code}`,
      data: [],
    };
  }

  console.log(data);

  return {
    error: null,
    data,
  };
};

export type PendingDetails = {
  invitationId: string;
  therapistId: string;
  therapistName: string | null;
};

async function AccountPage() {
  const user = await getUserDetails();
  const session = await getSession();

  if (!user || !session?.user.email) redirect('/auth/login');

  const { data: pending, error: errorPending } = await getPendingInvitations(
    session?.user.email
  );

  if (!pending) return [];

  let pendingDetails: PendingDetails[];

  try {
    pendingDetails = await Promise.all(
      pending.map(async (invitation) => {
        console.log(invitation.id);
        const therapistName = await getTherapistDetail(invitation.therapist);

        if (therapistName.error !== null)
          throw new Error("Couldn't get therapist data");

        return {
          invitationId: invitation.id,
          therapistId: invitation.therapist,
          therapistName: therapistName.data?.full_name,
        };
      })
    );
  } catch (error) {
    console.log(error);
    return;
  }

  if (!pendingDetails) return;

  return (
    <div>
      <p className='text-2xl'>{user?.full_name}</p>
      {pending.length > 0 &&
        pending.map((invitation) => (
          <PendingInvitation
            key={invitation.id}
            pendingDetails={pendingDetails}
          />
        ))}
    </div>
  );
}

export default AccountPage;
