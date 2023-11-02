'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SubmitErrorMessage from '../forms/SubmitErrorMessage';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

function LoginForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const response = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (response.error) {
      form.setError('root.authError', { message: response.error.message });
    }

    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-2'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Link
          href={'/auth/password-recovery'}
          className='text-xs text-end text-orange-600'
        >
          Forgot password?
        </Link>

        {form.formState.errors.root?.authError && (
          <SubmitErrorMessage className='mt-1 -mb-4'>
            {form.formState.errors.root?.authError.message}
          </SubmitErrorMessage>
        )}

        <Button type='submit' className='mt-6'>
          Login
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
