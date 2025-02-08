import { auth } from "@/auth";
import { FormSignUp } from "../(Components)/FormSignUp";
import { redirect } from "next/navigation";


export  default async function SignUp() {

    const session = auth()

    if(!session){
        redirect("/")
    }
    return(
        <>
            <FormSignUp/>
        </>
    )
}