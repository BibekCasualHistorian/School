import React from "react";
import { ExtendedUser } from "../../next.auth";
import { Card, CardContent, CardHeader } from "./ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: String;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
  console.log("userInfo in Server", user);
  return (
    <Card>
      <CardHeader>
        <p className="text-xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex p-3 border items-center rounded-lg shadow-sm justify-between ">
          <p className="font-medium text-sm">ID:</p>
          <p className="truncate text-xs rounded-md font-medium">{user?.id}</p>
        </div>
        <div className="flex items-center rounded-lg shadow-sm justify-between border p-3 ">
          <p className="font-medium text-sm">Name:</p>
          <p className="truncate text-xs rounded-md font-medium">
            {user?.name}
          </p>
        </div>
        <div className="flex items-center rounded-lg shadow-sm justify-between border p-3 ">
          <p className="font-medium text-sm">Email:</p>
          <p className="truncate text-xs rounded-md font-medium">
            {user?.email}
          </p>
        </div>
        <div className="flex items-center rounded-lg shadow-sm justify-between border p-3 ">
          <p className="font-medium text-sm">Two Factor Authentication:</p>
          <p className="truncate text-xs rounded-md font-medium">
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
