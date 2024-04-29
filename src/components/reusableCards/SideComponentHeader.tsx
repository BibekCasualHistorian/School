import React from "react";

const SideComponentHeader = ({
  header,
  description,
}: {
  header: string;
  description: string;
}) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mb-2 text-white">{header}</h1>
      <h2 className="font-medium text-lg text-secondaryTextColor mb-2">
        {description}
      </h2>
    </div>
  );
};

export default SideComponentHeader;
