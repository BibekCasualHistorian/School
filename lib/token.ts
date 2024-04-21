import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getVerificationByEmail } from "../data/verification-token";
import { getPasswordResetTokenByEmail } from "../data/password-reset-token";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "../data/two-factor";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  // expires at 1 hour
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const twoFactorToken = await db.twoFactorToken.create({
    data: { email, token, expires },
  });
  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();

  // expires in one hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  // generate token
  const token = uuidv4();

  // expires in one hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  // if existing token already sent, then we need to delete it and
  // generate new one
  const existingToken = await getVerificationByEmail(email);
  console.log("existingToken in token.js", existingToken);
  if (existingToken) {
    await db.verificationtoken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // generate new verification token for authentication
  const newVerificationToken = await db.verificationtoken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return newVerificationToken;
};
