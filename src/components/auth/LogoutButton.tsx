"use client";
interface LogoutButtonProps {
  children: React.ReactNode;
}

import React from "react";
import { logout } from "../../../actions/logout";

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const handleClick = () => {
    logout();
  };
  return <span onClick={handleClick}>{children}</span>;
};

export default LogoutButton;
