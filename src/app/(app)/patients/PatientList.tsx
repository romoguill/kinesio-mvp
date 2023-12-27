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
import { getPatients } from '@/lib/supabase/queries';
import { useEffect, useState } from 'react';

function PatientList() {
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState(null);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    getPatients().then((res) => setPatients(res.data));
  }, []);

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
            <TableHead className='w-[100px]'>Name</TableHead>
            <TableHead>Diagnosis</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients &&
            patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className='font-medium'>{patient.patient}</TableCell>
                <TableCell>ACL tear and weak patella tracking</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default PatientList;
