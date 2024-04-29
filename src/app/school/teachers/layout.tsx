import Navbar from "@/components/Navbar";
import React from "react";
import SideComponentHeader from "@/components/reusableCards/SideComponentHeader";
import SideComponentNav from "@/components/reusableCards/SideComponentNav";

interface TeachersLayoutsPorps {
  children: React.ReactNode;
}

const route = `/school/teachers`;

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

const TeachersLayouts = ({ children }: TeachersLayoutsPorps) => {
  return (
    <div className="p-4">
      <SideComponentHeader
        header="Unleash the Excitement"
        description="Stay updated with important notices and announcements. Be the first to know about what's happening around you"
      />
      <SideComponentNav navOptions={navOptions} />
      {children}
    </div>
  );
};

export default TeachersLayouts;
