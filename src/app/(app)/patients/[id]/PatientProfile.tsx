'use client';

import { Database } from '@/lib/supabase/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function PatientProfile() {
  const router = useRouter();
  const params = useParams();
  const supabase = createClientComponentClient<Database>();
  const [patient, setPatient] = useState<
    Database['public']['Functions']['get_patients']['Returns'][number] | null
  >(null);

  const { id: patientId } = params as { id: string };

  useEffect(() => {
    supabase
      .rpc('get_patients', { patientid: patientId })
      .then((res) => setPatient(res.data?.[0] ?? null));
  }, [supabase, patientId]);

  return (
    <section>
      <h1>{patient?.full_name}</h1>
      <h2>{patient?.email}</h2>

      {/* <PatientForm /> */}
    </section>
  );
}

export default PatientProfile;
