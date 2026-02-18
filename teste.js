require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.usuario.findMany()
  console.log(users)
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
