import { Resend } from "resend";

const path = process.env.NEXT_PUBLIC_URL;
console.log("path", path);

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${path}/auth/new-password?token=` + token;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please confirm your email",
    html: `<p><a href="${resetLink}">Click here to reset your password</a></p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${path}/auth/new-verification?token=` + token;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please confirm your email",
    html: `<p><a href="${confirmLink}">Click here to confirm your email</a></p>`,
  });
};
