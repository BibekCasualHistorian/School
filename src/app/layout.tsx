import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { db } from "../../lib/db";
import { auth } from "../../auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  // const user = await db.user.findMany();
  // console.log("user", user);
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${inter.className} p-3 bg-black text-white `}>
          <main className="">
            <Navbar />
            {children}
            <Toaster />
          </main>
        </body>
      </html>
    </SessionProvider>
  );
}
