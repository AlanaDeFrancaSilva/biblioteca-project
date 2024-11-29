<template>
  <div class="book-form">
    
    <!-- Cabeçalho -->
    <header class="cabecalho">
      <div class="logo">
        <img src="@/assets/menu.png" alt="Menu" class="menu-icon" @click="toggleMenu">
        <img src="@/assets/logo.png" alt="Logo" class="logo-icon">
        <h1 class="title">Administrativo</h1>
      </div>
      <div class="cabecalho-direita">
        <div class="perfil-container" @click="toggleDropdown">
          <div class="perfil-circulo"></div>
          <div class="perfil-dropdown" v-if="showDropdown">
            <ul>
              <li @click="profile"><i class="icon-perfil"></i> Perfil</li>
              <li><i class="icon-config"></i> Configurações</li>
              <li @click="logout"><i class="icon-sair"></i> Sair</li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <!-- Layout dividido -->
    <div class="content">
      <!-- Seção para o formulário -->
      <div class="left-section">
        <h1>Gerenciamento de Livros</h1>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <!-- Formulário para adicionar/editar livros -->
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
      </div>

      <!-- Seção para a lista de livros -->
      <div class="right-section">
        <h2>Lista de Livros</h2>
        <ul>
          <li v-for="book in books" :key="book._id" class="book-item">
            <div class="book-image">
              <img :src="book.image ? `http://localhost:5000${book.image}` : ''" alt="Capa do livro" v-if="book.image" />
            </div>
            <div class="book-info">
              <div>{{ book.title }} - {{ book.author }} ({{ book.rating }} estrelas)</div>
              <span>{{ book.available ? 'Disponível' : 'Indisponível' }}</span>
              <button @click="editBook(book)">Editar</button>
              <button @click="deleteBook(book._id)">Excluir</button>
            </div>
          </li>
        </ul>
        <div v-if="isLoading">Carregando...</div>
      </div>
    </div>
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

    // Método para realizar o logout
    logout() {
      // Limpar o armazenamento local ou de sessão, caso você tenha um token de login armazenado
      localStorage.removeItem('auth_token');  // Se você estiver usando o localStorage

      // Depois de limpar os dados de sessão, redireciona para a página inicial
      this.$router.push('/'); // Redireciona para a HomePage
    },
    profile() {
      // redireciona para a página PerfilPage
      this.$router.push('/perfil');
    }
  },
  mounted() {
    this.fetchBooks(); // Carrega a lista de livros ao montar o componente
  },
};
</script>

<style scoped>
/* Cabeçalho */
.cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  color: black;
  padding: 15px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.logo {
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-left: 20px;
}

.logo img {
  height: 40px;
  margin-right: 30px;
}

.title {
  font-family: 'Noto Sans', sans-serif;
  font-size: 15px;
  font-weight: bold;
}

.perfil-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-right: 50px;
}

.perfil-circulo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333;
}

.perfil-dropdown {
  position: absolute;
  right: 0;
  top: 50px;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 150px;
  z-index: 1;
}

.perfil-dropdown ul {
  list-style-type: none;
  padding: 10px;
}

.perfil-dropdown li {
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.perfil-dropdown li:hover {
  background-color: #f1f1f1;
}

/* Layout principal */
.book-form {
  display: flex;
  flex-direction: column;
  margin-top: 70px; /* Espaço para o cabeçalho fixo */
}

.content {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

/* Seção do formulário */
.left-section {
  width: 30%;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  
  /* Usando vh para uma altura relativa ao tamanho da tela */
  height: 80vh;  /* 80% da altura da tela */
  max-height: 80vh;  /* Limitar a altura a 80% da altura da tela */
  
  overflow-y: auto;
}

form {
  margin-bottom: 20px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input,
form select,
form button {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}

/* Seção da lista de livros */
.right-section {
  width: 65%;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.book-image {
  margin-right: 15px;
}

.book-image img {
  width: 84px;
  height: 129px;
  object-fit: cover;
}

.book-info {
  flex-grow: 1;
}

.book-info div {
  font-weight: bold;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
}

/* Mensagem de erro */
.error-message {
  color: red;
  margin-bottom: 15px;
}

.is-loading {
  font-size: 16px;
  color: gray;
  text-align: center;
  margin-top: 20px;
}

</style>
