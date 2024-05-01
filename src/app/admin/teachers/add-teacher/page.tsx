import React, { useState } from "react";
import { useCurrentUser } from "../../../../../hooks/use-current-user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddTeacher from "@/components/profile/AddTeacher";
import { currentUser } from "../../../../../lib/auth";

const Page = async () => {
  //   console.log("user", user);
  const user = await currentUser();

  return <AddTeacher userId={user?.id} />;
};

export default Page;
