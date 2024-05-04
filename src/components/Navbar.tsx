"use client";

import UserButton from "@/components/auth/UserButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import RoundedCard from "./reusableCards/RoundedCard";
import { useCurrentUser } from "../../hooks/use-current-user";

const Navbar = () => {
  const user = useCurrentUser();
  // console.log("user", user);
  const pathname = usePathname();
  console.log("pathname", pathname);
  return (
    <RoundedCard
      isHeader
      className={`rounded-xl items-center justify-between bg-mainBackgroundColor p-3 px-5 text-black ${
        pathname.includes("auth") ? "hidden" : "flex"
      }`}
    >
      <Link href={"/"} className="text-red-500 text-2xl font-semibold">
        School
      </Link>
      <div className="space-x-4">
        {/* <Button asChild variant={pathname == "/admin" ? "default" : "outline"}>
          <Link href={"/"}>Admin</Link>
        </Button>
        <Button asChild variant={pathname == "/client" ? "default" : "outline"}>
          <Link href={"/"}>Client</Link>
        </Button>
        <Button asChild variant={pathname == "/server" ? "default" : "outline"}>
          <Link href={"/"}>Server</Link>
        </Button> */}
        <Button
          asChild
          variant={pathname == "/settings" ? "default" : "outline"}
        >
          <Link href={"/"}>Settings</Link>
        </Button>
      </div>
      {user && <UserButton />}
      {!user && (
        <div className="space-x-4">
          <Link href={"/auth/login"}>
            <Button size={"lg"}>Login</Button>
          </Link>
          <Link href={"/auth/register"}>
            <Button size={"lg"}>Register</Button>
          </Link>
        </div>
      )}
    </RoundedCard>
  );
};

export default Navbar;
