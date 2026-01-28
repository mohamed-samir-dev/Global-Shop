import 'next-auth';
import 'next-auth/jwt';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    token?: string;
    role?: string;
    isAdmin?: boolean;
  }

  interface AdapterUser {
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
