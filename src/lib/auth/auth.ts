import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/app/generated/prisma";
import { nextCookies } from "better-auth/next-js";
// import Brevo from "@getbrevo/brevo";
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/services/email/email_auth";

// const socialProviders = {
//   github: github({ clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! }),
//     // onSuccess: async ({ user, account, context }: { user: any, account: any, context: any}) => {
//     //   await prisma.repoAccount.create({
//     //     data: {
//     //       accountId: account.id,
//     //       providerId: "github",
//     //       userId: user.id,
//     //       accessToken: account.accessToken || null,
//     //       refreshToken: account.refreshToken || null,
//     //       accessTokenExpiresAt: account.accessTokenExpiresAt || null,
//     //       refreshTokenExpiresAt: account.refreshTokenExpiresAt || null,
//     //       scope: account.scope || null,
//     //     },
//     //   });
//     // },
//   google: google({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
//   discord: discord({ clientId: process.env.DISCORD_CLIENT_ID!, clientSecret: process.env.DISCORD_CLIENT_SECRET! }),
// };

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, { 
    provider: "postgresql" 
  }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
    sendVerificationEmail,
    sendPasswordResetEmail,
    emailVerification: {
      sendOnsignUp: true,
    },
    passwordRules: {
      minLength: 5, // Change to more after tests
      requireLowercase: true,
      requireUppercase: true,
      requireNumbers: true,
      //requireSpecialCharacters: true, // Uncomment after tests
    },
    errorMessages: {
      invalidCredentials: "Incorrect email and/or password.",
      emailAlreadyInUse: "This email is already registered.",
      passwordTooWeak: "Password is too weak. It must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
    }
  },
  socialProviders : {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      onSuccess: async ({ user, account }) => {
        console.log("GitHub provider triggered", { user, account });
      }
      // ...add other options if needed
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
    refreshToken: true,
    refreshTokenExpiresIn: 30 * 24 * 60 * 60, // 30 days
  },
  plugins: [nextCookies()],
});