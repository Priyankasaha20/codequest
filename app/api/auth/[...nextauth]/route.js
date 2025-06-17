import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  // Use your NEXTAUTH_SECRET from .env.local
  secret: process.env.NEXTAUTH_SECRET ?? "development-secret-key",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "login"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is a demo - in production, verify against your database
        if (credentials?.email && credentials?.password) {
          return {
            id: "1",
            name: "Demo User",
            email: credentials.email,
            image: null,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // You can extend the session object here if you want
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
