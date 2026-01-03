                         
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import  prisma  from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import bcrypt from "bcryptjs";

const providers: Provider[] = [
  Credentials({
    credentials: {
      username: { label: "Username", type: "text", placeholder: "Enter your username" },
      password: { label: "Password", type: "password", placeholder: "Enter your password" }
    },
    async authorize(c) {
      if (!c?.username || !c?.password) {
        return null;
      }

      try {
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: c.username as string },
              { name: c.username as string },
            ],
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          c.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(), // Convert numeric ID to string for NextAuth
          email: user.email,
          name: user.name,
          image: user.image,
        };
      } catch (error) {
        console.error("Auth error:", error);
        return null;
      }
    },
  }),
  Google({
    allowDangerousEmailAccountLinking: true,
  }),
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/sign-in",
  },
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  }
});