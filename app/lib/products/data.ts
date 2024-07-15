import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function fetchProducts() {
  return prisma.product.findMany();
}
