"use client";

import { UserRole } from "@prisma/client";
import { Form } from "../ui/form";
import { FormError } from "../FormError";
import { useCurrentRole } from "../../../hooks/next-current-role";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return (
      <div>
        <FormError message="You don't have permission to view this content!" />
      </div>
    );
  }
  return <>{children}</>;
};

export default RoleGate;
