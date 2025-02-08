import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteClient(id: string) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}
