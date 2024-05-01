import React from "react";
import SideComponentHeader from "@/components/reusableCards/SideComponentHeader";
import SideComponentNav from "@/components/reusableCards/SideComponentNav";

interface TeachersLayoutsPorps {
  children: React.ReactNode;
}

const route = `/admin/teachers`;

const navOptions = [
  { label: "View Teacher", href: `${route}` },
  {
    label: `Add Teacher`,
    href: `${route}/add-teacher`,
  },
  {
    label: `Edit Teacher`,
    href: `${route}/edit-teacher`,
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
