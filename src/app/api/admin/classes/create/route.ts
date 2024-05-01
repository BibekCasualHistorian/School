import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../../../../../../lib/checkRoles";
import { db } from "../../../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    await isAdmin();
    const inputFromUser = await req.json();
    console.log("inputFromUser", inputFromUser);
    const { name, adminId } = inputFromUser;
    if (!name) throw Error("no name provided");
    const createdClass = await db.class.create({ data: { name, adminId } });
    console.log("createdClass", createdClass);
    if (!createdClass) throw Error("Sorry no class was created");
    return NextResponse.json(
      { message: "Class created successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(
      { error: error.message || "An error Ocuured", success: false },
      { status: 404 }
    );
  }
}
