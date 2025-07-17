import Brevo from "@getbrevo/brevo";

const transactionalEmailsApi = new Brevo.TransactionalEmailsApi();
transactionalEmailsApi.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

export async function sendVerificationEmail ({ user, url, token }: { user: { email: string, id: string, name: string }; url: string; token: string; }) {
  console.log(`Sending verification email to: Email : ${user.email} Name : ${user.name}`);
  
  const sendSmtpEmail= new Brevo.SendSmtpEmail();
  
  sendSmtpEmail.sender = { name: process.env.EMAIL_FROM_NAME!, email: process.env.EMAIL_FROM! };
  sendSmtpEmail.to = [{ email :user.email, name: user.name }];
  sendSmtpEmail.subject = "Email address verification email";
  sendSmtpEmail.htmlContent = `
    <p>Hello ${user.name || "User"},</p>
    <p>Click on the link below to confirm your email address :</p>
    <a href="${url}">${url}</a>
    <p>This link expires in 24 hours.</p>
    `;
      
  await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
  
  console.log(`Verification email sent`);
}

export async function sendPasswordResetEmail ({ email, token }: { email: string; token: string; }) {
  console.log("Sending password reset email to:", email);
      
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

  console.log("Password reset email sent to:", email);
}