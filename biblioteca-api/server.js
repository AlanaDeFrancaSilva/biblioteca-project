const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express(); // Inicialize a variável app aqui
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect('mongodb+srv://teste:teste@library.qgzc0.mongodb.net/library', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error(err));

// Definindo rotas
app.use('/api/usuarios', userRoutes);

// Definindo esquemas e rotas
const usuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    tipo: { type: String, enum: ['aluno', 'professor', 'bibliotecario'] }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Rotas CRUD para usuários
app.post('/api/usuarios', async (req, res) => {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.send(usuario);
});

app.get('/api/usuarios', async (req, res) => {
    const usuarios = await Usuario.find();
    res.send(usuarios);
});

app.put('/api/usuarios/:id', async (req, res) => {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(usuario);
});

app.delete('/api/usuarios/:id', async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.send({ message: 'Usuário deletado' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
