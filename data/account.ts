import { db } from "../lib/db";

db;

export const getAccountById = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });
    return account;
  } catch (error) {
    return null;
  }
};
