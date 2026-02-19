const prisma = require('../utils/prisma')

// Criação de post
exports.createPost = async (req, res) => {
  try {
    const { titulo, conteudo, usuarioId } = req.body

    const post = await prisma.post.create({
      data: {
        titulo,
        conteudo,
        usuarioId
      }
    })

    res.status(201).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Leitura de todos os posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Leitura de um post
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params

    const post = await prisma.post.findUnique({
      where: { id: Number(id) }
    })

    res.json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Atualização de post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { titulo, conteudo } = req.body

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { titulo, conteudo }
    })

    res.json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Deleta post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.post.delete({
      where: { id: Number(id) }
    })

    res.json({ message: "Post deletado com sucesso" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
