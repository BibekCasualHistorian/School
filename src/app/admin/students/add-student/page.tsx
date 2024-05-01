import React, { useState } from "react";
import { useCurrentUser } from "../../../../../hooks/use-current-user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddStudent from "@/components/profile/AddStudent";
import { currentUser } from "../../../../../lib/auth";
import { db } from "../../../../../lib/db";

const Page = async () => {
  const user = await currentUser();
  const classes = await db.class.findMany({});

  return <AddStudent userId={user?.id} classes={classes} />;
};

export default Page;
