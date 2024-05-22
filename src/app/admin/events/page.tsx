import React from "react";

const page = () => {
  const arr = ["", ""];
  return (
    <div>
      {arr.map((each: any, index: number) => {
        return <div key={index}>each</div>;
      })}
    </div>
  );
};

export default page;
