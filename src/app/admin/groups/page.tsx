import React from "react";
import { currentUser } from "../../../../lib/auth";
import { db } from "../../../../lib/db";

const page = async () => {
  const user = await currentUser();
  const groups = await db.group.findMany({});
  console.log("groups", groups);
  return (
    <div className="w-full border word-break text-balance">
      {JSON.stringify(groups)}
    </div>
  );
};

export default page;
