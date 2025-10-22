import type { FastifyPluginCallback } from 'fastify'
import { createUsersFn } from '../functions/create-users.ts'

export const createUsers: FastifyPluginCallback = app => {
  app.post('/users', async (request, reply) => {
    try {
      const { name, email, password } = request.body as {
        name: string
        email: string
        password: string
      }

      const { message } = await createUsersFn({
        name,
        email,
        password,
      })

      return reply.status(201).send({
        message,
      })
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({
          message: error.message,
        })
      }
    }
  })
}
