import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'hello@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          // This is where you would validate the user credentials
          // For now, we'll use a simple check
          if (credentials.email === 'admin@halal-chain.com' && credentials.password === 'password') {
            return {
              id: '1',
              name: 'Admin User',
              email: 'admin@halal-chain.com',
              role: 'admin',
            };
          }
          
          // In a real application, you would make an API call to your backend
          // const res = await fetch('/api/login', {
          //   method: 'POST',
          //   body: JSON.stringify(credentials),
          //   headers: { 'Content-Type': 'application/json' }
          // });
          // const user = await res.json();
          
          // If no error and we have user data, return it
          // if (res.ok && user) {
          //   return user;
          // }
          
          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login', // Error code passed in query string as ?error=
    verifyRequest: '/login', // (used for check email message)
    newUser: '/register' // New users will be directed here on first sign in
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role to the token right after a signin
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
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
});

export { handler as GET, handler as POST };