"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";


export async function loginAction(prevState: {message: string}, formData: FormData) {
  const userName = formData.get("userName") as string;
  const password = formData.get("password") as string;

  try{

    await signIn("credentials", {
      userName,
      password,
      redirect: true,
      redirectTo: "/Dashboard"
    });
  } catch(error){
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {message:"Usuário ou senha incorreta"};
        default:
          return {message:"Ops, algum erro aconteceu."};
      }
    }
    throw error;
  }

  return { message: "Login successful" };
}