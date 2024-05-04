import React from "react";
import { db } from "../../../../lib/db";
import RoundedCard from "@/components/reusableCards/RoundedCard";

export const revalidate = 0;

const page = async () => {
  const students = await db.student.findMany({});
  return (
    <div className="mt-4 grid md:grid-cols-3 gap-3">
      {students.map((each: any, index: number) => {
        return (
          <RoundedCard key={index} className="bg-mainBackgroundColor p-2 ">
            <div>
              Name: {each.firstName} {each.lastName}
            </div>
            <p>Email: {each.email}</p>
          </RoundedCard>
        );
      })}
    </div>
  );
};

export default page;
