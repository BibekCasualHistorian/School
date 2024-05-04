import Navbar from "@/components/Navbar";
import AllInbox from "@/components/chats/AllInbox";
import React from "react";
import { currentUser } from "../../../../lib/auth";

interface InboxesPorps {
  children: React.ReactNode;
}
const Inboxes = async ({ children }: InboxesPorps) => {
  const user = await currentUser();
  return (
    <div className=" rounded-xl border-white border min-h-screen grid grid-cols-7 gap-2">
      <div className="col-span-3">
        <AllInbox user={user} />
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
};

export default Inboxes;
