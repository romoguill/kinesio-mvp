'use client';

import SearchInput from '@/components/utils/SearchInput';
import ExcerciseForm from '../ExcerciseForm';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { Label } from '@/components/ui/label';

function EditPage() {
  const [searchedValue, setSearchedValue] = useState('');
  const debouncedSearchValue = useDebounce(searchedValue);

  return (
    <section className='px-6 w-full max-w-5xl'>
      <Label className='text-muted-foreground'>
        Search excercise by name/tag
      </Label>
      <SearchInput
        value={searchedValue}
        setValue={setSearchedValue}
        className='mt-2'
      />
    </section>
  );
}

export default EditPage;
