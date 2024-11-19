const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Certifique-se de ter criado o modelo Book

// Adicionar um novo livro
router.post('/', async (req, res) => {
  console.log('Dados recebidos:', req.body);  // Log dos dados recebidos
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

// Atualizar um livro existente (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params; // ID do livro que será atualizado
  const { title, author, rating, available } = req.body; // Dados para atualização

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, {
      title,
      author,
      rating,
      available
    }, { new: true }); // O "new: true" retorna o livro atualizado

    if (!updatedBook) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(400).json({
      message: 'Erro ao atualizar livro',
      error: error.message,
    });
  }
});

// Deletar um livro (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // ID do livro que será deletado

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.status(200).json({ message: 'Livro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    res.status(400).json({
      message: 'Erro ao deletar livro',
      error: error.message,
    });
  }
});

module.exports = router;
