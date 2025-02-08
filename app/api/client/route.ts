import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.client.findMany();
  return Response.json({ users });
}

// Criar um novo cliente (POST)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Ler os dados do corpo da requisição
    const { name, city, phone, excursao, sector, vacancy, observation } = body;

    // Validação básica
    if (!name || !city || !phone) {
      return NextResponse.json({ error: "Nome, cidade e telefone são obrigatórios!" }, { status: 400 });
    }

    // Criando um novo cliente no banco
    const newClient = await prisma.client.create({
      data: {
        name,
        city,
        phone,
        excursao,
        sector,
        vacancy,
        observation,
        userId: "eb3691c8-62c8-4c5a-8391-9c901753a4be"
      },
    });

    return NextResponse.json({ success: true, client: newClient }, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
