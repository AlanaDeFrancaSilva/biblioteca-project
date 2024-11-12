<template>
  <div class="bookform-container">
    <form @submit.prevent="handleSubmit">
      <input v-model="book.title" placeholder="Título" required />
      <input v-model="book.author" placeholder="Autor" required />
      <input v-model="book.year" placeholder="Ano" required />
      <button type="submit">{{ book._id ? 'Atualizar' : 'Adicionar' }}</button>
    </form>
  </div>
</template>

<script>
import api from '@/services/api'; // Importa o serviço API para fazer requisições

export default {
  props: ['bookToEdit'], // Recebe o livro a ser editado como uma prop
  data() {
    return {
      book: this.bookToEdit || { title: '', author: '', year: null }, // Inicializa os dados do livro
    };
  },
  watch: {
    bookToEdit: {
      immediate: true,
      handler(newVal) {
        this.book = newVal || { title: '', author: '', year: null }; // Atualiza os dados quando a prop mudar
      },
    },
  },
  methods: {
    handleSubmit() {
      if (this.book._id) {
        api.updateBook(this.book._id, this.book).then(() => {
          this.$emit('book-updated'); // Emite um evento quando o livro é atualizado
        });
      } else {
        api.addBook(this.book).then(() => {
          this.$emit('book-added'); // Emite um evento quando um novo livro é adicionado
        });
      }
    },
  },
};
</script>

<style scoped>
/* Estilo do contêiner do formulário */
.bookform-container {
  display: flex; /* Utiliza flexbox para layout */
  justify-content: center; /* Centraliza horizontalmente */
  align-items: flex-start; /* Alinha os itens ao topo */
  padding: 20px; /* Espaçamento ao redor do contêiner */
}

/* Estilo do formulário */
.book-form {
  display: flex; /* Utiliza flexbox para layout horizontal */
  align-items: center; /* Alinha os itens verticalmente no centro */
  gap: 10px; /* Espaço entre os campos */
}

/* Estilo de cada grupo de campo */
.form-group {
  display: flex; /* Permite o uso de flexbox */
  flex-direction: column; /* Organiza os elementos em coluna */
}

/* Estilo dos campos de entrada */
.book-title,
.book-author,
.book-year {
  padding: 8px; /* Espaçamento interno para conforto */
  border: 1px solid #ccc; /* Borda padrão */
  border-radius: 5px; /* Bordas arredondadas */
  font-size: 14px; /* Tamanho da fonte */
  width: 100px; /* Largura fixa para os campos */
}

/* Estilo do campo de entrada ao receber foco */
.book-title:focus,
.book-author:focus,
.book-year:focus {
  border-color: #28a745; /* Muda a cor da borda quando ativo */
}

/* Estilo do botão de envio */
.submit-button {
  background-color: #28a745; /* Cor de fundo verde */
  color: white; /* Cor do texto em branco */
  border: none; /* Sem borda */
  border-radius: 5px; /* Bordas arredondadas */
  padding: 8px 16px; /* Espaçamento interno */
  font-size: 14px; /* Tamanho da fonte */
  cursor: pointer; /* Muda o cursor para indicar que é clicável */
  transition: background-color 0.3s; /* Transição suave para a mudança de cor */
}

/* Estilo do botão ao passar o mouse */
.submit-button:hover {
  background-color: #218838; /* Cor de fundo mais escura ao passar o mouse */
}
</style>
