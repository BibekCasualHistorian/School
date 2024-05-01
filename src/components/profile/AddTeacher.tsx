"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const AddTeacher = ({ userId }: { userId: any }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(firstName, lastName, email);
    console.log("userId", userId);
    const baseUrl = "http://localhost:3000/api/admin/teachers/create";
    const url = new URL(baseUrl);
    url.searchParams.append("adminId", userId);
    try {
      const response = await fetch(url.href, {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email }),
      });
      const data = await response.json();
      console.log("response, data", response, data);
      if (response.ok) {
        setEmail("");
        setFirstName("");
        setLastName("");
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
        placeholder="Type the firstName name"
        value={firstName}
        type="text"
        className="text-black"
        onChange={(e: any) => setFirstName(e.target.value)}
      />
      <Input
        placeholder="Type the lastName name"
        value={lastName}
        type="text"
        className="text-black"
        onChange={(e: any) => setLastName(e.target.value)}
      />
      <Input
        placeholder="Type the email name"
        value={email}
        type="text"
        className="text-black"
        onChange={(e: any) => setEmail(e.target.value)}
      />
      {/* <Input /> */}
      <Button size={"lg"} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddTeacher;
