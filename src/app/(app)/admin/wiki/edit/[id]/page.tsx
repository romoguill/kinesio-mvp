import PageContainer from '@/components/utils/PageContainer';
import { getExcerciseById } from '@/lib/supabase/queries';
import ExcerciseForm from '../../ExcerciseForm';

async function EditByIdPage({ params: { id } }: { params: { id: string } }) {
  const excercise = await getExcerciseById(id);
  const { created_at, modified_at, ...data } = excercise;

  return (
    <PageContainer>
      <ExcerciseForm excercise={excercise} />
    </PageContainer>
  );
}

export default EditByIdPage;
