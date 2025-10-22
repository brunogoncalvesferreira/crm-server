import type { FastifyPluginCallback } from 'fastify'
import { createLeed } from '../functions/create-leed.ts'

export const createLeedRoutes: FastifyPluginCallback = app => {
  app.post('/leeds', async (request, reply) => {
    try {
      const { name, description, userId } = request.body as {
        name: string
        description: string
        userId: string
      }

      const { leed } = await createLeed({
        name,
        description,
        userId,
      })

      return reply.status(201).send({
        leed,
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
