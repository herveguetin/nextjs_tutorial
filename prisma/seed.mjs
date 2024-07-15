import { PrismaClient } from '@prisma/client'
import { products } from '../app/lib/products/placeholder-data.js'

const prisma = new PrismaClient()

products.map(async (product) => {
  await prisma.Product.create({
    data: {
      name: product.name,
      sku: product.sku,
      price: product.price,
      image: product.image
    },
  })
})
