"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";

const AddStudent = ({ userId, classes }: { userId: any; classes: any[] }) => {
  const { toast } = useToast();
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
    console.log(url.href);
    try {
      if (!selectedClass) {
        throw Error("No selected Class");
      }
      if (selectedClass) {
        url.searchParams.append("classId", selectedClass);
      }
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
      toast({ title: "Error", description: error.message });
    }
  };
  return (
    <form className="flex gap-2.5 mt-4" onSubmit={handleSubmit}>
      <Select onValueChange={(value) => setSelectedClass(value)}>
        <SelectTrigger>
          {/* <SelectValue placeholder="Select the class" /> */}
          <SelectValue placeholder="Select the class" />
        </SelectTrigger>
        <SelectContent className="text-black">
          {classes.map((each: any) => {
            return (
              <SelectItem
                key={each.id}
                value={each.id}
                onChange={(e) => setSelectedClass(each.id)}
              >
                {each.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
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
