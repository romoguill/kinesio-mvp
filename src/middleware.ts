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

  console.log(req.nextUrl);

  if (!user && !req.nextUrl.pathname.startsWith('/auth')) {
    const newUrl = new URL('auth/login', req.nextUrl.origin);
    console.log(newUrl.href);
    return NextResponse.redirect(newUrl);
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
