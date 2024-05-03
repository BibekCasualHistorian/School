"use client";
import RoundedCard from "@/components/reusableCards/RoundedCard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaUserPlus, FaEdit, FaEnvelope } from "react-icons/fa";

const SideComponentNav = ({ navOptions }: { navOptions: any }) => {
  const pathName = usePathname();
  // Define an array of navigation options

  // console.log("pathName", pathName);
  // console.log("navOptions", navOptions);

  return (
    <RoundedCard className="bg-mainBackgroundColor mt-3 pl-2 flex gap-1.5 p-1 py-1.5 w-full">
      {/* Map over the navOptions array to render navigation items */}
      {navOptions.map((option: any, index: number) => (
        <Link
          href={option.href}
          key={index}
          className={`flex items-center text-base px-7  justify-start text-secondaryTextColor py-1.5 rounded-lg transition duration-300 hover:bg-secondaryBackgroundColor ${
            pathName == option.href
              ? "bg-secondaryBackgroundColor text-white"
              : ""
          }`}
        >
          {option.label}
        </Link>
      ))}
    </RoundedCard>
  );
};

export default SideComponentNav;
