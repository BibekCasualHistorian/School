"use server";

import * as z from "zod";

import bcrypt from "bcryptjs";

import { RegisterSchema } from "../schemas";
import { db } from "../lib/db";
import {
  checkWhetherStudentIsAddedInDatabaseByAdmin,
  checkWhetherTeacherIsAddedInDatabaseByAdmin,
  getSingleUserByEmail,
} from "../lib/utilsSearch";
import { generateVerificationToken } from "../lib/token";
import { sendVerificationEmail } from "../lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid Credentials" };
  }

  const { email, password, name } = validatedFields.data;
  console.log(email, password, name);
  // const isAddedByAdmin =
  //   (await !checkWhetherStudentIsAddedInDatabaseByAdmin(email)) ||
  //   (await !checkWhetherTeacherIsAddedInDatabaseByAdmin(email));
  // console.log("isAddedByAdmin", isAddedByAdmin);
  // if (!isAddedByAdmin) {
  //   return { success: false, error: "Sorry, You need to contact to Admin" };
  // }

  const hash = await bcrypt.hash(password, 10);

  const alreadyExists = await getSingleUserByEmail(email);

  if (alreadyExists) {
    return { success: false, error: "User already Exists. Rather Login" };
  }

  const user = await db.user.create({
    data: {
      name,
      email: email,
      password: hash,
    },
  });

  console.log("user", user);

  // creating verification token and sending it to email
  // const verificationtoken = await generateVerificationToken(email);
  // console.log("verificationtoken", verificationtoken);
  // await sendVerificationEmail(verificationtoken.email, verificationtoken.token);
  // return { success: true, message: "Confirmation. Email Sent" };
  return { success: true, message: "Register Successfull" };
};
