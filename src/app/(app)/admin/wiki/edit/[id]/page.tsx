import PageContainer from '@/components/utils/PageContainer';
import ExcerciseForm from '../../ExcerciseForm';
import { createServerSupabaseClient } from '@/lib/supabase/supabase-server';
import toast from 'react-hot-toast';
import { getExcerciseById } from '@/lib/supabase/queries';

async function EditByIdPage({ params: { id } }: { params: { id: string } }) {
  const excercise = await getExcerciseById(id);
  const { id: excerciseId, created_at, modified_at, ...data } = excercise;

  return (
    <PageContainer>
      <ExcerciseForm values={data} />
    </PageContainer>
  );
}

export default EditByIdPage;
