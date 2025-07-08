import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/server/db/prisma";
import { nextCookies } from "better-auth/next-js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../email/email_auth";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { 
    provider: "postgresql" 
  }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendVerificationEmail: sendVerificationEmail,
    //sendResetPassword: sendPasswordResetEmail,
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
    nextCookies(),
  ],
});