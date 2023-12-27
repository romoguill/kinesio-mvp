'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SearchInput from '@/components/utils/SearchInput';
import useDebounce from '@/hooks/useDebounce';
import { Database } from '@/lib/supabase/database.types';
import { getPatients } from '@/lib/supabase/queries';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@supabase/auth-ui-shared';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Patients = Database['public']['Functions']['get_patients']['Returns'];

function PatientList() {
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState<Patients | null>(null);
  const debouncedSearch = useDebounce(search);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    // get patients query in supabase
    // CREATE OR REPLACE FUNCTION get_patients(name text)
    // RETURNS TABLE (
    //   id uuid,
    //   full_name text,
    //   email text
    // )
    // LANGUAGE plpgsql AS
    // $$
    // BEGIN
    //   IF name IS NULL THEN
    //     RETURN QUERY
    //     SELECT p.id, u.full_name, u.email
    //     FROM public.patients AS p
    //     JOIN public.users AS u ON p.patient = u.id
    //     WHERE auth.uid() = p.therapist;
    //   ELSE
    //     RETURN QUERY
    //     SELECT p.id, u.full_name, u.email
    //     FROM public.patients AS p
    //     JOIN public.users AS u ON p.patient = u.id
    //     WHERE auth.uid() = p.therapist AND full_name LIKE '%' || name || '%';
    //   END IF;

    // END;
    // $$;

    console.log(debouncedSearch);

    if (debouncedSearch.length === 0) {
      supabase.rpc('get_patients').then((res) => setPatients(res.data));
    } else {
      supabase
        .rpc('get_patients', { name: debouncedSearch })
        .then((res) => setPatients(res.data));
    }
  }, [supabase, debouncedSearch]);

  return (
    <section>
      <SearchInput
        value={search}
        setValue={setSearch}
        className='mt-6'
        placeholder='Name'
      />
      <Table className='mt-4'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients &&
            patients.map((patient) => (
              <TableRow
                key={patient.id}
                className='cursor-pointer'
                onClick={(e) => router.push(`/patients/${patient.id}`)}
              >
                <TableCell className='font-medium'>
                  {patient.full_name}
                </TableCell>
                <TableCell>{patient.email}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default PatientList;
