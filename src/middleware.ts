import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  if (!user) {
    console.log('hola');
    const newUrl = new URL('auth/login', req.nextUrl.origin);
    NextResponse.redirect(newUrl);
  }

  return res;
}

export const config = {
  matcher: ['/', '/account'],
};
