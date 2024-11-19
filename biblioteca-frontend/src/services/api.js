// src/services/api.js

import axios from 'axios';

// Criação da instância do Axios com configurações padrão
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funções de API para interagir com o backend
const getBooks = () => {
  return api.get('/livros');
};

const addBook = (bookData) => {
  return api.post('/livros', bookData);
};

const updateBook = (id, bookData) => {
  return api.put(`/livros/${id}`, bookData);
};

const deleteBook = (id) => {
  return api.delete(`/livros/${id}`);
};

// Exportando a instância do Axios configurada e as funções de API
export default {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};
