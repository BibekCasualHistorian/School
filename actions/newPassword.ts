"use server";

import * as z from "zod";

import bcrypt from "bcryptjs";

import { NewPasswordSchema, ResetSchema } from "../schemas";
import { getSingleUserByEmail } from "../lib/utilsSearch";
import { db } from "../lib/db";
import { getPasswordResetTokenByToken } from "../data/password-reset-token";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing Token" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: "Invalid Token" };
  }
  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { success: false, error: "Invalid Token" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { success: false, error: "Expired Token" };
  }

  const existingUser = await getSingleUserByEmail(existingToken.email);
  if (!existingUser) {
    return { success: false, error: "Email doesn't exist" };
  }

  const hash = await bcrypt.hash(password, 10);
  const updatedUser = await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hash,
    },
  });
  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  return { success: true, message: "Your password has been updated" };
};
