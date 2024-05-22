import React from "react";
import { db } from "../../../../lib/db";
import RoundedCard from "@/components/reusableCards/RoundedCard";
import Image from "next/image";

export const revalidate = 0;

const page = async () => {
  const teachers = await db.teacher.findMany({});
  // const teachers = ["", ""];
  return (
    <div className="mt-4 grid md:grid-cols-3 gap-3">
      {teachers.map((each: any, index: number) => {
        return (
          <RoundedCard key={index} className="bg-mainBackgroundColor p-2 ">
            <div className="w-24 h-24 mx-auto relative rounded-full flex justify-center">
              <Image
                src={"/demo.png"}
                alt="real"
                fill
                className="rounded-full"
              />
            </div>
            <div>
              Teacher name: {each?.firstName || "undefined"} {each.lastName}
            </div>
            <p>Email: {each.email}</p>
          </RoundedCard>
        );
      })}
    </div>
  );
};

export default page;
