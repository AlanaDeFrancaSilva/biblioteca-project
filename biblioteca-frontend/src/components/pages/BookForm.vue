<template>
  <div class="book-form">
    <h1>Gerenciamento de Livros</h1>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
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

      <label for="image">Imagem</label>
      <input type="file" @change="handleImageUpload" id="image" />

      <button type="submit" :disabled="isSubmitting">{{ isEditing ? 'Atualizar' : 'Adicionar' }} Livro</button>
    </form>

    <h2>Lista de Livros</h2>
    <ul>
      <li v-for="book in books" :key="book._id">
        <div>
          <img v-if="book.image" :src="'http://localhost:5000' + book.image" alt="Imagem do livro" width="100" />
        </div>
        {{ book.title }} - {{ book.author }} ({{ book.rating }} estrelas) -
        <span>{{ book.available ? 'Disponível' : 'Indisponível' }}</span>
        <button @click="editBook(book)">Editar</button>
        <button @click="deleteBook(book._id)">Excluir</button>
      </li>
    </ul>

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
        image: null, // Adiciona a imagem ao estado
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
      this.errorMessage = '';

      const formData = new FormData();
      
      // Adiciona os dados do livro ao FormData
      formData.append('title', this.form.title);
      formData.append('author', this.form.author);
      formData.append('rating', this.form.rating);
      formData.append('available', this.form.available);
      
      // Se houver uma imagem, adicione ao FormData
      if (this.form.image) {
        formData.append('image', this.form.image);
      }

      // Logando o conteúdo do FormData para verificar o que está sendo enviado
      console.log("FormData enviado: ", formData);

      try {
        // Envia o FormData para a API
        if (this.isEditing) {
          await api.updateBook(this.editingId, formData);
        } else {
          await api.addBook(formData);
        }
        this.resetForm();
        await this.fetchBooks();  // Certifique-se de que a função de recarregar os livros é chamada
      } catch (error) {
        this.errorMessage = 'Erro ao salvar o livro. Tente novamente mais tarde.';
        console.error(error);
      } finally {
        this.isSubmitting = false;
      }
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.image = file; // Armazena a imagem no estado
      }
    },

    editBook(book) {
      this.form = { ...book };
      this.isEditing = true;
      this.editingId = book._id;
    },

    async deleteBook(id) {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        await api.deleteBook(id);
        await this.fetchBooks(); // Atualiza a lista após deletar
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
      this.form = { title: '', author: '', rating: 0, available: true, image: null };
      this.isEditing = false;
      this.editingId = null;
    },
  },

  mounted() {
    this.fetchBooks(); // Carrega a lista de livros ao montar o componente
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
