import SideComponentHeader from "@/components/reusableCards/SideComponentHeader";
import SideComponentNav from "@/components/reusableCards/SideComponentNav";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import React from "react";

const Page = () => {
  const EqualGap = ({
    children,
    heading,
    description,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
    heading?: string;
    description?: string;
  }) => {
    return (
      <div className={`my-2.5 ${className}`}>
        <div>
          <h1 className="text-2xl font-medium">{heading}</h1>
          <p>{description}</p>
        </div>
        <div>{children}</div>
      </div>
    );
  };

  return (
    <div className="text-secondaryTextColor">
      <EqualGap
        className=""
        heading="Profile"
        description="This section describes about the profile of the user"
      >
        <div
          className="grid items-center gap-3 justify-center px-3 mt-2.5 p-3 bg-mainBackgroundColor rounded-3xl"
          style={{ gridTemplateColumns: "60px 1fr" }}
        >
          <div className="relative col-span-1 w-16 h-16 ">
            <Image src={"/demo.png"} alt="real" className="rounded-full" fill />
          </div>
          <div className="">
            <h2 className="text-xl text-white">Kate Moore</h2>
            <p className="text-sm">Customer Support</p>
            <p className="text-sm italic">random@gmail.com</p>
          </div>
        </div>
      </EqualGap>
      {/* <div>
        <h2>Title</h2>
        <p>Set your current role.</p>
        <Input
          type="text"
          name=""
          id=""
          className=" bg-mainBackgroundColor text-white p-2 rounded-lg"
        />
      </div> */}
      {/* <div>
        <h2>Title</h2>
        <p>Set your current role.</p>
        <Input
          type="text"
          name=""
          id=""
          className="bg-background p-2 rounded-lg"
        />
      </div> */}
    </div>
  );
};

export default Page;
