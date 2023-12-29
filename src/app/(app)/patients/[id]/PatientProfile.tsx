'use client';

import { Database } from '@/lib/supabase/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PatientForm from './PatientForm';
import DiagnosisForm from './DiagnosisForm';

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
      <h1 className='text-2xl'>{patient?.full_name}</h1>
      <h2 className='mt-3'>{patient?.email}</h2>

      {/* <PatientForm /> */}
      <DiagnosisForm />
    </section>
  );
}

export default PatientProfile;
