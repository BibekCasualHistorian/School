"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHamburger, FaUser } from "react-icons/fa";
import { Input } from "../ui/input";
import { useParams } from "next/navigation";

const AllInbox = ({ users }: { users: any }) => {
  const params = useParams();
  console.log("params", params); // Example chat URLs

  return (
    <div className="border-r-2 h-full  border-gray-300 p-2.5 ">
      <div className="flex justify-between items-center px-3 rounded-lg  p-3">
        <div className="font-bold flex items-center gap-3 text-2xl">
          <h1>Chats</h1>
          <p className="bg-mainBackgroundColor  w-7 h-7 flex items-center justify-center text-sm font-semibold rounded-full">
            {"9"}
          </p>
        </div>

        <div className="border border-backgroundTextColor p-2 rounded-xl">
          <FaUser size={20} className="text-xl opacity-35" />
        </div>
      </div>

      <div className="p-3">
        <Input
          size={25}
          placeholder="type for inbox here..."
          className="p-5 bg-secondaryBackgroundColor border-backgroundTextColor border-2 rounded-2xl"
        />
      </div>

      <div className="p-2 ">
        <div className="w-full space-x-1.5 font-medium text-white grid grid-cols-2 bg-mainBackgroundColor rounded-2xl p-1.5 text-center">
          <Link
            href={"/"}
            className="rounded-xl p-2 bg-secondaryBackgroundColor"
          >
            Inbox
          </Link>
          <Link
            href={"/"}
            className="rounded-xl p-2 bg-secondaryBackgroundColor text-white"
          >
            Unread
          </Link>
        </div>
      </div>

      <div className="space-y-2 mt-2">
        {users.map((each: any, index: number) => (
          <Link
            key={index}
            href={`/admin/inboxes/${each.id}/${"real"}`}
            className={`mr-4  w-full flex items-center gap-3 p-4 rounded-xl  hover:bg-secondaryBackgroundColor ${
              params.userId == each.id ? "bg-secondaryBackgroundColor" : ""
            }`}
          >
            <div className="min-w-10  relative">
              <Image
                src={each.image}
                alt="User Image"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span
                style={{ top: "-6px", right: "-6px" }}
                className=" border-2 border-black rounded-full w-6 h-6 flex justify-center items-center font-bold text-xs text-white absolute bg-pink-700"
              >
                0
              </span>
            </div>
            <div className=" col-span-2 flex-1 overflow-hidden">
              <h1 className="font-semibold">{each.name}</h1>
              <p
                style={{ textOverflow: "ellipsis" }}
                className="text-sm  text-backgroundTextColor overflow-hidden  text-nowrap"
              >
                Real is better than sit. Lorem Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Officia veritatis aperiam suscipit
                dolorem possimus, tempora odit inventore itaque! Ea quas magni
                beatae sint quia pariatur. Deleniti a autem officiis cupiditate
                pariatur, exercitationem, quibusdam dolorem ipsum quos sapiente
                nisi minus culpa quis unde quo maxime totam? Voluptate, iste
                quasi labore, iure magni temporibus modi sed architecto
                similique quibusdam, corporis voluptas!
              </p>
            </div>
            <div className=" text-backgroundTextColor flex items-center text-base">
              12:23
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllInbox;
