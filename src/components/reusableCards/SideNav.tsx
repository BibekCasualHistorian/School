"use client";
import React from "react";
import Link from "next/link";

import RoundedCard from "@/components/reusableCards/RoundedCard";
import Image from "next/image";
import { useCurrentUser } from "../../../hooks/use-current-user";
import { usePathname } from "next/navigation";

const SideNav = ({ navItems }: { navItems: any }) => {
  const user = useCurrentUser();
  const pathname = usePathname();

  return (
    <RoundedCard className="bg-mainBackgroundColor p-4  h-full">
      <div className="flex gap-2 items-center mb-5">
        <div>
          <Image
            src={user?.image || ""}
            alt="image"
            width={40}
            height={40}
            className="w-auto rounded-full border-secondaryBackgroundColor border-4 "
          />
        </div>
        <div className="flex flex-col">
          <span className="text-nowrap text-base font-semibold">
            {user?.name}
          </span>
          <span className="text-sm text-secondaryTextColor">{user?.role}</span>
        </div>
      </div>
      {navItems.map((item: any, index: number) => (
        <Link
          href={item.href}
          key={index}
          className={`px-4 py-2.5 flex mb-1  text-xl items-center gap-2 cursor-pointer w-full hover:bg-white hover:text-black   rounded-lg ${
            pathname.includes(item.href)
              ? "bg-white text-black"
              : "text-secondaryTextColor"
          }`}
        >
          <span className="mr-2">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </RoundedCard>
  );
};

export default SideNav;
