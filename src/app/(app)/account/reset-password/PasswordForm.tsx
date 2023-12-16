'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

const formSchema = z
  .object({
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "Passwords dont't match",
    path: ['passwordConfirm'],
  });

type FormSchema = z.infer<typeof formSchema>;

function PasswordForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      console.log(error);

      if (!error) {
        toast.success('Password changed', { duration: 3000 });
        router.push('/');
      } else {
        toast.error('There was a problem. Try again later');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-2'
      >
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='Password' {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='passwordConfirm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder='Password' {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='mt-6'>
          Confirm
        </Button>
      </form>
    </Form>
  );
}

export default PasswordForm;
