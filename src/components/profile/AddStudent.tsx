"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const AddStudent = ({ userId, classes }: { userId: any; classes: any[] }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState<string | undefined>(undefined);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const baseUrl = "http://localhost:3000/api/admin/students/create";
    const url = new URL(baseUrl);
    url.searchParams.append("adminId", userId);
    if (selectedClass) {
      url.searchParams.append("classId", selectedClass);
    }
    console.log(url.href);
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
        setSelectedClass(undefined);
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
      <select
        onChange={(e) => setSelectedClass(e.target.value)}
        className="rounded-xl flex-1 text-black "
      >
        <option value={undefined}>Select any</option>
        {classes.map((each: any) => (
          <option key={each.id} value={each.id}>
            {each.name}
          </option>
        ))}
      </select>
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

export default AddStudent;
