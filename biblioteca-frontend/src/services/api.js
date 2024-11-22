import axios from 'axios';

// Criação da instância do Axios com configurações padrão
const api = axios.create({
  baseURL: 'http://localhost:5000/api/livros',
  headers: {
    // 'Content-Type': 'application/json', // Remova esse cabeçalho, o axios cuida disso
  },
});

// Funções de API para interagir com o backend
const getBooks = () => {
  return api.get('/');
};

const addBook = (bookData) => {
  return api.post('/', bookData); // `bookData` agora deve ser um FormData
};

const updateBook = (id, bookData) => {
  return api.put(`/${id}`, bookData);
};

const deleteBook = (id) => {
  return api.delete(`/${id}`);
};

export default {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};
