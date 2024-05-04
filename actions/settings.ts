"use server";

import * as z from "zod";
import { SettingsSchema } from "../schemas";
import { currentUser } from "../lib/auth";
import { getSingleUserByEmail, getSingleUserById } from "../lib/utilsSearch";
import { db } from "../lib/db";
import { generateVerificationToken } from "../lib/token";
import { sendVerificationEmail } from "../lib/mail";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  // const validatedFields = SettingsSchema.safeParse(values);
  // const
  const user = await currentUser();
  console.log("users in settings", user);
  if (!user?.id) {
    return { error: "unauthorized" };
  }

  const dbUser = await getSingleUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOauthEnabled) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getSingleUserByEmail(values.email as string);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }

    const verificationToken = await generateVerificationToken(
      values.email as string
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password as string,
      dbUser.password
    );
    if (!passwordMatch) {
      return { success: false, message: "Incorrect Password" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword as string, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  // await db.user.update({
  //   where: { id: dbUser.id },
  //   data: {
  //     ...values,
  //   },
  // });

  return { success: true, message: "Settings Updated" };
};
