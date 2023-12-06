'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
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

type InsertExcerciseSchema =
  Database['public']['Tables']['excercises']['Insert'];

function ExcerciseForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const form = useForm<InsertExcerciseSchema>({
    defaultValues: {
      name: '',
      instructions: '',
      thumbnail_url: '',
      video_url: '',
      tags: [],
      created_at: '',
      modified_at: '',
    },
  });

  const onSubmit: SubmitHandler<InsertExcerciseSchema> = async (data) => {};

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
                <Input
                  placeholder='Name'
                  {...field}
                  className='bg-neutral-500/40'
                />
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
                <Textarea
                  placeholder='Instructions'
                  {...field}
                  className='bg-neutral-500/40'
                />
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
                <Input
                  placeholder='Thumbnail Url'
                  {...field}
                  className='bg-neutral-500/40'
                />
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
                <Input
                  placeholder='Video Url'
                  {...field}
                  className='bg-neutral-500/40'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tags'
          render={() => (
            <FormItem>
              <FormLabel>
                Tags
                <span className='font-light text-sm inline-block pl-2'>
                  (0 selected)
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
                              'px-2 py-1 text-sm hover:bg-orange-700/80 cursor-pointer rounded-xl w-full'
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

        <Button type='submit'>Add Excercise</Button>
      </form>
    </Form>
  );
}

export default ExcerciseForm;
