'use client';

import SearchInput from '@/components/utils/SearchInput';
import { useState } from 'react';

function PatientList() {
  const [search, setSearch] = useState('');

  return (
    <section>
      <SearchInput
        value={search}
        setValue={setSearch}
        className='mt-6'
        placeholder='Name / Email'
      />
    </section>
  );
}

export default PatientList;
