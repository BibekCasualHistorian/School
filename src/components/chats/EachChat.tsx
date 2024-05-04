"use client";
import { GitBranchPlus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EachChat = ({ user, receipent }: { user: any; receipent: any }) => {
  const params = useParams();
  console.log("params", params);

  const ReceipentFooter = () => {
    return <div>real</div>;
  };

  const ReceipentHeader = () => {
    return (
      <div className="flex justify-between items-center p-2">
        <div className="w-[40px] flex gap-3 items-center">
          <Image
            alt="real"
            src={receipent.image}
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-xl">{receipent.name}</p>
        </div>
        <div>
          <GitBranchPlus />
        </div>
      </div>
    );
  };
  return (
    <div className="grid p-1">
      <ReceipentHeader />
      <ReceipentFooter />
    </div>
  );
};

export default EachChat;
