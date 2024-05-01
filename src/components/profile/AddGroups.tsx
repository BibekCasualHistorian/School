"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AddGroups = ({ userId, classes }: { userId: any; classes: any[] }) => {
  // console.log("userId in Add Groups", userId, classes);
  const [name, setName] = useState("");
  console.log("name", name);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined
  );
  console.log("selectedClass", selectedClass);
  const [error, setError] = useState<string | undefined>(undefined);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = "http://localhost:3000/api/admin/groups/create";
    let newUrl = new URL(url);
    newUrl.searchParams.append("adminId", userId);
    if (selectedClass) {
      newUrl.searchParams.append("classId", selectedClass);
    }
    console.log("newUrl", newUrl.href);
    try {
      const response = await fetch(newUrl.href, {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      console.log("response, data", response, data);
      if (response.ok) {
        setName("");
        setSelectedClass(undefined);
        console.log("success");
      } else {
        setError(data.error);
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    }
  };
  return (
    <form className="flex gap-2.5 mt-4 text-black" onSubmit={handleSubmit}>
      {/* <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select the class" className="text-black" />
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
      </Select> */}
      <select
        onChange={(e) => setSelectedClass(e.target.value)}
        className="rounded-xl flex-1 "
      >
        <option value={undefined}>Select any</option>
        {classes.map((each: any) => (
          <option key={each.id} value={each.id}>
            {each.name}
          </option>
        ))}
      </select>
      <Input
        placeholder="Type the group name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      {/* <Input /> */}
      <Button size={"lg"} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddGroups;
