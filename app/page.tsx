import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FormAuth } from "./(Components)/FormAuth";

export default async function Home() {

  const session = await auth();

  if(session) {
    redirect("/Dashboard")
  }

  return (
     <div className="flex flex-col lg:flex-row min-h-screen">
          <div className=""></div>
          <section className="bg-[#5174ea] w-full lg:w-3/5 h-64 lg:h-screen flex items-center justify-center flex-col">
            <div className="text-center px-8 space-y-8 h-64 flex flex-col justify-center items-center">
              <h2 className="text-white text-3xl font-extrabold">Bem-vindo ao</h2>
              <Image src="/logo-crm-white.png" alt="logo" width={300} height={40} />
              <p className="text-gray-200 text-lg mt-4">
                Gerencie tudo de forma simples e eficiente.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/Illustration.png"
                alt="ilustração"
                width={350}
                height={270}
                className="bg-white rounded-lg"
              />
            </div>
          </section>
    
          <section className="flex flex-col justify-center items-center w-full lg:w-2/5 bg-white px-4 lg:px-0">
            <FormAuth />
          </section>
        </div>
  );
}
