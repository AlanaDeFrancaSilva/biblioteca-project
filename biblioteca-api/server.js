const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Book = require('./models/Book');
const Loan = require('./models/Loan'); // Importando o modelo de Empréstimo
 
const userRoutes = require('./routes/userRoutes');  // Importando as rotas de usuários
const bookRoutes = require('./routes/bookRoutes');  // Certifique-se de que o caminho está correto


// Inicialização do app
const app = express();
 
// Configuração do CORS
app.use(cors());
 
// Para fazer o parsing do corpo das requisições em JSON
app.use(express.json());
 
// Configuração do Multer para upload de imagens
const upload = multer({
  dest: 'uploads/', // Diretório onde as imagens serão salvas localmente
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      cb(null, true); // Aceita o arquivo
    } else {
      cb(new Error('Apenas arquivos JPG, JPEG ou PNG são permitidos!'), false);
    }
  },
}).single('image'); // Espera um campo chamado "image"
 
// Servir arquivos estáticos da pasta 'uploads' (para acessar as imagens via URL)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 
// Conexão ao MongoDB
mongoose
  .connect(
    "mongodb+srv://teste:teste@library.qgzc0.mongodb.net/library",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
 
// Importação das rotas
const booksRoutes = require('./routes/bookRoutes');
 
// Definindo rotas para usuários, livros e perfil
app.use('/api/usuarios', userRoutes);  // As rotas CRUD e de login estão definidas em userRoutes.js
app.use('/api/livros', bookRoutes);    // Adicionando as rotas CRUD de livros

 
// Criar um endpoint para upload de livro (com imagem)
app.post('/api/livros', upload, async (req, res) => {
  try {
    // Verificando se a imagem foi recebida
    if (!req.file) {
      return res.status(400).json({ message: 'Imagem é obrigatória!' });
    }
 
    const { title, author, year, rating, available, description, genre, isbn  } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : ''; // Caminho relativo da imagem
 
    // Criar o objeto do livro
    const newBook = new Book({
      title,
      author,
      year,
      rating,
      available,
      image,
      description,  
      genre,
      isbn
    });
 
    // Salvar o livro no banco de dados
    await newBook.save(); // Salva o novo livro no banco
    res.status(201).json(newBook); // Retorna o livro criado
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar livro', error });
  }
});

// Exemplo de rota no servidor
app.get('/api/livros/count', async (req, res) => {
  try {
    const count = await Book.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).send("Erro ao obter contagem de livros");
  }
});

// Rota POST para registrar um empréstimo
app.post('/api/emprestimo', async (req, res) => {
  const { bookId, userId, dueDate } = req.body;

  if (!bookId || !userId || !dueDate) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
  }

  try {
    // Criando um novo empréstimo
    const novoEmprestimo = new Loan({
      bookId,
      userId,
      dueDate
    });

    // Salvando o empréstimo no banco de dados
    await novoEmprestimo.save();

    // Respondendo com sucesso
    res.status(201).json({ message: 'Empréstimo registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar empréstimo', error });
  }
});

// Rota para obter a contagem de livros por gênero
app.get('/api/livros/genres', async (req, res) => {
  try {
    const genres = await Book.aggregate([
      {
        $group: {
          _id: '$genre', // Agrupa por gênero
          count: { $sum: 1 } // Conta o número de livros por gênero
        }
      }
    ]);

    // Formatar a resposta para incluir 'genre' e 'count'
    const formattedGenres = genres.map(item => ({
      genre: item._id,
      count: item.count
    }));

    res.json({ genres: formattedGenres });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados de gêneros', error });
  }
});

// Rota para obter empréstimos por gênero
app.get('/api/emprestimos/por-genero', async (req, res) => {
  try {
    // Obtemos todos os empréstimos
    const loans = await Loan.find().populate('bookId');

    // Agrupa os empréstimos por gênero
    const genresCount = {};
    for (const loan of loans) {
      const book = loan.bookId; // Recupera o livro do empréstimo
      const genre = book.genre; // Acessa o gênero do livro

      if (genre) {
        // Conta os empréstimos por gênero
        genresCount[genre] = (genresCount[genre] || 0) + 1;
      }
    }

    // Prepara os dados de resposta
    const genres = Object.keys(genresCount);
    const count = genres.map(genre => genresCount[genre]);

    res.status(200).json({ genres, count });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter dados de empréstimos por gênero', error });
  }
});

// Definir a porta do servidor
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});