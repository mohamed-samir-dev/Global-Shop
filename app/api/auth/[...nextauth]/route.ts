import NextAuth, { DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';

declare module 'next-auth' {
  interface User {
    token?: string;
    role?: string;
    isAdmin?: boolean;
  }
  interface Session {
    user: {
      token?: string;
      role?: string;
      isAdmin?: boolean;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    role?: string;
    isAdmin?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend-for-global-shop-production.up.railway.app/api';
          console.log('Attempting backend auth:', `${apiUrl}/auth/google`);
          
          const response = await fetch(`${apiUrl}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              googleId: account.providerAccountId,
              picture: user.image,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            user.token = data.token;
            user.role = data.role;
            user.isAdmin = data.isAdmin || data.role === 'admin';
            console.log('Backend auth successful');
            return true;
          }
          
          const errorData = await response.text();
          console.error('Backend auth failed:', response.status, errorData);
          return true; // Allow sign-in even if backend fails
        } catch (error) {
          console.error('Google sign-in error:', error);
          return true; // Allow sign-in even if backend fails
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.token = token.accessToken;
        session.user.role = token.role;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
