import type { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma.ts'

export async function createLeed({
  name,
  description,
  userId,
}: Prisma.LeedCreateManyInput) {
  const leed = await prisma.leed.create({
    data: {
      name,
      description,
      userId,
    },
  })

  return {
    leed,
  }
}
