"use client";

import {
  Bolt,
  Boxes,
  DollarSign,
  FileLineChart,
  LogOut,
  PackageCheck,
  ShoppingBag,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "@/auth";
import { logoutAction } from "@/lib/logout";

const navItems = [
  { path: "/dashboard/vender", label: "Vender", Icon: PackageCheck },
  {
    path: "/dashboard/pedidos",
    label: "Pedidos",
    Icon: () => <div className="h-6 w-6 bg-gray-600 rounded-full"></div>,
  },
  { path: "/dashboard/produtos", label: "Produtos", Icon: Boxes },
  { path: "/dashboard/loja", label: "Loja", Icon: ShoppingBag },
  { path: "/dashboard/clientes", label: "Clientes", Icon: UserRound },
  { path: "/dashboard/historico", label: "Histórico", Icon: DollarSign },
  { path: "/dashboard/usuarios", label: "Usuários", Icon: Users },
  { path: "/dashboard/configuracoes", label: "Configurações", Icon: Bolt },
  { path: "/logout", label: "Sair", Icon: LogOut },
];

export function Sidebar() {
  // Estado para o item ativo
  const [activeItem, setActiveItem] = useState<string>("");

  const handlerLogout = async () => {
    await logoutAction();
  };

  return (
    <div className="absolute w-52 mx-3 my-3  h-[96%] bg-white border-l-8 border-white rounded-lg transition overflow-hidden z-30">
      {" "}
      <div className="flex items-center w-full gap-4 p-4">
        <Image src="/logo-nexo.png" alt="crm" width={150} height={70} />
      </div>
      <ul className="w-full flex flex-col mt-2">
        {navItems.map(({ label, path, Icon }) => (
          <li
            key={label}
            className={`relative w-full hover:bg-blue-500 hover:text-white text-gray-600 rounded-l-lg ${
              activeItem === path ? "bg-primary text-white" : ""
            }`}
          >
            <Link
              href={label !== "Sair" ? "/denied" : "#"}
              passHref
              onClick={label === "Sair" ? handlerLogout : undefined}
              className="relative w-full flex items-center px-4 py-3 space-x-2 hover:text-white"
            >
              <Icon width={20} className="text-xs " />
              <p className="text-sm ">{label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
