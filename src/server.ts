import Fastify from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import usersRoutes from './routes/users.routes'
import fastifyJwt from '@fastify/jwt'
import authRoutes from './routes/auth.routes'

dotenv.config()

const app = Fastify({
  logger: true
})

async function start() {
  try {
    await app.register(cors, { origin: true })
    await app.register(fastifyJwt, {
      secret: process.env.JWT_SECRET || 'supersecret'
    })
    await app.register(authRoutes, { prefix: '/auth' })
    
    app.get('/', async () => {
      return { message: 'API rodando 🚀' }
    })

    const PORT = Number(process.env.PORT) || 3000
    app.register(usersRoutes, { prefix: '/users' })
    await app.listen({ port: PORT, host: '0.0.0.0' })

    console.log(`Servidor rodando na porta ${PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()