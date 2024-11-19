const mongoose = require('mongoose'); 

const bookSchema = new mongoose.Schema({ 
  title: { 
    type: String, 
    required: true 
  }, 
  author: { 
    type: String, 
    required: true 
  }, 
  rating: { 
    type: Number, 
    required: true, 
    min: 1,  // Avaliação mínima agora é 1
    max: 5   // Avaliação máxima é 5
  }, 
  available: { 
    type: Boolean, 
    required: true 
  }
});

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema, 'books');
