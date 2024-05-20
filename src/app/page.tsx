import LoginButton from "@/components/auth/LoginButton";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/Navbar";
import { currentUser } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/auth/login");
  return (
    <div className="">
      <Hero />
    </div>
  );
}
