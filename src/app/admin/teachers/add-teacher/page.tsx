import React, { useState } from "react";
import { useCurrentUser } from "../../../../../hooks/use-current-user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddTeacher from "@/components/profile/AddTeacher";
import { currentUser } from "../../../../../lib/auth";
import { db } from "../../../../../lib/db";

const Page = async () => {
  //   console.log("user", user);
  const user = await currentUser();

  const classes = await db.class.findMany({});

  const groups = await db.group.findMany({});

  // const groups: any = [];
  // const classes: any = [];

  console.log("classes", classes);

  console.log("groups", groups);

  return <AddTeacher userId={user?.id} classes={classes} groups={groups} />;
};

export default Page;
