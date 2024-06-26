import React from "react";
import RoundedCard from "@/components/reusableCards/RoundedCard";
import SideNav from "../../components/reusableCards/SideNav";
import {
  FaUser,
  FaSchool,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaBell,
} from "react-icons/fa";

interface SchoolLayoutsPorps {
  children: React.ReactNode;
}

const route = "student";

const navItems = [
  { icon: <FaUser />, label: "Profile", href: `/${route}/profile` },
  // { icon: <FaUser />, label: "Classes", href: `/${route}/classes` },
  // { icon: <FaUser />, label: "Groups", href: `/${route}/groups` },
  // {
  //   icon: <FaChalkboardTeacher />,
  //   label: "Teachers",
  //   href: `/${route}/teachers`,
  // },
  // { icon: <FaSchool />, label: "Students", href: `/${route}/students` },
  // { icon: <FaCalendarAlt />, label: "Events", href: `/${route}/events` },
  // { icon: <FaBell />, label: "Notices", href: `/${route}/notices` },
  { icon: <FaBell />, label: "Inbox", href: `/${route}/inboxes` },
];

const SchoolLayouts = ({ children }: SchoolLayoutsPorps) => {
  return (
    <RoundedCard className="grid grid-cols-5 mt-4 gap-3 min-h-screen">
      <SideNav navItems={navItems} />
      <RoundedCard className="col-span-4">{children}</RoundedCard>
    </RoundedCard>
  );
};

export default SchoolLayouts;
