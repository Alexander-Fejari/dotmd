import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/utils/prisma";
import { nextCookies } from "better-auth/next-js";
import Brevo from "@getbrevo/brevo";

const transactionalEmailsApi = new Brevo.TransactionalEmailsApi();
transactionalEmailsApi.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

const socialProviders = {
  github: { 
    clientId: process.env.GITHUB_CLIENT_ID!, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    onSuccess: async ({ user, account, context }) => {
      await prisma.repoAccount.create({
        data: {
          accountId: account.id,
          providerId: "github",
          userId: user.id,
          accessToken: account.accessToken || null,
          refreshToken: account.refreshToken || null,
          accessTokenExpiresAt: account.accessTokenExpiresAt || null,
          refreshTokenExpiresAt: account.refreshTokenExpiresAt || null,
          scope: account.scope || null,
        },
      });
    }},
  google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! },
  discord: { clientId: process.env.DISCORD_CLIENT_ID!, clientSecret: process.env.DISCORD_CLIENT_SECRET! },
};

export const auth = betterAuth({
  database: prismaAdapter(prisma, { 
    provider: "postgresql" 
  }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
    sendVerificationEmail: async ({ email, token, user }) => {
      console.log("Sending verification email to:", email);
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/verify-email?token=${token}`;
      const sendSmtpEmail= new Brevo.SendSmtpEmail();
      sendSmtpEmail.sender = { name: process.env.EMAIL_FROM_NAME!, email: process.env.EMAIL_FROM! };
      sendSmtpEmail.to = [{ email }];
      sendSmtpEmail.subject = "email address verification";
      sendSmtpEmail.htmlContent = `
        <p>Hello ${user.name || "User"},</p>
        <p>Click on the link below to confirm your email address :</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>This link expires in 24 hours.</p>
      `;
      
      await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
      console.log("Verification email sent to:", email);
    },

    sendPasswordResetEmail: async ({ email, token }) => {
      const resetUrl = `${process.env.BETTER_AUTH_URL}/reset-password?token=${token}`;
      const sendSmtpEmail = new Brevo.SendSmtpEmail();
      sendSmtpEmail.sender = { name: process.env.EMAIL_FROM_NAME!, email: process.env.EMAIL_FROM! };
      sendSmtpEmail.to = [{ email }];
      sendSmtpEmail.subject = "Password Reset Request";
      sendSmtpEmail.htmlContent = `
        <p>Hello,</p>
        <p>Click on the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 1 hour.</p>
      `;

      await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    },
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
  socialProviders,
  session: {
    expiresIn: 14 * 24 * 60 * 60, // 14 days
    refreshToken: true,
    refreshTokenExpiresIn: 30 * 24 * 60 * 60, // 30 days
  },
  plugins: [nextCookies()],
});