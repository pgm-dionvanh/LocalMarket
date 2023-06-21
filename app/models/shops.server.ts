import type { Shops } from "@prisma/client";
import { prisma } from "~/db.server";


export async function getShopById(id: Shops["id"]): Promise<Shops[]> {
  return prisma.shops.findUnique({ where: { id } });
}

export async function getShopByPostCode(postcode: Shops["postcode"], offset: number) {


  const [shops, count] = await prisma.$transaction([
    prisma.shops.findMany({
      where: { postcode },
      skip: offset
    }),
    prisma.shops.count({ where: {
      postcode: postcode
    } })
  ]);

  return {
    pagination: {
      total: count
    },
    data: shops
  };
}

export async function getShopsByCustomerId(customerId: string): Promise<Shops[]> {
  return prisma.shops.findMany({
    where: {
      ownerId: customerId,
    }
  })
}

export async function getAllShops(offset: number) {

  const [shops, count] = await prisma.$transaction([
    prisma.shops.findMany({
      skip: offset
    }),
    prisma.shops.count()
  ]);

  return {
    pagination: {
      total: count
    },
    data: shops
  };
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