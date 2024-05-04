import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../../../../../../lib/checkRoles";
import { db } from "../../../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    await isAdmin();
    const inputFromUser = await req.json();
    console.log("inputFromUser", inputFromUser);
    const { firstName, lastName, email, selectedGroupsToBeSent } =
      inputFromUser;
    console.log("selectedGroupToBeSent", selectedGroupsToBeSent);
    const searchParams = req.nextUrl.searchParams;
    const adminId = searchParams.get("adminId") as string;
    console.log("adminId", adminId);
    if (!email || !lastName || !firstName)
      throw new Error("Invalid credentials");
    const createdTeacher = await db.teacher.create({
      data: { email, lastName, firstName },
    });
    console.log("createdTeacher", createdTeacher);

    await selectedGroupsToBeSent.forEach(async (each: any, index: number) => {
      console.log("each", each);
      await db.groupTeacher.create({
        data: { teacherId: createdTeacher.id, groupId: each },
      });
    });
    if (!createdTeacher) throw new Error(`Unable to create teacher`);
    return NextResponse.json(
      {
        success: true,
        message: "Teacher created successfully",
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
