import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/app/generated/prisma";
import { nextCookies } from "better-auth/next-js";
import Brevo from "@getbrevo/brevo";

const prisma = new PrismaClient();
const transactionalEmailsApi = new Brevo.TransactionalEmailsApi();
transactionalEmailsApi.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

// Tableau des Social Providers
const socialProvidersConfig = [
  {
    name: "github",
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  },
  {
    name: "google",
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  },
  {
    name: "discord",
    clientId: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  },
];

const socialProviders = socialProvidersConfig.reduce(
  (acc, provider) => ({
    ...acc,
    [provider.name]: {
      clientId: provider.clientId,
      clientSecret: provider.clientSecret,
    },
  }),
  {} as Record<string, { clientId: string; clientSecret: string }>
);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    emailVerification: {
      enabled: true,
    },
    // Envoyer l'email de réinitialisation de mot de passe
    async sendResetPassword(data) {
      const sendSmtpEmail = new Brevo.SendSmtpEmail();
      sendSmtpEmail.sender = { name: "Ton SaaS", email: "no-reply@ton-domaine.com" }; // Modifier pour email de ton SaaS
      sendSmtpEmail.to = [{ email: data.user.email }];
      sendSmtpEmail.subject = "Réinitialisation de mot de passe";
      sendSmtpEmail.htmlContent = `<p>Cliquez <a href="${data.url}">ici</a> pour réinitialiser votre mot de passe. Valide 24h.</p>`;

      await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    },
    // Envoyer l'email de vérification
    async sendVerificationEmail(data) {
      const sendSmtpEmail = new Brevo.SendSmtpEmail();
      sendSmtpEmail.sender = { name: "Ton SaaS", email: "no-reply@ton-domaine.com" }; // Modifier pour email de ton SaaS
      sendSmtpEmail.to = [{ email: data.email }];
      sendSmtpEmail.subject = "Vérification de votre adresse email";
      sendSmtpEmail.htmlContent = `<p>Merci de vous être inscrit ! Cliquez <a href="${data.url}">ici</a> pour vérifier votre adresse email. Ce lien est valide pendant 24h.</p>`;

      await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    },
  },
  socialProviders,
  plugins: [nextCookies()],
});