import { prisma } from '../lib/prisma.ts'

interface GetProfileProps {
  userId: string | undefined
}

export async function getProfile({ userId }: GetProfileProps) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  return {
    user,
  }
}
