import Navbar from "@/components/Navbar";
import React from "react";
import SideComponentHeader from "@/components/reusableCards/SideComponentHeader";
import SideComponentNav from "@/components/reusableCards/SideComponentNav";

interface NoticeLayoutsPorps {
  children: React.ReactNode;
}

const route = `/school/notices`;

const navOptions = [
  { label: "View Student", href: `${route}` },
  {
    label: `Add Student`,
    href: `${route}/add-student`,
  },
  {
    label: `Edit Student`,
    href: `${route}/edit-student`,
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
        header="Stay Informed, Stay Ahead"
        description="Stay updated with important notices and announcements. Be the first to know about what's happening around you"
      />
      <SideComponentNav navOptions={navOptions} />
      {children}
    </div>
  );
};

export default NoticeLayouts;
