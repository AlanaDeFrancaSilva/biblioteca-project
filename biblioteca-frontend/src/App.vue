<template>
  <div id="app">
    <BookForm :bookToEdit="bookToEdit" @book-added="fetchBooks" @book-updated="fetchBooks" />
    <BookList @edit-book="setBookToEdit" ref="bookList" />
  </div>
</template>

<script>
import BookList from './components/pages/BookList.vue';
import BookForm from './components/pages/BookForm.vue';

export default {
  data() {
    return {
      bookToEdit: null, // Estado do livro a ser editado
    };
  },
  components: {
    BookList,
    BookForm,
  },
  methods: {
    setBookToEdit(book) {
      this.bookToEdit = book; // Define o livro a ser editado
    },
    fetchBooks() {
      this.$refs.bookList.fetchBooks(); // Atualiza a lista de livros
      this.bookToEdit = null; // Limpa o formulário após a ação
    },
  },
};
</script>