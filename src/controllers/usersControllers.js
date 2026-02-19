const prisma = require('../utils/prisma')

// Criação de usuário
exports.createUser = async (req, res) => {
  try {
    const { nome, email, senha, foto } = req.body

    const user = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        foto
      }
    })

    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
}

// Listagem de todos usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.usuario.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
}

// Busca usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.usuario.findUnique({
      where: { id: Number(id) }
    })

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' })
  }
}

// Atualização de usuário
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, email, senha, foto } = req.body

    const user = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nome, email, senha, foto }
    })

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' })
  }
}

// Deleta usuário
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.usuario.delete({
      where: { id: Number(id) }
    })

    res.json({ message: 'Usuário deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' })
  }
}

// Leitura de posts por usuário
exports.getPostsByUser = async (req, res) => {
  try {
    const { id } = req.params

    const posts = await prisma.post.findMany({
      where: {
        usuarioId: Number(id)
      }
    })

    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar posts do usuário' })
  }
}