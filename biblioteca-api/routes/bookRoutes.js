const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Certifique-se de ter criado o modelo Book

// Adicionar um novo livro
router.post('/', async (req, res) => {
  const { title, author, rating, available } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      rating,
      available,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Erro ao criar livro:', error); // Registra o erro no console
    res.status(400).json({
      message: 'Erro ao criar livro',
      error: error.message, // Inclui a mensagem detalhada no erro retornado
    });
  }
});

// Buscar todos os livros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar livros', error });
  }
});

module.exports = router;
