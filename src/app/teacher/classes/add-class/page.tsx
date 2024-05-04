"use client";
import React, { useState } from "react";
import { useCurrentUser } from "../../../../../hooks/use-current-user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const user = useCurrentUser();
  //   console.log("user", user);
  const url = new URL("http://localhost:3000/api/admin/classes/create");
  console.log("url", url);
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(name, user?.id);
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/classes/create",
        {
          method: "POST",
          body: JSON.stringify({ name, adminId: user?.id }),
        }
      );
      const data = await response.json();
      console.log("response, data", response, data);
      if (response.ok) {
        setName("");
        console.log("class created Successfully");
      } else {
        setError(data.error);
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    }
  };
  return (
    <form className="flex gap-2.5 mt-4" onSubmit={handleSubmit}>
      <Input
        placeholder="Type the class name"
        value={name}
        type="text"
        className="text-black"
        onChange={(e: any) => setName(e.target.value)}
      />
      {/* <Input /> */}
      <Button size={"lg"} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Page;
