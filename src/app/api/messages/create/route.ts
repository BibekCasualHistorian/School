import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const inputFromUser = await req.json();
    console.log("inputFromUser", inputFromUser);
    const { senderId, conversationId, content } = inputFromUser;
    console.log("real", senderId, conversationId, content);
    const message = await db.message.create({
      data: { senderId, conversationId, content },
    });
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
