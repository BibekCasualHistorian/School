import React from "react";
import { db } from "../../../../lib/db";
import RoundedCard from "@/components/reusableCards/RoundedCard";
export const revalidate = 0;

const page = async () => {
  const teachers = await db.teacher.findMany({});
  return (
    <div className="mt-4 grid md:grid-cols-3 gap-3">
      {teachers.map((each: any, index: number) => {
        return (
          <RoundedCard key={index} className="bg-mainBackgroundColor p-2 ">
            <div>
              Teacher name: {each.firstName} {each.lastName}
            </div>
            <p>Email: {each.email}</p>
          </RoundedCard>
        );
      })}
    </div>
  );
};

export default page;
