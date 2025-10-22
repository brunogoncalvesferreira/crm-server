import type { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma.ts'

export async function createUsersFn(data: Prisma.UserCreateInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (user) {
    throw new Error('Usuário já existe')
  }

  const passwordHash = await hash(data.password, 6)

  await prisma.user.create({
    data: {
      ...data,
      password: passwordHash,
    },
  })

  return {
    message: 'Cadastro realizado com sucesso.',
  }
}
