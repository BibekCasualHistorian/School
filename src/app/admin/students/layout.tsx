import Navbar from "@/components/Navbar";
import React from "react";
import SideComponentHeader from "@/components/reusableCards/SideComponentHeader";
import SideComponentNav from "@/components/reusableCards/SideComponentNav";

interface StudentsLayoutsProps {
  children: React.ReactNode;
}

const navOptions = [
  { label: "View Student", href: "/admin/students" },
  {
    label: "Add Student",
    href: "/admin/students/add-student",
  },
  {
    label: "Edit Student",
    href: "/admin/students/edit-student",
  },
  {
    label: "Send Email",
    href: "/admin/students/send-email",
  },
];

const StudentsLayouts = ({ children }: StudentsLayoutsProps) => {
  return (
    <div className="p-4">
      <SideComponentHeader
        header="Students"
        description="Find everything about students here"
      />
      <SideComponentNav navOptions={navOptions} />
      {children}
    </div>
  );
};

export default StudentsLayouts;
