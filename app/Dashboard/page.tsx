import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { ListClients } from "../(Components)/list-clients";
import { TopBar } from "../(Components)/top-bar";
import { UtilityBar } from "../(Components)/utility-bar";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="absolute  top-0 right-0 h-screen w-[calc(100vw-208px)] flex-1 px-8 py-3 pb-10">
      <TopBar />
      <UtilityBar />
      <ListClients />
    </div>
  );
}
