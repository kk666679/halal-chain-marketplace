import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // In a real application, you would validate against your database
          // This is a mock implementation for demonstration purposes
          if (credentials.email === 'demo@halal-chain.com' && credentials.password === 'password123') {
            return {
              id: '1',
              name: 'Demo User',
              email: 'demo@halal-chain.com',
              role: 'vendor'
            };
          }
          
          // Admin user for demonstration
          if (credentials.email === 'admin@halal-chain.com' && credentials.password === 'admin123') {
            return {
              id: '2',
              name: 'Admin User',
              email: 'admin@halal-chain.com',
              role: 'admin'
            };
          }
          
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user role to the token if available
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to the session
      if (token) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-fallback-secret-should-be-in-env',
});

export { handler as GET, handler as POST };