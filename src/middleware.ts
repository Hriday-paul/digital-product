import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get('accessToken')?.value;

    // Redirect unauthenticated users to login
    if (!accessToken) {
        return NextResponse.redirect(
            new URL(`/auth/login?next=${pathname}`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/account/:path*', "/checkout/:path*"],
};