// as prisma doesn't support edge compatibility , we need auth.config.js
// prisma doesn't work on edge compatibility
// as it doesn't support edge compatibility, we willn't be able to use
// lot of events and callbacks which would have otherwise been able to

import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas";
import { getSingleUserByEmail } from "./lib/utilsSearch";
import google from "next-auth/providers/google";
import github from "next-auth/providers/github";

export default {
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    credentials({
      async authorize(credentials) {
        const validateFields = loginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getSingleUserByEmail(email);
          if (!user || !user.password) return null; // this checking if user already logged in through any other serverice provider
          // suppose if Google was used then we need to stop signing in through credentails
          const passwordMatched = await bcrypt.compareSync(
            password,
            user.password
          );
          if (passwordMatched) return user;
        }
        return null;
      },

      // the goal of this is that users can bypass server action
      // and we have to check again
    }),
  ],
} satisfies NextAuthConfig;
