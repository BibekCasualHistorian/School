import Navbar from "@/components/Navbar";
import React from "react";
import SideComponentHeader from "@/components/reusableCards/SideComponentHeader";
import SideComponentNav from "@/components/reusableCards/SideComponentNav";

interface EventsLayoutsPorps {
  children: React.ReactNode;
}

const route = `/admin/events`;

const navOptions = [
  { label: "View Events", href: `${route}` },
  {
    label: `Add Events`,
    href: `${route}/add-student`,
  },
  {
    label: `Edit Events`,
    href: `${route}/edit-student`,
  },
  {
    label: `Send Events`,
    href: `${route}/send-email`,
  },
];

const EventsLayouts = ({ children }: EventsLayoutsPorps) => {
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

export default EventsLayouts;
