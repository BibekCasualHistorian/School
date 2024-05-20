"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { useCurrentUser } from "../../../hooks/use-current-user";

const AddConversation = () => {
  const user = useCurrentUser();
  const params = useParams();
  const { userId: id } = params;
  const [error, setError] = useState<string | undefined>(undefined);
  const handleAddConversation = async (e: any) => {
    e.preventDefault();
    const userId = [id, user?.id];
    const conversationName = Math.random().toString();
    const isGroupChat = false;
    console.log("usersIds", userId, isGroupChat, conversationName);

    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/classes/create",
        {
          method: "POST",
          body: JSON.stringify({
            userId,
            conversationName,
            isGroupChat,
          }),
        }
      );
      const data = await response.json();
      console.log("response data", data);
      if (response.ok) {
        console.log("conversation created Successfully");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    }
  };
  return (
    <form
      onSubmit={handleAddConversation}
      className="h-screen flex items-center justify-center"
    >
      <Button type="submit">Start the conversation</Button>
    </form>
  );
};

export default AddConversation;
