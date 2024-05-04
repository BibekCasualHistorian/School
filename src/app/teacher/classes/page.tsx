import React from "react";
import { currentUser } from "../../../../lib/auth";
import { db } from "../../../../lib/db";

export const revalidate = 0;

const page = async () => {
  const user = await currentUser();
  const classes = await db.class.findMany({ where: { adminId: user?.id } });
  console.log("user classes", user, classes);
  return <div>{JSON.stringify(classes)}</div>;
};

export default page;
