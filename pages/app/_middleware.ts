import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const guestUrls = ['/app/login'];

export function middleware(req: NextRequest) {
  const jwtToken = req.cookies['jwt-token'];

  if (!jwtToken && !guestUrls.includes(req.url)) {
    return NextResponse.redirect('/app/login');
  }

  if (jwtToken) {
    try {
      jwt.verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
      if (guestUrls.includes(req.url)) {
        return NextResponse.redirect('/app');
      }
    } catch (error: any) {
      console.log(error.message);
      return NextResponse.redirect('/app/login');
    }
  }

  return NextResponse.next();
}
