'use client';

import AdminExcerciseCard from '@/components/cards/AdminExcerciseCard';
import { Label } from '@/components/ui/label';
import PageContainer from '@/components/utils/PageContainer';
import SearchInput from '@/components/utils/SearchInput';
import useDebounce from '@/hooks/useDebounce';
import { Database } from '@/lib/supabase/database.types';
import { deleteExcercise } from '@/lib/supabase/queries';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function EditPage() {
  const [searchedValue, setSearchedValue] = useState('');
  const [excercises, setExcercises] = useState<
    Database['public']['Tables']['excercises']['Row'][] | null
  >(null);
  const debouncedSearchValue = useDebounce(searchedValue);
  const supabase = createClientComponentClient<Database>();
  const searchParams = useSearchParams();

  const search = searchParams.get('search');

  useEffect(() => {
    if (search) {
      setSearchedValue(search);
    }
  }, [search]);

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

  const handleDelete = async (id: string) => {
    const { error } = await deleteExcercise(id);

    if (error) {
      toast.error("Couldn't delete excercise. Try again later");
      return;
    }

    toast.success('Excercise deleted');

    const a = excercises?.filter((excercise) => excercise.id !== id);
    setExcercises(
      (prevState) =>
        prevState?.filter((excercise) => excercise.id !== id) ?? null
    );
  };

  return (
    <>
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
          <AdminExcerciseCard
            key={excercise.id}
            {...excercise}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}

export default EditPage;
