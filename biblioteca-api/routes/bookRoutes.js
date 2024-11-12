const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Certifique-se de que o caminho está correto

// Rota POST - Criar um novo livro
router.post('/', async (req, res) => {
  const { titulo, autor, ano, genero, disponivel } = req.body;
  const livro = new Book({ titulo, autor, ano, genero, disponivel });

  try {
    await livro.save();
    res.status(201).json(livro); // Retorna o livro criado com o status 201 (Criado)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar livro' }); // Caso ocorra erro, retorna o erro
  }
});

// Rota GET - Obter todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await Book.find(); // Retorna todos os livros
    res.status(200).json(livros); // Retorna os livros com o status 200 (OK)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter livros' }); // Retorna erro caso falhe
  }
});

// Rota GET - Obter um livro pelo ID
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Obtém o ID do livro da URL
  try {
    const livro = await Book.findById(id); // Encontra o livro pelo ID
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' }); // Caso não encontre o livro
    }
    res.status(200).json(livro); // Retorna o livro encontrado
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter livro' }); // Retorna erro em caso de falha
  }
});

// Rota PUT - Atualizar um livro
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano, genero, disponivel } = req.body;

  try {
    const livro = await Book.findByIdAndUpdate(id, { titulo, autor, ano, genero, disponivel }, { new: true });
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    res.status(200).json(livro); // Retorna o livro atualizado
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar livro' }); // Caso ocorra erro
  }
});

// Rota DELETE - Excluir um livro
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const livro = await Book.findByIdAndDelete(id);
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' }); // Caso não encontre o livro
    }
    res.status(200).json({ message: 'Livro excluído com sucesso' }); // Retorna sucesso na exclusão
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir livro' }); // Caso ocorra erro
  }
});

// Exportando as rotas para que sejam usadas no server.js
module.exports = router;
