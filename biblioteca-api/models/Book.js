const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  ano: { type: Number, required: true },
  genero: { type: String, required: true },
  disponivel: { type: Boolean, default: true }, // Para verificar se o livro está disponível
});

// Exportando o modelo
module.exports = mongoose.models.Book || mongoose.model('Book', livroSchema, 'books');
