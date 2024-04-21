"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface LoginButton {
  children: React.ReactNode;
}

const LoginButton = ({ children }: LoginButton) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
    console.log("clicked");
  };
  return <span onClick={onClick}>{children}</span>;
};

export default LoginButton;
