"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ApiProvider } from "@/providers/api-provider";
import { Sidebar } from "../(Components)/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApiProvider>
      <NextUIProvider>
        <main className="h-screen overflow-hidden bg-[#e8edfd]">
          <div className="flex">
            <Sidebar />
            {children}
          </div>
        </main>
      </NextUIProvider>
    </ApiProvider>
  );
}
