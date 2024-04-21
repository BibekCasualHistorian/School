import { UserRole } from "@prisma/client";
import { currentRole } from "../lib/auth";

export const admin = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    return { success: false, message: "Forbidden Server Action" };
  }
  return { success: true, message: "You are admin" };
};
