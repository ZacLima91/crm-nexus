"use client";

import { HeroUIProvider } from "@heroui/react";
import { ApiProvider } from "@/providers/api-provider";
import { Sidebar } from "../(Components)/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApiProvider>
      <HeroUIProvider>
        <main className="h-screen overflow-hidden bg-[#e8edfd]">
          <div className="flex">
            <Sidebar />
            {children}
          </div>
        </main>
      </HeroUIProvider>
    </ApiProvider>
  );
}
