import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/server/db/prisma";
import { nextCookies } from "better-auth/next-js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../services/email/email_auth";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { 
    provider: "postgresql",
    //debugLogs: true
  }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignup: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ( { user, url, token }) => {
      await sendVerificationEmail({
        user: { email: user.email, id: user.id, name: user.name },
        url,
        token
      });
    },
  },
  socialProviders : {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    gitlab: {
      clientId: process.env.GITLAB_CLIENT_ID as string,
      clientSecret: process.env.GITLAB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }
  },
  session: {
    expiresIn: 14 * 24 * 60 * 60, // 14 days
  },
  plugins: [
    nextCookies(), // Must be Last Item
  ],
});