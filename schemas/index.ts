import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    { message: "New Password is Required", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  );
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum password length is 6",
  }),
});

export const ResetSchema = z.object({
  email: z
    .string({ invalid_type_error: "Must be string" })
    .email({ message: "Email is required" }),
});

export const loginSchema = z.object({
  email: z
    .string({ invalid_type_error: "Must be string" })
    .email({ message: "Email is required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }), // we dont' have to put min(8)
  //  cuz password criteria may change, so we don't
  // use min(8), for regiser it is fine
  // as we have new criteria everytime
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z
    .string({ invalid_type_error: "Must be string" })
    .email({ message: "Email is required" }),
  password: z.string().min(6, {
    message: "Minimum amount of letter is 8",
  }), // we dont' have to put min(8)
  //  cuz password criteria may change, so we don't
  // use min(8), for regiser it is fine
  // as we have new criteria everytime
  name: z.string().min(3, {
    message: "Name is required",
  }),
});
