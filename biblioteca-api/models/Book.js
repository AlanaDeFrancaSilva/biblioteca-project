const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  available: { type: Boolean, required: true },
  image: { type: String },
  description: { type: String },
  genre: {
    type: String,
    enum: [
      'Administração', 
      'Artes', 
      'Computação', 
      'Educação', 
      'Esporte e Lazer', 
      'Fantasia, Horror e Ficção científica', 
      'Infantil', 
      'Romance'
    ],
    required: true
  },
  isbn: { 
    type: String,
    required: true,
    match: /^[0-9]{10,13}$/,  // Validação: Apenas números, com 10 a 13 dígitos
    unique: true  // Garantir que o ISBN seja único
  }
});

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema, 'books');
