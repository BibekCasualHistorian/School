import SideComponentHeader from "@/components/reusableCards/SideComponentHeader";
import SideComponentNav from "@/components/reusableCards/SideComponentNav";
import { Input } from "@/components/ui/input";
import { Image } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="text-secondaryTextColor">
      <div>
        <h1>Profile</h1>
        <p>This displays your public profile on the site</p>
        <div>
          {/* <Image /> */}
          <div>
            <h2>Kate Moore</h2>
            <p>Customer Support</p>
            <p>random@gmail.com</p>
          </div>
        </div>
      </div>
      <div>
        <h2>Title</h2>
        <p>Set your current role.</p>
        <Input
          type="text"
          name=""
          id=""
          className=" bg-mainBackgroundColor text-white p-2 rounded-lg"
        />
      </div>
      <div>
        <h2>Title</h2>
        <p>Set your current role.</p>
        <Input
          type="text"
          name=""
          id=""
          className="bg-background p-2 rounded-lg"
        />
      </div>
    </div>
  );
};

export default Page;
