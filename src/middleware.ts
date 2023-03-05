import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './types/database.types';
import { DEFAULT_PAGE } from './constants';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    const url = req.nextUrl.clone();

    // redirect to dashboard
    if (url.pathname === '/app') {
      url.pathname = DEFAULT_PAGE;
      return NextResponse.redirect(url);
    }

    return res;
  }

  // user is not authenticated
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/';
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/app/:path*'],
};
