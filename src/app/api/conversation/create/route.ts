import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const inputFromUser = await req.json();
    console.log("inputFromUser", inputFromUser);
    const { userId, isGroupChat, conversationName } = inputFromUser;
    console.log(
      "data of conversationName userId, isGroupChat",
      userId,
      isGroupChat,
      conversationName
    );
    if (!userId) throw Error("Invalid User");
    const isConversationAlreadyExists = await db.conversation.findFirst({
      where: { userId: userId },
    });
    console.log("isConversationAlreadyExists", isConversationAlreadyExists);
    const message = await db.message.create({
      data: { isGroupChat, userId, conversationName },
    });
    if (!message) {
      throw Error("Sorry no message was created");
    }
    return NextResponse.json(
      { success: true, message: "Message Sent Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
