import LoginForm from "@/components/auth/LoginForm";
import React from "react";
import { db } from "../../../../lib/db";

const page = () => {
  return (
    <div className="">
      <LoginForm />
    </div>
  );
};

export default page;
