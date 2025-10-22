import type { FastifyPluginCallback } from 'fastify'
import { getProfile } from '../functions/get-profile.ts'
import { ensureAuthenticate } from '../middleware/ensure-authenticate.ts'

export const getProfileRoutes: FastifyPluginCallback = app => {
  app.get(
    '/me',
    { onRequest: [ensureAuthenticate] },
    async (request, reply) => {
      try {
        const { userId } = request.user as { userId: string }

        console.log(userId)

        const { user } = await getProfile({
          userId,
        })

        return reply.status(200).send({
          user,
        })
      } catch (error) {
        if (error instanceof Error) {
          return reply.status(400).send({
            message: error.message,
          })
        }
      }
    }
  )
}
