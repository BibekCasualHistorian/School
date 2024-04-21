import { CircleAlert } from "lucide-react";
import { BsExclamationTriangleFill } from "react-icons/bs";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="p-3 justify-center text-center bg-green-100 rounded-lg flex items-center gap-x-2 text-sm text-green-800">
      <CircleAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
