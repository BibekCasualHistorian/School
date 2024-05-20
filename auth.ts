import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import {
  checkWhetherStudentIsAddedInDatabaseByAdmin,
  checkWhetherTeacherIsAddedInDatabaseByAdmin,
  getSingleUserById,
} from "./lib/utilsSearch";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountById } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn, // signIn and signOut can be used in serverComponents and server actions
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login", // will redirect to this route when something goes wrong
    error: "/auth/error", // will redirect to if we have error
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
      // to know if user used OAUTH or not
    },
  },
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getSingleUserById(user.id);
    //   if (!existingUser || existingUser.email) {
    //     // means we refuse singing in of user
    //     return false;
    //   }
    //   // by default we allow user to sign in
    //   return true;
    // },
    async signIn({ user, account }) {
      // console.log("user and account", user, account);
      // this is generally fallback for the code in login server Action
      // check by commenting respective code from login Server Action and you might see
      // the error is something went wrong rather than confirmation
      // email sent

      // Allow OAUTH without email verification

      console.log("user in signIn", user, account);

      if (account?.provider !== "credentials") return true;
      if (!user.id) {
        return false;
      }

      // const existingUser = await getSingleUserById(user.id);
      // // console.log("existingUser in signIn auth.ts", existingUser);
      // if (!existingUser?.emailVerified) {
      //   // means we refuse signing in of user
      //   return false;
      // }

      // we don't want usser to sign in directly if twofactorenabled is false
      // if (existingUser.isTwoFactorEnabled) {
      //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
      //     existingUser.id
      //   );
      //   // console.log("twoFactorConfirmation in auth.ts", twoFactorConfirmation);
      //   if (!twoFactorConfirmation) {
      //     return false;
      //   }

      //   // delete two factor confirmation for next sign In
      //   await db.twoFactorConfirmation.delete({
      //     where: {
      //       id: twoFactorConfirmation.id,
      //     },
      //   });

      //   // Delete two factor confirmation for next sign in
      // }

      return true; // means we allowed to signIn
    },
    async session({ session, token }) {
      // console.log("token in session", token);
      // console.log("session in session", session);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        // by default user role doesn't exist here
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name;
        session.user.isOauthEnabled = token.isOauthEnabled as boolean;
      }

      // console.log("session in session after operations", session);
      return session;
    },
    // session uses jwt to extend the session
    async jwt({ token, account, user }) {
      // token isn't available, then return token
      // that means user is logged out
      if (!token.sub) return token;
      // we have seperated auth and auth.config cuz we are using prisma here
      // and it isn't supported in callbacks
      const existingUser = await getSingleUserById(token.sub);
      // if no existing User then return token
      if (!existingUser) return token;
      const existingAccount = await getAccountById(existingUser.id);
      token.isOauthEnabled = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      // console.log("token in jwt", token);
      // sub is user_id in database
      // the goal is to access sub from token and add fields if necessary
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" }, // session doesn't work on edge compatibility
  ...authConfig,
});
