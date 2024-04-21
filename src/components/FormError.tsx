import {} from "lucide-react";
import { BsExclamationTriangleFill } from "react-icons/bs";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="p-3 justify-center text-center bg-red-100 rounded-lg flex items-center gap-x-2 text-sm text-destructive">
      <BsExclamationTriangleFill className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
