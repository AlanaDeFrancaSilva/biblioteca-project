const express = require('express');
const Loan = require('../models/Loan');
const Book = require('../models/Book');
const User = require('../models/User'); // Assumindo que você tem um modelo de usuário
const router = express.Router();

router.post('/emprestimo', async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    // Verifica se o livro está disponível
    const book = await Book.findById(bookId);
    if (!book || !book.available) {
      return res.status(400).json({ message: 'Livro não disponível para empréstimo' });
    }

    // Verifica se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Calcula a data de devolução como 7 dias após a data atual
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7); // Define a data de devolução como 7 dias após hoje

    // Registra o empréstimo
    const loan = new Loan({
      book: bookId,
      user: userId,
      dueDate: dueDate,  // A data de devolução será agora 7 dias à frente
    });

    // Atualiza a disponibilidade do livro
    book.available = false;
    await book.save();

    await loan.save();
    res.status(200).json({ message: 'Empréstimo registrado com sucesso!', loan });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar empréstimo', error });
  }
});

module.exports = router;
