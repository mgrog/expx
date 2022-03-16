import Cookies from 'js-cookie';
import {NextApiRequest} from 'next';
import {NextRequest, NextResponse} from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.auth_token;

  if (url.pathname.includes('protected')) {
    try {
      if (!token) throw 'No Token!';
      return NextResponse.next();
    } catch {
      url.pathname = '/users/log_in';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
