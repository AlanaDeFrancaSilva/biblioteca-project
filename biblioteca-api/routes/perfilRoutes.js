const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Supondo que você tenha um modelo de usuário
const authMiddleware = require('../middleware/auth'); // Middleware para autenticação (verificar se o usuário está logado)

// Rota para obter os dados do perfil do usuário
router.get('/perfil', authMiddleware, async (req, res) => {
  try {
    // Supondo que você tenha um campo 'userId' armazenado no token JWT
    const userId = req.user.id;
    
    // Buscar o usuário no banco de dados pelo ID
    const user = await User.findById(userId).select('-senha'); // Excluir a senha da resposta
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(user); // Retorna os dados do usuário
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
