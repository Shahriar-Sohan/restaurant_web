import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma"; 
import type { AuthOptions } from "next-auth";
import type { User } from "next-auth";


declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
      };
    }
  }
  

type ExtendedUser = User & {
  role: string;
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined, req: any) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
      
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });
      
        if (!user || !user.pwd) return null;
      
        const isValid = await compare(credentials.password, user.pwd);
        if (!isValid) return null;
      
        return {
          id: String(user.user_id),
          name: user.name,
          email: user.email,
          role: user.role,
          image: null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const extendedUser = user as ExtendedUser;
        token.id = extendedUser.id;
        token.role = extendedUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };