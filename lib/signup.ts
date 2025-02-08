"use server";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { z } from "zod";

const signupSchema = z
  .object({
    userName: z
      .string()
      .min(1, "O nome é obrigatório")
      .max(50, "O nome é muito longo"),
    password: z.string().min(3, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

const prisma = new PrismaClient();

export async function createUserAction(prevState: any, formData: FormData) {
  const userName = formData.get("userName") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const parsedData = signupSchema.safeParse({
    userName,
    password,
    confirmPassword,
  });

  if (!parsedData.success) {
    return { message: "Por favor, preenchar os dados corretamente." };
  }

  // Verifica se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { userName },
  });

  if (existingUser) {
    return { message: "Este usuário já está em uso." };
  }

  // Criptografa a senha
  const hashedPassword = await hash(password, 12);

  // Cria o usuário no banco de dados
  try {
    await prisma.user.create({
      data: {
        userName,
        password: hashedPassword,
      },
    });

    return { message: "Usuário criado com sucesso!" };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return { message: "Erro ao criar usuário. Tente novamente." };
  }
}
