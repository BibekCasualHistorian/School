import Navbar from "@/components/Navbar";
import React from "react";
import SideComponentHeader from "@/components/reusableCards/SideComponentHeader";
import SideComponentNav from "@/components/reusableCards/SideComponentNav";

interface NoticeLayoutsPorps {
  children: React.ReactNode;
}

const route = `/admin/classes`;

const navOptions = [
  { label: "View Class", href: `${route}` },
  {
    label: `Add Class`,
    href: `${route}/add-class`,
  },
  {
    label: `Edit Class`,
    href: `${route}/edit-class`,
  },
  {
    label: `Send Email`,
    href: `${route}/send-email`,
  },
];

const NoticeLayouts = ({ children }: NoticeLayoutsPorps) => {
  return (
    <div className="p-4">
      <SideComponentHeader
        header="Classes"
        description="Add, update or delete Class"
      />
      <SideComponentNav navOptions={navOptions} />
      {children}
    </div>
  );
};

export default NoticeLayouts;
