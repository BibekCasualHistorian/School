"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Select from "react-select";
import RoundedCard from "../reusableCards/RoundedCard";
import { useRouter } from "next/navigation";

const AddTeacher = ({
  userId,
  groups,
}: {
  userId: any;
  classes?: any[];
  groups: any[];
}) => {
  const router = useRouter();
  const option = groups.map((each, index) => {
    return {
      value: each.id,
      label: each.name,
    };
  });
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [selectedGroup, setSelectedGroup] = useState<string[] | undefined>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(firstName, lastName, email);
    const selectedGroupsToBeSent = selectedGroup?.map((each: any) => {
      return each.value;
    });
    console.log("selectedGroupsToBeSent", selectedGroupsToBeSent);
    const baseUrl = "http://localhost:3000/api/admin/teachers/create";
    const url = new URL(baseUrl);
    url.searchParams.append("adminId", userId);
    console.log("url", url.href);

    try {
      const response = await fetch(url.href, {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          selectedGroupsToBeSent,
        }),
      });
      const data = await response.json();
      console.log("response, data", response, data);
      if (response.ok) {
        setSelectedGroup([]);
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
  const handleSelectChange = (value: any) => {
    setSelectedGroup(value);
  };

  return (
    <form className="grid gap-2.5 mt-4" onSubmit={handleSubmit}>
      <Select
        options={option}
        className="min-w-[220px] text-black"
        isMulti
        name="groups"
        placeholder="Select for groups..."
        classNamePrefix="select"
        onChange={(value) => handleSelectChange(value)}
      />
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
