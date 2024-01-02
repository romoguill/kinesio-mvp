'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/utils/Spinner';
import { Database } from '@/lib/supabase/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type PatientProfile = {
  id: string;
  diagnosis: string;
};

interface PatientFormProps {
  patient: PatientProfile;
}

function PatientForm({ patient }: PatientFormProps) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  let defaultValues;

  const form = useForm<PatientProfile>({
    defaultValues: {
      diagnosis: '',
    },
  });

  const onSubmit: SubmitHandler<PatientProfile> = async (formData) => {
    // if (defaultValues && id) {
    //   const { data, error } = await updateExcercise(id, formData);

    //   if (error) {
    //     return toast.error("Couldn't update the excercise");
    //   }

    //   toast.success('Excercise modified');
    //   router.push(`/admin/wiki/edit?search=${id}`);
    // } else {
    //   const { data, error } = await createExcercise(formData);

    //   if (error) {
    //     return toast.error("Couldn't create the excercise");
    //   }

    //   toast.success('Excercise created');
    //   form.reset();
    // }

    console.log(formData);
  };

  return (
    <Form {...form}>
      <form
        autoComplete='off'
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-2 max-w-2xl'
      >
        <FormField
          control={form.control}
          name='diagnosis'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diagnosis</FormLabel>
              <FormControl>
                <Input placeholder='Diagnosis' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full mx-auto mt-8'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Spinner className='text-primary-foreground h-6 w-6 border-2' />
          ) : defaultValues ? (
            'Edit Excercise'
          ) : (
            'Add Excercise'
          )}
        </Button>
      </form>
    </Form>
  );
}

export default PatientForm;
