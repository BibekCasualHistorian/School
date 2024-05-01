import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../../../../../../lib/checkRoles";
import { db } from "../../../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const adminId = searchParams.get("adminId") as string;
    const classId = searchParams.get("classId") as string;
    console.log("adminId", adminId, classId);
    await isAdmin();
    const inputFromUser = await req.json();
    const { email, firstName, lastName } = inputFromUser;
    if (!email || !firstName || !lastName || !classId || !adminId)
      throw new Error("Invalid credentials");
    const createdStudent = await db.student.create({
      data: { email, firstName, lastName, classId, adminId },
    });
    if (!createdStudent) throw new Error(`Unable to create student`);
    return NextResponse.json(
      {
        success: true,
        message: "Student created successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An Error Occured", success: false },
      { status: 400 }
    );
  }
}
