import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt-ts";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { type ClassValue, clsx } from "clsx"
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handlePrismaError(
  error: Error & { code?: string; meta?: { cause?: string } },
  status: number,
  statusText: string
) {
  const msgError =
    (error as PrismaClientKnownRequestError).meta?.cause || error.message;
  return new NextResponse(JSON.stringify({ message: msgError }), {
    status,
    statusText,
  });
}

type User = {
  id: string;
  userName: string;
  password: string;
};

export const prisma = new PrismaClient();

export async function findUserByCredentials(
  userName: string,
  password: string
): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: {
      userName: userName,
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatch = compareSync(password, user.password);

  if (passwordMatch) {
    return { id:user.id, userName: user.userName, password: user.password }; 
  }

  return null;
}


export async function verifyUser(userName: string) {
    const usuario = await prisma.user.findUnique({
      where: {
        userName: userName, 
      },
    });
  
    if (usuario) {
      console.log('Usuário encontrado:', usuario);
      return true;
    } else {
      console.log('Usuário não encontrado');
      return false;
    }
  }