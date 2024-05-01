import React from "react";
import { db } from "../../../../../lib/db";
import { currentUser } from "../../../../../lib/auth";

const page = async () => {
  const user = await currentUser();
  const groups = await db.class.findMany({});
  console.log("groups", groups);
  return <div>{JSON.stringify(groups)}</div>;
};

export default page;
