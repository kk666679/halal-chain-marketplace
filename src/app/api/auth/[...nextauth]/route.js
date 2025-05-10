import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

// Add default environment variables if they don't exist
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'a-very-secure-secret-for-halal-chain-marketplace';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GITHUB_ID = process.env.GITHUB_ID || '';
const GITHUB_SECRET = process.env.GITHUB_SECRET || '';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          // For development/testing, allow a mock user
          if (process.env.NODE_ENV === 'development' && 
              credentials?.email === 'test@example.com' && 
              credentials?.password === 'password') {
            return {
              id: '1',
              name: 'Test User',
              email: 'test@example.com',
              role: 'customer',
              company: 'Test Company',
              image: 'https://via.placeholder.com/150',
              token: 'mock-jwt-token',
            };
          }

          const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          if (res.ok && data.success) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              company: data.user.company,
              image: data.user.profileImage,
              token: data.token,
            };
          }
          
          throw new Error(data.message || 'Invalid credentials');
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error(error.message || 'Authentication failed');
        }
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
    newUser: '/register',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.company = user.company;
        
        // If using credentials provider, store the JWT token
        if (account?.provider === 'credentials') {
          token.accessToken = user.token;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.company = token.company;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // For OAuth providers, we need to create or update the user in our database
      if (account && (account.provider === 'google' || account.provider === 'github')) {
        try {
          // For development/testing, allow OAuth without backend
          if (process.env.NODE_ENV === 'development') {
            user.id = user.id || profile.sub || profile.id;
            user.role = 'customer';
            user.company = 'OAuth User';
            return true;
          }

          const res = await fetch(`${API_URL}/api/auth/oauth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account.provider,
              providerId: account.providerAccountId,
            }),
          });

          const data = await res.json();
          
          if (res.ok && data.success) {
            user.id = data.user.id;
            user.role = data.user.role;
            user.company = data.user.company;
            return true;
          }
          
          return false;
        } catch (error) {
          console.error('OAuth sign-in error:', error);
          return false;
        }
      }
      
      return true;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };