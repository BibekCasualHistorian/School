// "use server";
// import React from "react";
// import { currentUser } from "../../../../lib/auth";
// import UserInfo from "@/components/UserInfo";

// const ServerPage = async () => {
//   const user = await currentUser();
//   console.log("user in server", user);
//   return (
//     <div className="w-[600px]">
//       <UserInfo user={user} label={"Server Component"} />
//     </div>
//   );
// };

// export default ServerPage;

import React from "react";

export const page = () => {
  return <div>page</div>;
};
