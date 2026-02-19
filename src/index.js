const express = require('express')

const app = express()

app.use(express.json())

const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

const postsRoutes = require('./routes/posts')
app.use('/posts', postsRoutes)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})