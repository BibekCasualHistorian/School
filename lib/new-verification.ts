"use server";

import { getVerificationTokenByToken } from "../data/verification-token";
import { db } from "./db";
import { getSingleUserByEmail } from "./utilsSearch";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return {
      success: false,
      error: "Token doesn't exist",
    };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return {
      success: false,
      error: "Token has expired",
    };
  }
  const existingUser = await getSingleUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      success: false,
      error: "User doesn't exist",
    };
  }
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      // this is for changing the email
      email: existingToken.email,
    },
  });

  await db.verificationtoken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: true, message: "Email Verified" };
};
