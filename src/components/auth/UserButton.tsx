"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "../../../hooks/use-current-user";
import { FaUser } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 text-center flex flex-col justify-center">
        <DropdownMenuItem className="">
          <Link href={"/admin/profile"} className=" w-full p-3 rounded-lg">
            Admin
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem className="p-3 text-center w-full  flex justify-center">
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
