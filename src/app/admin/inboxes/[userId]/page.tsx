import React from "react";
import { currentUser } from "../../../../../lib/auth";
import EachChat from "@/components/chats/EachChat";
import { db } from "../../../../../lib/db";
import AddConversation from "@/components/chats/AddConversation";

const Page = async (props: any) => {
  const user = await currentUser();
  console.log("props", props);
  const checkingArray = [user?.id, props.params.userId];
  const checkingArrayReverse = [props.params.userId, user?.id];
  console.log("checkingArray", checkingArray);
  const receipent = await db.user.findFirst({
    where: { id: props.params.userId },
  });
  // const existingConversation = await db.conversation.findFirst({
  //   where: { userId: checkingArray || checkingArrayReverse },
  // });

  // console.log("existingConversation", existingConversation);
  // console.log("receipent", receipent);
  // if (!existingConversation) {
  //   return <AddConversation />;
  // }
  return (
    <EachChat
      user={user}
      receipent={receipent}
      // existingConversation={existingConversation}
    ></EachChat>
  );
};

export default Page;
