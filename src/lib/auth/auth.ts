import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/app/generated/prisma";
import { nextCookies } from "better-auth/next-js";
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/services/email/email_auth";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, { 
    provider: "postgresql" 
  }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  callbacks: {
    async onSignIn({ user, db }) {
      console.log("onSignIn triggered for user:", {
        id: user.id,
        email: user.email,
        name: user.name,
      });
      return true;
    },
    async onSignUp({ user, db }) {
    console.log("onSignUp triggered for user:", {
      id: user.id,
      email: user.email,
      name: user.name,
    });
    return true;
    },
  },
  emailAndPassword: {
    enabled: true,
    emailVerification: {
      enabled: true,
      sendVerificationEmail: sendVerificationEmail,
      sendOnsignUp: true,
      sendResetPassword: sendPasswordResetEmail,
      sendOnUpdate: true,
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
    refreshToken: true,
    refreshTokenExpiresIn: 30 * 24 * 60 * 60, // 30 days
  },
  plugins: [nextCookies()],
});