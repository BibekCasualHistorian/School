import Navbar from "@/components/Navbar";
import React from "react";
import SideComponentHeader from "@/components/reusableCards/SideComponentHeader";
import SideComponentNav from "@/components/reusableCards/SideComponentNav";

interface ProfileLayoutsPorps {
  children: React.ReactNode;
}

const route = `/school/profile`;

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

const profileLinks = [
  { label: "Home", href: "/school/profile" },
  { label: "Appearance", href: "/school/profile/appearance" },
];

const ProfileLayouts = ({ children }: ProfileLayoutsPorps) => {
  return (
    <div className="p-4">
      <SideComponentHeader
        header="Your Profile"
        description="Unlock the gateway to your world. Manage, update, and curate your personal space with ease"
      />
      <SideComponentNav navOptions={profileLinks} />
      {children}
    </div>
  );
};

export default ProfileLayouts;
