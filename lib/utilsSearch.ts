import { db } from "./db";

export const getSingleUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const getSingleUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const checkWhetherStudentIsAddedInDatabaseByAdmin = async (
  email: string
) => {
  try {
    const student = await db.student.findUnique({ where: { email: email } });
    return student;
  } catch (error) {
    return null;
  }
};

export const checkWhetherTeacherIsAddedInDatabaseByAdmin = async (
  email: string
) => {
  try {
    const teacher = await db.teacher.findUnique({ where: { email: email } });
    return teacher;
  } catch (error) {
    return null;
  }
};
