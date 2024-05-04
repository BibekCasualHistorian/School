"use server";

import * as z from "zod";

import { loginSchema } from "../schemas";
import { signIn } from "../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import { getSingleUserByEmail } from "../lib/utilsSearch";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "../lib/token";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "../lib/mail";
import { getTwoFactorTokenByEmail } from "../data/two-factor";
import { db } from "../lib/db";
import { getTwoFactorConfirmationByUserId } from "../data/two-factor-confirmation";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid Credentials" };
  }

  const { email, password, code } = validatedFields.data;

  // if user tries to login just after registering and user haven't
  // verified their email yet then, we need to stop or remind them that
  // verification in sent in email
  const existingUser = await getSingleUserByEmail(email);

  // this is for if user doesn't exist and just below it we have
  // for if user exist but isn't verified
  if (!existingUser || !existingUser.password || !existingUser.email) {
    // this is if user have signed through OAUTH
    return { success: false, error: "Email doesn't exist" };
  }

  // to sent confirmation email if user try to login just after registeration
  if (!existingUser.emailVerified) {
    // if user isn't verified or email Verified is time out
    const verificationtoken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationtoken.email,
      verificationtoken.token
    );
    return { success: true, message: "Confirmation Email Sent" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // verify code if we have it
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { success: false, error: "Invalid Code" };
      }
      if (twoFactorToken.token !== code) {
        return { success: false, error: "Invalid Code" };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { success: false, error: "Code Expired!" };
      }
      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }
      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      console.log("here", "in login.ts");
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      console.log("two Factor token: " + twoFactorToken);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      console.log("refactor is sent");
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid Credentials" };
        default:
          return { success: false, error: "Something went wrong" };
      }
    }
    throw error;
  }
};
