import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../../../../../../lib/checkRoles";
import { db } from "../../../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const adminId = searchParams.get("adminId") as string;
    const classId = searchParams.get("classId") as string;
    console.log(adminId, classId);
    if (!adminId) throw Error("No admin Data");
    console.log(adminId, classId);
    await isAdmin();
    const inputFromUser = await req.json();
    console.log("inputFromUser", inputFromUser);
    const { name } = inputFromUser;
    if (!name) throw Error("no name provided");
    const createdGroup = await db.group.create({
      data: { name, adminId, classId },
    });
    console.log("createdGroups", createdGroup);
    if (!createdGroup) throw Error("Sorry no class was created");
    return NextResponse.json(
      { message: "Group created successfully", success: true },
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
