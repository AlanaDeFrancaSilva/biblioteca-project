import axios from 'axios'; // Importa Axios para requisição HTTP

// Cria instâcia do Axios com URL base da API
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api/booksRoutes', // URL da API
    headers: {
        'Content-Type': 'application/json', // Define JSON como tipo de conteúdo
    },
});

// Expota função CRUD usando Axios
export default{
    getBooks(){
        return apiClient.get('/'); // GET para listar os livros 
    },
    addBook(book){
        return apiClient.post('/', book); // POST para adicionar livro
    },
    updateBook(id, book){
        return apiClient.put(`/${id}`, book); // PUT para atualizar livro pelo ID
    },
    deleteBook(id){
        return apiClient.delete(`/${id}`); // DELETE para excluir livro pelo ID
    }
}