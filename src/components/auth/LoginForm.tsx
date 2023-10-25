'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
    passwordConfirm: z.string(),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "Passwords dont't match",
  });

type FormSchema = z.infer<typeof formSchema>;

function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <input
        {...register('firstName')}
        placeholder='First Name'
        className='px-3 py-2'
      />
      <input {...register('lastName')} placeholder='Last Name' />
      <input type='email' {...register('email')} placeholder='Email' />
      <input type='password' {...register('password')} placeholder='Password' />
      <input
        type='password'
        {...register('passwordConfirm')}
        placeholder='Confirm password'
      />
      <button>Login</button>
    </form>
  );
}

export default SigninForm;
