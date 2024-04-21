"use server";
import * as z from "zod";

import { ResetSchema } from "../schemas";
import { getSingleUserByEmail } from "../lib/utilsSearch";
import { db } from "../lib/db";
import { sendPasswordResetEmail } from "../lib/mail";
import { generatePasswordResetToken } from "../lib/token";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: "Invalid Email" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getSingleUserByEmail(email);
  if (!existingUser) {
    return { success: false, error: "Email not found" };
  }

  // generate token and send it to user
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: true, message: "Rest Email sent" };
};
