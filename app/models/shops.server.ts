import type { Shops } from "@prisma/client";
import { prisma } from "~/db.server";


export async function getShopById(id: Shops["id"]): Promise<Shops[]> {
  return prisma.shops.findUnique({ where: { id } });
}

export async function getShopByPostCode(postcode: Shops["postcode"]) {
  return prisma.shops.findMany({ where: { postcode } });
}

export async function getAllShops(): Promise<Shops[]> {

  return prisma.shops.findMany();
}

export async function createShop(body: Shops) {
  const shopExists = await checkIfShopExists(body.name);

  if(shopExists) {
    throw new Error("Shop already exists");
  }
  
  return prisma.shops.create({
    data: body,
  });
}

async function deleteShop(id: Shops["id"]) {
  return prisma.shops.delete({ where: { id } });
}

async function checkIfShopExists(name: Shops["name"]) {
  return prisma.shops.findFirst({ where: { name: name } });
}