import { compare } from 'bcryptjs'
import { prisma } from '../lib/prisma.ts'

interface SessionsProps {
  email: string
  password: string
}

export async function sessions({ email, password }: SessionsProps) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new Error('Usuário não encontrado')
  }

  const passwordMatch = compare(password, user.password)

  if (!passwordMatch) {
    throw new Error('Senha incorreta')
  }

  return {
    user,
  }
}
