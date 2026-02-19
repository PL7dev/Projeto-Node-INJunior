const prisma = require('../utils/prisma')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body

    const user = await prisma.usuario.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' })
    }

    const senhaValida = await bcrypt.compare(senha, user.senha)

    if (!senhaValida) {
      return res.status(400).json({ error: 'Senha inválida' })
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Erro no login' })
  }
}
