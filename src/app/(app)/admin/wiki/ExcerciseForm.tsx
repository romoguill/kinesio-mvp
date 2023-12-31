'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Database } from '@/lib/supabase/database.types';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ExerciseTags } from '@/utils/types';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import Spinner from '@/components/utils/Spinner';
import { nanoid } from 'nanoid';
import { createExcercise, updateExcercise } from '@/lib/supabase/queries';

export type InsertExcerciseSchema = Omit<
  Database['public']['Tables']['excercises']['Insert'],
  'created_at' | 'modified_at' | 'id'
>;

interface ExcerciseFormProps {
  excercise?: InsertExcerciseSchema & { id: string };
}

function ExcerciseForm({ excercise }: ExcerciseFormProps) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  let id: string | undefined = undefined;
  let defaultValues: InsertExcerciseSchema | undefined = undefined;

  if (excercise) {
    const { id: idExcercise, ...rest } = excercise;
    id = idExcercise;
    defaultValues = rest;
  }

  const form = useForm<InsertExcerciseSchema>({
    defaultValues: defaultValues ?? {
      name: '',
      instructions: '',
      thumbnail_url: '',
      video_url: '',
      tags: [],
    },
  });

  const onSubmit: SubmitHandler<InsertExcerciseSchema> = async (formData) => {
    if (defaultValues && id) {
      const { data, error } = await updateExcercise(id, formData);

      if (error) {
        return toast.error("Couldn't update the excercise");
      }

      toast.success('Excercise modified');
      router.push(`/admin/wiki/edit?search=${id}`);
    } else {
      const { data, error } = await createExcercise(formData);

      if (error) {
        return toast.error("Couldn't create the excercise");
      }

      toast.success('Excercise created');
      form.reset();
    }
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='instructions'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea placeholder='Instructions' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='thumbnail_url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail Url</FormLabel>
              <FormControl>
                <Input placeholder='Thumbnail Url' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='video_url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Url</FormLabel>
              <FormControl>
                <Input placeholder='Video Url' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tags
                <span className='font-light text-sm inline-block pl-2'>
                  ({field.value.length} selected)
                </span>
              </FormLabel>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-y-2'>
                {Object.values(ExerciseTags)
                  .sort((a, b) => a.localeCompare(b))
                  .map((tag) => (
                    <FormField
                      key={tag}
                      control={form.control}
                      name='tags'
                      render={({ field }) => (
                        <FormItem key={tag}>
                          <FormControl>
                            <Checkbox
                              hidden
                              checked={field.value?.includes(tag)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, tag])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== tag
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel
                            className={cn(
                              {
                                'bg-orange-700/50': field.value.includes(tag),
                              },
                              'px-2 py-1 text-xs hover:bg-orange-700/80 cursor-pointer rounded-xl w-full'
                            )}
                          >
                            {tag}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
              </div>
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

export default ExcerciseForm;
