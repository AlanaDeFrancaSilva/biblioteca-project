const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Book = require('../models/Book');

// Configuração do Multer para salvar imagens no diretório 'uploads' (se necessário)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta de destino para imagens
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nome único para o arquivo
  }
});

const upload = multer({ storage: storage });

// Adicionar um novo livro com imagem
router.post('/', upload.single('image'), async (req, res) => {
  const { title, author, rating, available } = req.body; // Captura os campos
  const imagePath = req.file ? req.file.path : null; // Salva o caminho da imagem, caso exista

  // Converte `available` para booleano
  const availableBool = available === 'true'; // 'true' se torna true, 'false' se torna false

  console.log('Dados recebidos no backend:', req.body);

  if (!title || !author || !rating || availableBool === undefined) {
    return res.status(400).json({ message: 'Faltam dados obrigatórios.' });
  }

  try {
    const newBook = new Book({
      title,
      author,
      rating,
      available: availableBool, // Usando o valor booleano
      image: imagePath, // Armazena o caminho da imagem
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(400).json({ message: 'Erro ao criar livro', error: error.message });
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
