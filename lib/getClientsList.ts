import { prisma } from "./utils";

export async function updateClientsList () {
  const updatedUsers = await prisma.client.findMany();
  return updateClientsList;
};
