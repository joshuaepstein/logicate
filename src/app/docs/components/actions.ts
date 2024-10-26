"use server"

import { prisma } from "@/database"

export async function fetchViews(slug: string) {
  return (
    (await prisma.documentationPage.findUnique({
      where: {
        slug,
      },
      select: {
        views: true,
      },
    })) ?? { views: 0 }
  )
}

export async function incrementViews(slug: string) {
  await prisma.documentationPage.update({
    where: { slug },
    data: { views: { increment: 1 } },
  })
}

export async function fetchReviews(slug: string) {
  return await prisma.documentationReview.findMany({
    where: { documentationSlug: slug },
  })
}

export async function createReview(slug: string, helpful: boolean, userId: string) {
  await prisma.documentationReview.create({
    data: { documentationSlug: slug, helpful, createdBy: userId },
  })
}
