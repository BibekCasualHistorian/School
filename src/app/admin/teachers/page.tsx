import React from "react";
import { db } from "../../../../lib/db";

const page = async () => {
  const teachers = await db.teacher.findMany({});
  return <div>{JSON.stringify(teachers)}</div>;
};

export default page;
