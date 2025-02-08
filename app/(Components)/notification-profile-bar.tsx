
import { auth } from "@/auth";
import Image from "next/image";


export async function NotificationProfileBar() {
 const session = await auth()
 
  
  return (
    <div className="flex items-center gap-4 relative w-12 h-12 bg-white rounded-full">
      {session && session.user?.user === "Obela" ? (
        <Image src="/logoObela.png" alt="avatar obela" fill />
      ) : (
        <p className="text-gray-700">{session?.user?.user?.charAt(0)}</p>
      )}
    </div>
  );
}
