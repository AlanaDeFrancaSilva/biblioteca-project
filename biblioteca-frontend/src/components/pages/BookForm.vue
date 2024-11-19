<template>
  <div class="book-form">
    <h1>Gerenciamento de Livros</h1>
    
    <!-- Exibir mensagem de erro caso haja algum erro -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <form @submit.prevent="handleSubmit">
      <label for="title">Título</label>
      <input v-model="form.title" id="title" required />

      <label for="author">Autor</label>
      <input v-model="form.author" id="author" required />

      <label for="rating">Avaliação</label>
      <StarRating :rating="form.rating" @update:rating="updateRating" />

      <label for="available">Disponibilidade</label>
      <select v-model="form.available" id="available">
        <option :value="true">Disponível</option>
        <option :value="false">Indisponível</option>
      </select>

      <button type="submit" :disabled="isSubmitting">{{ isEditing ? 'Atualizar' : 'Adicionar' }} Livro</button>
    </form>

    <h2>Lista de Livros</h2>
    <ul>
      <li v-for="book in books" :key="book._id">
        {{ book.title }} - {{ book.author }} ({{ book.rating }} estrelas) -
        <span>{{ book.available ? 'Disponível' : 'Indisponível' }}</span>
        <button @click="editBook(book)">Editar</button>
        <button @click="deleteBook(book._id)">Excluir</button>
      </li>
    </ul>

    <!-- Exibição do carregamento -->
    <div v-if="isLoading">Carregando...</div>
  </div>
</template>

<script>
import api from '@/services/api';
import StarRating from './StarRating.vue';

export default {
  components: {
    StarRating,
  },

  data() {
    return {
      books: [],
      form: {
        title: '',
        author: '',
        rating: 0,
        available: true,
      },
      isEditing: false,
      editingId: null,
      isLoading: false,
      isSubmitting: false,
      errorMessage: '',
    };
  },

  methods: {
    async fetchBooks() {
      this.isLoading = true;
      this.errorMessage = ''; // Reseta a mensagem de erro
      try {
        const response = await api.getBooks();
        this.books = response.data;
      } catch (error) {
        this.errorMessage = 'Erro ao carregar livros. Tente novamente mais tarde.';
      } finally {
        this.isLoading = false;
      }
    },

    async handleSubmit() {
      this.isSubmitting = true;
      this.errorMessage = ''; // Reseta a mensagem de erro
      try {
        if (this.isEditing) {
          await api.updateBook(this.editingId, this.form);
        } else {
          await api.addBook(this.form);
        }
        this.resetForm();
        this.fetchBooks();
      } catch (error) {
        this.errorMessage = 'Erro ao salvar o livro. Tente novamente mais tarde.';
      } finally {
        this.isSubmitting = false;
      }
    },

    editBook(book) {
      this.form = { ...book };
      this.isEditing = true;
      this.editingId = book._id;
    },

    async deleteBook(id) {
      this.isLoading = true;
      this.errorMessage = ''; // Reseta a mensagem de erro
      try {
        await api.deleteBook(id);
        this.fetchBooks();
      } catch (error) {
        this.errorMessage = 'Erro ao excluir o livro. Tente novamente mais tarde.';
      } finally {
        this.isLoading = false;
      }
    },

    updateRating(newRating) {
      this.form.rating = newRating;
    },

    resetForm() {
      this.form = { title: '', author: '', rating: 0, available: true };
      this.isEditing = false;
      this.editingId = null;
    },
  },

  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
.book-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

form {
  margin-bottom: 20px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input, form select, form button {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 10px;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}

button:disabled {
  background-color: #ccc;
}

.is-loading {
  font-size: 16px;
  color: gray;
  text-align: center;
  margin-top: 20px;
}
</style>
