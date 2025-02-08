"use server";

import { Client } from "@/app/(Components)/list-clients";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PrevState {
  success: boolean;
  message: string;
  newUser?: Client; // Pode ser tipado corretamente se soubermos a estrutura de `newUser`
  error?: string;
}

export async function submitNewCliente(
  prevState: PrevState,
  formData: FormData
) {
  const session = await auth();

  console.log(session);
  
  if (!session || !session.user?.id) {
    console.error("Usuário não autenticado ou sessão inválida", session);
    return {
      success: false,
      message: "Usuário não autenticado. Faça login para continuar.",
    };
  }

  const dados = {
    name: formData.get("name") as string,
    city: formData.get("city") as string,
    phone: formData.get("phone") as string,
    excursao: formData.get("excursao") as string,
    sector: formData.get("sector") as string,
    vacancy: formData.get("vacancy") as string,
    observation: formData.get("observation") as string,
    userId: session.user.id as string,
  };
  console.log(session, "no new cliente");

  try {
    // Tenta criar o novo cliente no banco de dados
    const newUser = await prisma.client.create({
      data: dados,
    });

    console.log(newUser, "linha 49 new user");

    return {
      success: true,
      message: "Cliente criado com sucesso",
      newUser: newUser,
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro ao criar cliente. Tente novamente mais tarde.",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
