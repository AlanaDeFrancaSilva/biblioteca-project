const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');  // Importando as rotas de usuários
const bookRoutes = require('./routes/bookRoutes');  // Certifique-se de que o caminho está correto

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect('mongodb+srv://teste:teste@library.qgzc0.mongodb.net/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch((error) => console.error('Erro de conexão com o MongoDB:', error));

// Definindo rotas para usuários e livros
app.use('/api/usuarios', userRoutes);  // As rotas CRUD e de login estão definidas em userRoutes.js
app.use('/api/livros', bookRoutes);    // Adicionando as rotas CRUD de livros

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
