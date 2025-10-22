import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { createLeedRoutes } from './routes/create-leed.ts'
import { createUsers } from './routes/create-users.ts'
import { getProfileRoutes } from './routes/get-profile.ts'
import { sessionsRoutes } from './routes/sessions.ts'

export const app = fastify()

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifyJwt, {
  secret: 'code-secret',
})

app.register(fastifyCookie)

app.register(createUsers)
app.register(createLeedRoutes)
app.register(sessionsRoutes)
app.register(getProfileRoutes)
