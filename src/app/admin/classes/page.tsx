import React from "react";
import { currentUser } from "../../../../lib/auth";
import { db } from "../../../../lib/db";
import RoundedCard from "@/components/reusableCards/RoundedCard";

export const revalidate = 0;

const page = async () => {
  const user = await currentUser();
  const classes = await db.class.findMany({ where: { adminId: user?.id } });
  console.log("user classes", user, classes);
  return (
    <div className="grid md:grid-cols-3 mt-4 gap-3">
      {classes.map((each: any, index: number) => {
        return (
          <RoundedCard key={index} className="p-2 bg-mainBackgroundColor">
            <h1>Class name: {each.name}</h1>
            <p>Start time : 9.00</p>
          </RoundedCard>
        );
      })}
    </div>
  );
};

export default page;
