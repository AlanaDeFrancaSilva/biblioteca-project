const mongoose = require('mongoose'); 

const bookSchema = new mongoose.Schema({ 
  title: { type: String, required: true }, 
  author: { type: String, required: true }, 
  rating: { type: Number, required: true, min: 0, max: 5 }, 
  available: { type: Boolean, required: true }, 

}); 

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema, 'books'); 