'use server'

import { z } from 'zod';
import { prisma } from './utils';

const updateClienteSchema = z.object({
  id: z.string().min(1), // O id do cliente a ser atualizado
  name: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  phone: z.string().min(2).max(100),
  excursao: z.string().min(2).max(100),
  sector: z.string().min(2).max(100),
  vacancy: z.string().min(2).max(100),
  observation: z.string().min(2).max(100),
});

export async function submitUpdateCliente(_: unknown, formData: FormData) {
  const formValues = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    city: formData.get("city") as string,
    phone: formData.get("phone") as string,
    excursao: formData.get("excursao") as string,
    sector: formData.get("sector") as string,
    vacancy: formData.get("vacancy") as string,
    observation: formData.get("observation") as string,
  };

  console.log(formValues, "29");
  

  try {
    // Verifica se o cliente existe
    const existingUser = await prisma.client.findUnique({
      where: {
        id: formValues.id,
      },
    });

    if (!existingUser) {
      return {
        success: false,
        message: "Usuário não encontrado",
      };
    }

    // Atualiza o cliente no banco de dados
    const updatedUser = await prisma.client.update({
      where: {
        id: formValues.id,
      },
      data: {
        name: formValues.name,
        city: formValues.city,
        phone: formValues.phone,
        excursao: formValues.excursao,
        sector: formValues.sector,
        vacancy: formValues.vacancy,
        observation: formValues.observation,
      },
    });

    // Retorna o formato esperado pela aplicação
    return {
      success: true,
      message: "Cliente atualizado com sucesso",
      newUser: updatedUser,  // Mudança para 'newUser'
    };
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);

    return {
      success: false,
      message: "Erro ao atualizar cliente. Tente novamente mais tarde.",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
