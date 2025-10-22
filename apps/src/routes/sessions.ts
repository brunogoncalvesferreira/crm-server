import type {
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import { sessions } from '../functions/sessions.ts'

export const sessionsRoutes: FastifyPluginCallback = app => {
  app.post(
    '/sessions',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { email, password } = request.body as {
          email: string
          password: string
        }

        const { user } = await sessions({
          email,
          password,
        })

        const payload = {
          id: user.id,
        }

        const token = await reply.jwtSign(payload, {
          sign: {
            sub: user.id,
            expiresIn: '7 days',
          },
        })

        reply.setCookie('token', token, {
          path: '/',
          secure: true,
          sameSite: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })

        return reply.status(200).send()
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
