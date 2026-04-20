import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

export default NextAuth(authConfig).auth((req) => {
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = req.nextUrl.pathname.startsWith('/api/auth');
    const isPublicRoute = ['/', '/about', '/portfolio', '/services', '/blog', '/contact'].includes(req.nextUrl.pathname);
    const isAuthRoute = req.nextUrl.pathname === '/login';

    if (isApiAuthRoute) return null;

    if (isAuthRoute) {
        if (isLoggedIn) return Response.redirect(new URL('/dashboard', req.nextUrl));
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/login', req.nextUrl));
    }

    return null;
});

export const config = {
    matcher: ['/((?!.+\\.\\w+$|_next).*)'],
};
