import { Review } from "@prisma/client";
import { prisma } from "~/db.server";

async function getReviews(): Promise<Review[]> {
  return prisma.review.findMany();
}

async function getReviewsByProductId(productId: string): Promise<Review[]> {
  return prisma.review.findMany({
    where: {
      id: productId,
    },
  });
}

export async function createReviewForShop(body: { text: string, rating: number, shopId: string, productId: string }) {
  return prisma.review.create({
    data: body,
  });
}