import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: { signIn: '/login' },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id as string;
            }
            return session;
        }
    },
    session: { strategy: "jwt" },
    trustHost: true,
    secret: process.env.NEXTAUTH_SECRET || "baaghentertainment_super_secret_key_2026_xyz",
    providers: [], // Configured in auth.ts (node runtime)
} satisfies NextAuthConfig;
