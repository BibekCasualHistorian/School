"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";

const Socials = () => {
  const [error, setError] = useState("");
  const handleProviders = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => handleProviders("google")}
      >
        <FcGoogle size={23} />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => handleProviders("github")}
      >
        <FaGithub size={23} />
      </Button>
    </div>
  );
};

export default Socials;
