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
import { useEffect, useState } from 'react';

type Patients = Database['public']['Functions']['get_patients']['Returns'];

function PatientList() {
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState<Patients | null>(null);
  const debouncedSearch = useDebounce(search);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    supabase.rpc('get_patients').then((res) => setPatients(res.data));
  }, [supabase]);

  return (
    <section>
      <SearchInput
        value={search}
        setValue={setSearch}
        className='mt-6'
        placeholder='Name / Email'
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
              <TableRow key={patient.id}>
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
