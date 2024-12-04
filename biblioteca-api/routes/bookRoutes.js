const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Book = require('../models/Book');

// Configuração do Multer para salvar imagens no diretório 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta de destino para imagens
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nome único para o arquivo
  }
});

// Configuração do Multer para aceitar apenas arquivos de imagem com extensões .jpeg, .jpg, .png
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;  // Permite JPEG, JPG e PNG
    const mimetype = filetypes.test(file.mimetype); // Verifica o tipo MIME do arquivo

    if (mimetype) {
      return cb(null, true); // Aceita o arquivo
    } else {
      cb(new Error('Apenas imagens JPEG, JPG e PNG são permitidas.')); // Rejeita se não for uma imagem válida
    }
  }
});

// Rota para servir as imagens armazenadas na pasta 'uploads'
router.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Adicionar um novo livro com imagem (agora aceita multipart/form-data)
router.post('/', upload.single('image'), async (req, res) => {
  const { title, author, rating, available, description, genre, isbn } = req.body;
  const imagePath = req.file ? '/uploads/' + req.file.filename : null; // Salva o caminho relativo da imagem

  try {
    const newBook = new Book({
      title,
      author,
      rating,
      available,
      image: imagePath, // Armazena o caminho da imagem
      description,  // Campo de descrição
      genre,        // Campo de gênero
      isbn,  // Adicionando ISBN
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

// Atualizar um livro pelo ID
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, author, rating, available, description, genre, isbn  } = req.body;
  const imagePath = req.file ? '/uploads/' + req.file.filename : req.body.image; // Use imagem do corpo se não for nova

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, {
      title,
      author,
      rating,
      available,
      image: imagePath,  // Atualiza o campo de imagem também
      description,  // Atualizando descrição
      genre,        // Atualizando gênero
      isbn,  // Atualizando ISBN
    }, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(400).json({ message: 'Erro ao atualizar livro', error: error.message });
  }
});

// Deletar um livro pelo ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    
    if (!deletedBook) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    console.log('Livro excluído:', deletedBook); // Adicionando log para depuração
    res.status(200).json({ message: 'Livro excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
    res.status(400).json({ message: 'Erro ao excluir livro', error: error.message });
  }
});

module.exports = router;
