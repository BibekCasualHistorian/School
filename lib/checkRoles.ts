import { auth } from "../auth";

export const isAdmin = async () => {
  const session = await auth();
  const role = session?.user?.role;
  console.log("role check before admin");
  if (role != "ADMIN") {
    throw Error("Sorry, you aren't allowed to perform this action");
  }
  console.log("is Admin inside checkRoles");
};

export const isTeacher = async () => {
  const session = await auth();
  const role = session?.user?.role;
  if (role != "TEACHER") {
    throw Error("Sorry, you aren't allowed to perform this action");
  }
};

export const isStudent = async () => {
  const session = await auth();
  const role = session?.user?.role;
  if (role != "STUDENT") {
    throw Error("Sorry, you aren't allowed to perform this action");
  }
};
