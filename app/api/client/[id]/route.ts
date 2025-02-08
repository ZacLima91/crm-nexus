import { handlePrismaError } from "@/lib/utils";
import { Client, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Instanciar o cliente Prisma
const prisma = new PrismaClient();

// Definir a função PUT para lidar com as solicitações de atualização
export async function PATCH(request: NextRequest,  { params }: { params: Promise<{ id: string }> }) {
  try {
    // Obter parâmetros da solicitação
    const { id } = await params;

    // Verificar se o ID está presente e o método é PATCH
    if (!id || request.method !== 'PATCH') {
      return new NextResponse(null, {
        status: 405,
        statusText: 'Method Not Allowed',
      });
    }

    // Obter todos os usuários
    const users = await prisma.client.findMany();

    // Filtrar o usuário pelo ID
    const user = users.find(x => id === x.id.toString());

    // Verificar se o usuário existe
    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'Client not found' }), {
        status: 404,
        statusText: 'Not Found',
      });
    }

    // Obter dados do cliente a serem atualizados a partir do corpo da solicitação
    const newClientData: Client = await request.json();

    // Atualizar o cliente no banco de dados
    const updatedClient: Client | null = await prisma.client.update({
      where: {
        id: id.toString(),
      },
      data: newClientData,
    });

    // Verificar se o cliente foi atualizado com sucesso
    if (!updatedClient) {
      return new NextResponse(JSON.stringify({ message: 'Client not found' }), {
        status: 404,
        statusText: 'Not Found',
      });
    }

    // Responder com os dados atualizados do cliente
    return new NextResponse(JSON.stringify(updatedClient), {
      status: 200,
      statusText: 'OK',
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Lidar com erros do Prisma
    return handlePrismaError(error, 500, 'Internal Server Error');
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
   await prisma.client.delete({
      where: {
        id,
      },
    });

    return new NextResponse(null, {
      status: 204,
      statusText: 'No Content',
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return handlePrismaError(error, 404, 'Not Found');
  }
}