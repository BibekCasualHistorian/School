import React from "react";
import { currentUser } from "../../../../lib/auth";
import { db } from "../../../../lib/db";
import RoundedCard from "@/components/reusableCards/RoundedCard";

export const revalidate = 0;

const page = async () => {
  const user = await currentUser();
  const groups = await db.group.findMany({});
  console.log("groups", groups);
  return (
    <RoundedCard className="grid md:grid-cols-3 gap-3 mt-4">
      {groups.map((each: any, index: number) => {
        return (
          <RoundedCard key={index} className="bg-mainBackgroundColor p-2">
            <h2>Group name: {each.name}</h2>
            <p>Teacher: {each.teacherId || "Not Available"}</p>
          </RoundedCard>
        );
      })}
    </RoundedCard>
  );
};

export default page;
