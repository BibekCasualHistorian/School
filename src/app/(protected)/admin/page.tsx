"use client";

import React from "react";
import { useCurrentRole } from "../../../../hooks/next-current-role";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RoleGate from "@/components/auth/RoleGate";
import { FormSuccess } from "@/components/FormSuccess";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "../../../../actions/admin";

const AdminPage = () => {
  const role = useCurrentRole();
  const handleServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.message);
      } else if (!data.success) {
        toast.error(data.message);
      }
    });
  };
  const handleApiRouteClick = () => {
    console.log("here");
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("API fetching allowed");
      } else {
        toast.error("Forbidden API route");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="YOu are allowed to see this content" />
        </RoleGate>
        <div className="shadow-lg flex justify-between p-3 border rounded-lg items-center">
          <p>Admin Only API Route</p>
          <Button onClick={handleApiRouteClick}>Click to test</Button>
        </div>
        <div className="shadow-lg flex justify-between p-3 border rounded-lg items-center">
          <p>Admin Only Server Action</p>
          <Button onClick={handleServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
