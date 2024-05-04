import React from "react";
import { currentUser } from "../../../../../../lib/auth";
import EachChat from "@/components/chats/EachChat";
import { db } from "../../../../../../lib/db";

const Page = async (props: any) => {
  console.log("props", props);
  const receipent = await db.user.findFirst({
    where: { id: props.params.userId },
  });
  console.log("receipent", receipent);
  const user = await currentUser();
  return <EachChat user={user} receipent={receipent}></EachChat>;
};

export default Page;
