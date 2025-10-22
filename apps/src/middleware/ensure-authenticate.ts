import type { FastifyReply, FastifyRequest } from 'fastify'

export async function ensureAuthenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify()
  } catch (error) {
    if (error) {
      return reply.status(401).send({
        message: 'Unauthorized',
      })
    }
  }
}
