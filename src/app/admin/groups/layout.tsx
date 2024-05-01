import Navbar from "@/components/Navbar";
import React from "react";
import SideComponentHeader from "@/components/reusableCards/SideComponentHeader";
import SideComponentNav from "@/components/reusableCards/SideComponentNav";

interface NoticeLayoutsPorps {
  children: React.ReactNode;
}

const route = `/admin/groups`;

const navOptions = [
  { label: "View Groups", href: `${route}` },
  {
    label: `Add Groups`,
    href: `${route}/add-group`,
  },
  {
    label: `Edit Groups`,
    href: `${route}/edit-group`,
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
        header="Groups"
        description="Add, update or delete groups"
      />
      <SideComponentNav navOptions={navOptions} />
      {children}
    </div>
  );
};

export default NoticeLayouts;
