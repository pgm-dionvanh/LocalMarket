import { Review } from "@prisma/client";
import { prisma } from "~/db.server";

async function getReviews(): Promise<Review[]> {
  return prisma.review.findMany();
}

async function getReviewsByProductId(productId: string): Promise<Review[]> {
  console.log(productId)
  return prisma.review.findMany({
    where: {
      id: productId,
    },
  });
}