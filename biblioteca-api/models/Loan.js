const mongoose = require('mongoose');

const emprestimoSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loanDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },  // Data de devolução
  returnedDate: { type: Date },  // Data de devolução real, se retornado
});

module.exports = mongoose.models.Emprestimo || mongoose.model('Emprestimo', emprestimoSchema, 'loan');
