import React from "react";
import { db } from "../../../../lib/db";

const page = async () => {
  const students = await db.student.findMany({});
  return <div className="">{JSON.stringify(students)}</div>;
};

export default page;
