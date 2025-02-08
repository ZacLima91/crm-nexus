import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient, User } from "@prisma/client";
import { compare } from "bcrypt-ts";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { JWT } from "next-auth/jwt";
import { findUserByCredentials } from "./lib/utils";
import { AdapterUser } from "next-auth/adapters";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await findUserByCredentials(
          credentials.username as string,
          credentials.password as string
        );
        if (!user) {
          throw new Error("No user found with the email");
        }

        const isValid = await compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user.id, user: user.userName };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      // ***************************************************************
      // added code
      if (trigger === "update" && session) {
        token = {...token, user : session}
        return token;
      };
       // **************************************************************
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user as AdapterUser;
      return session;
    },
  },
});
