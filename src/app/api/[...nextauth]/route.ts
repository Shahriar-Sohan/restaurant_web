import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials: { email?: string; password?: string } | undefined) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.users.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !(await compare(credentials.password, user.pwd))) {
                    return null;
                }

                return {
                    id: user.user_id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }){
            if(user){
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }){
            session.user.role = token.role;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };