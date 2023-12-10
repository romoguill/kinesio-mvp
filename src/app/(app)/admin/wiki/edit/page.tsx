'use client';

import AdminExcerciseCard from '@/components/cards/AdminExcerciseCard';
import { Label } from '@/components/ui/label';
import SearchInput from '@/components/utils/SearchInput';
import useDebounce from '@/hooks/useDebounce';
import { Database } from '@/lib/supabase/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

function EditPage() {
  const [searchedValue, setSearchedValue] = useState('');
  const [excercises, setExcercises] = useState<
    Database['public']['Tables']['excercises']['Row'][] | null
  >(null);
  const debouncedSearchValue = useDebounce(searchedValue);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getExcercises = async () => {
      // SEARCH EXCERCISES QUERY STORED IN SUPABASE

      // BEGIN
      // RETURN QUERY
      // SELECT *
      // FROM public.excercises as e
      // WHERE
      //     EXISTS (
      //         SELECT 1
      //         FROM unnest(e.tags) AS tag
      //         WHERE tag ILIKE '%' || search || '%'
      //     )
      //     OR e.name ILIKE '%' || search || '%'
      //     OR e.id::text ILIKE '%' || search || '%';
      // END;

      const { data } = await supabase.rpc('search_excercises', {
        search: debouncedSearchValue,
      });
      setExcercises(data);
    };

    if (!debouncedSearchValue) {
      return setExcercises([]);
    }

    getExcercises();
  }, [supabase, debouncedSearchValue]);

  return (
    <section className='px-6 w-full max-w-5xl'>
      <Label className='text-muted-foreground'>
        Search excercise by id/tag/name
      </Label>
      <SearchInput
        value={searchedValue}
        setValue={setSearchedValue}
        className='mt-2'
      />

      <div className='flex flex-col gap-6 mt-10'>
        {excercises?.map((excercise) => (
          <AdminExcerciseCard key={excercise.id} {...excercise} />
        ))}
      </div>
    </section>
  );
}

export default EditPage;
