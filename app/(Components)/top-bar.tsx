import { NotificationProfileBar } from "./notification-profile-bar";
import { Search } from "./search";
import { auth } from "@/auth";

export async function TopBar() {
  const session = await auth();

  console.log(session?.user, "linha 8");
  

  return (
    <div className="w-full flex justify-between">
      <Search />
      <NotificationProfileBar  />
    </div>
  );
}
