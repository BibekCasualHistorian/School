"use client";
import { GitBranchPlus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const EachChat = ({ user, receipent }: { user: any; receipent: any }) => {
  const params = useParams();
  // console.log("params", params);
  const [message, setMessage] = useState("");

  console.log("message", message);

  const ReceipentHeader = () => {
    return (
      <div className="flex justify-between items-center p-2">
        <div className="  flex gap-3 items-center">
          {receipent.image ? (
            <Image
              alt="real"
              src={receipent.image}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-[50px] h-[50px] rounded-full bg-blue-500 flex items-center justify-center">
              <FaUser className="" />
            </div>
          )}
          <div className="text-xl flex flex-col justify-evenly">
            <span>{receipent.name}</span>
            <span className="text-sm">{"real"}</span>
          </div>
        </div>
        <div>
          <GitBranchPlus />
        </div>
      </div>
    );
  };
  return (
    <div className="flex h-full flex-col">
      <div className="" style={{ flexBasis: "50px" }}>
        <ReceipentHeader />
      </div>
      <div className="overflow-hidden overflow-chat ">
        <div className="overflow-hidden" style={{ textOverflow: "ellipsis" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
          quas, cum tempora possimus ipsa facilis ab, aliquid distinctio iure
          nesciunt laborum, cupiditate doloremque eum architecto totam enim
          asperiores assumenda! Fugiat, blanditiis dignissimos? Deleniti
          perspiciatis sint quod cum?
        </div>
      </div>
      {/* Message Input  */}
      <div
        style={{ flexBasis: "50px" }}
        className="border-2 mt-auto col-span-1 w-full  rounded-xl p-1 grid grid-cols-5 gap-2"
      >
        <div className="col-span-4">
          <Input
            value={message}
            className="text-black"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button className="bg-red-500 col-span-1">Send</Button>
      </div>
    </div>
  );
};

export default EachChat;
