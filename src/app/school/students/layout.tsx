import Navbar from "@/components/Navbar";
import React from "react";
import SideComponentHeader from "@/components/reusableCards/SideComponentHeader";
import SideComponentNav from "@/components/reusableCards/SideComponentNav";

interface StudentsLayoutsPorps {
  children: React.ReactNode;
}

const navOptions = [
  { label: "View Student", href: "/school/students" },
  {
    label: "Add Student",
    href: "/school/students/add-student",
  },
  {
    label: "Edit Student",
    href: "/school/students/edit-student",
  },
  {
    label: "Send Email",
    href: "/school/students/send-email",
  },
];

const StudentsLayouts = ({ children }: { children: React.ReactNode }) => {
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
