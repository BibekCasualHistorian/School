import Navbar from "../../components/home/Navbar";

import { Toaster } from "@/components/ui/sonner";
interface ProtectedLayoutPorps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" justify-center min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
