import { Products } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getProductById(id: Products["id"]) {
  return await prisma.products.findUnique({ where: { id } });
}

export async function getProductsByShopId(shopId: Products["shopId"]) {
  return await prisma.products.findMany({ where: {
    shopId: shopId
  } });
}

async function getAllProducts(): Promise<Products[]> {
  return await prisma.products.findMany();
}

export async function createProduct(body: Products){
  console.log(body)
  return await prisma.products.create({
    data: body,
  });
}