import AuthService from "@/modules/services/auth-service";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

async function createAccount(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const hasPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hasPassword,
    },
  });

  redirect("/portal/sign-in");
}

async function Login(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    redirect("/portal/sign-in");
  }
  const isMatch = await bcrypt.compare(password, user?.password);

  if (!isMatch) {
    console.log("email ou senha invalidos");
    redirect("/portal/sign-in");
  }

  await AuthService.createSessionToken({
    sub: user.id,
    name: user.name,
    email: user.email,
  });

  redirect("/portal");
}

const AuthActions = {
  createAccount,
  Login,
};

export default AuthActions;
