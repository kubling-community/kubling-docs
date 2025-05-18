import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, origin, search } = req.nextUrl;

  // Skip middleware for API routes and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  const lowercasePath = pathname.toLowerCase();

  if (pathname !== lowercasePath) {
    return NextResponse.redirect(new URL(`${origin}${lowercasePath}${search}`));
  }

  return NextResponse.next();
}