"use server";

import { signOut } from "../auth";

export const logout = async () => {
  // do some server stuff before we logout
  // such as clearing some information with user or any other things
  await signOut();
};
