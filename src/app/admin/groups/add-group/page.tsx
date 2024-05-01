import React, { useState } from "react";
import AddGroups from "@/components/profile/AddGroups";
import { currentUser } from "../../../../../lib/auth";
import { db } from "../../../../../lib/db";

const Page = async () => {
  const user = await currentUser();
  console.log("user in groups", user);

  const classes = await db.class.findMany({});

  console.log("classes", classes);

  return <AddGroups userId={user?.id} classes={classes} />;
};

export default Page;
