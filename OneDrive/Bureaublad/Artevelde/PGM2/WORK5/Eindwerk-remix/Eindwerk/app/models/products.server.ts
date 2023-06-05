import { Products } from "@prisma/client";
import { prisma } from "~/db.server";

async function getProductById(id: Products["id"]) {
  return await prisma.products.findUnique({ where: { id } });
}

async function getProductsByShopId(shopId: Products["shopId"]) {
  return await prisma.products.findMany({ where: { shopId } });
}

async function getAllProducts(): Promise<Products[]> {
  return await prisma.products.findMany();
}
