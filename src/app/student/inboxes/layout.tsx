import Navbar from "@/components/Navbar";
import AllInbox from "@/components/chats/AllInbox";
import React from "react";
import { currentUser } from "../../../../lib/auth";
import { db } from "../../../../lib/db";
import AllInboxForStudents from "@/components/chats/AllInboxForStudents";

interface InboxesPorps {
  children: React.ReactNode;
}
const Inboxes = async ({ children }: InboxesPorps) => {
  const user = await currentUser();
  const users = await db.user.findMany({});
  return (
    <div className=" rounded-xl border-white border min-h-screen grid grid-cols-7 gap-2">
      <div className="col-span-3">
        <AllInboxForStudents users={users} />
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
};

export default Inboxes;
