<template>
  <div class="container">
    <!-- Cabeçalho -->
    <header class="cabecalho">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo Mange Library" />
      </div>
      <nav>
        <ul>
          <li><router-link to="/livros">Livros</router-link></li>
          <li><router-link to="/noticias">Notícias</router-link></li>
          <li><router-link to="/sobre">Sobre</router-link></li>
          <li><a href="https://transparencia.sp.senai.br/sac" target="_blank">Fale Conosco</a></li>
        </ul>
      </nav>
      <!-- Barra de pesquisa e Perfil do usuário -->
      <div class="cabecalho-direita">
        <div class="barra-pesquisa">
          <input type="text" placeholder="Pesquisar..." id="pesquisa-input" @keypress.enter="handleSearch" />
        </div>
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

    <!-- Conteúdo principal -->
    <div class="conteudo-principal">
      <!-- Filtros -->
      <div class="filtros">
        <div class="filtro1">
          <h4>Mostrar Apenas</h4>
          <label><input type="checkbox" value="Disponiveis" /> Livros Disponíveis</label>
          <label><input type="checkbox" value="Mais Procurados" /> Mais Procurados</label>
          <label><input type="checkbox" value="PDFs" /> PDFs</label>
        </div>
        <div class="filtro2">
          <h4>Gênero</h4>
          <label><input type="checkbox" value="Administracao" v-model="selectedGenres" /> Administração</label>
          <label><input type="checkbox" value="Artes" v-model="selectedGenres" /> Artes</label>
          <label><input type="checkbox" value="Computacao" v-model="selectedGenres" /> Computação</label>
          <label><input type="checkbox" value="Educacao" v-model="selectedGenres" /> Educação</label>
          <label><input type="checkbox" value="EsporteLazer" v-model="selectedGenres" /> Esporte e Lazer</label>
          <label><input type="checkbox" value="Fantasia" v-model="selectedGenres" /> Fantasia, Horror e...</label>
          <label><input type="checkbox" value="Infantil" v-model="selectedGenres" /> Infantil</label>
          <label><input type="checkbox" value="Romance" v-model="selectedGenres" /> Romance</label>
        </div>
        <div class="filtro3">
          <h4>Idioma</h4>
          <label><input type="checkbox" name="idioma" value="Portugues" /> Português</label>
          <label><input type="checkbox" name="idioma" value="Ingles" /> Inglês</label>
          <label><input type="checkbox" name="idioma" value="Espanhol" /> Espanhol</label>
          <label><input type="checkbox" name="idioma" value="Italiano" /> Italiano</label>
        </div>
      </div>

      <!-- Livros enfileirados -->
      <section class="livros">
        <div class="livro" v-for="(livro, index) in filteredBooks" :key="index">
          <img :src="livro.image ? `http://localhost:5000${livro.image}` : ''" :alt="livro.title" />
          <div class="descricao">
            <star-rating 
            :rating="livro.rating || 0" 
            :totalStars="5" 
            @update:rating="updateRating(livro, $event)" 
            />            
            <div class="titulo">{{ livro.title }}</div>
            <div class="autor">Autor: {{ livro.author }}</div>
            <div class="disponibilidade">Disponível: {{ livro.available ? 'Sim' : 'Não' }}</div>
          </div>
        </div>
      </section>
    </div>

    <!-- Rodapé -->
    <footer>
        <div class="footer-esquerda">
          <img src="@/assets/mundo.png" alt="Português (Brasil)" />
          <p>Português (Brasil)</p>
        </div>
        <div class="footer-centro">
          <p>© 2024 Todos os direitos reservados, Mange Library ®</p>
        </div>
        <div class="footer-direita">
          <a href="https://www.facebook.com/SENAI.R.Mange/?locale=pt_BR" target="_blank">
            <img src="@/assets/facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com/school/escola-senai-roberto-mange/posts/?feedView=all" target="_blank">
            <img src="@/assets/linkedin.png" alt="LinkedIn" />
          </a>
          <a href="https://www.youtube.com/@senaisaopaulo-senairoberto8729" target="_blank">
            <img src="@/assets/youtube.png" alt="YouTube" />
          </a>
          <a href="https://www.instagram.com/senaimange/" target="_blank">
            <img src="@/assets/instagram.png" alt="Instagram" />
          </a>
        </div>
      </footer>
    </div>
  </template>

<script>
import api from '@/services/api'; // Certifique-se de que o serviço da API está correto
// Importando o componente de estrelas
import StarRating from '@/components/pages/StarRating.vue';

export default {
  data() {
    return {
      books: [],
      selectedGenres: [], // Gêneros selecionados
      showDropdown: false,
      isLoading: false,
      errorMessage: '',
      available: false, // Filtro para 'Livros Disponíveis'
      mostPopular: false, // Filtro para 'Mais Procurados'
      pdfs: false, // Filtro para 'PDFs'
    };
  },

  components: {
    StarRating,
  },

  computed: {
  filteredBooks() {
    let filtered = this.books;

    // Filtro de gênero
    if (this.selectedGenres.length > 0) {
      filtered = filtered.filter((livro) => {
        return livro.genre && this.selectedGenres.some(genre => livro.genre.includes(genre));      });
    }

    // Filtro de livros disponíveis
    if (this.available) {
      filtered = filtered.filter((livro) => livro.available);
    }

    // Filtro de mais procurados
    if (this.mostPopular) {
      filtered = filtered.filter((livro) => livro.popularity > 0); // Ajuste conforme a lógica
    }

    // Filtro de PDFs
    if (this.pdfs) {
      filtered = filtered.filter((livro) => livro.isPdf); // Ajuste conforme sua lógica
    }

    return filtered;
  }
},

  methods: {
    async fetchBooks() {
      this.isLoading = true;
      this.errorMessage = ''; // Reseta a mensagem de erro
      try {
        const response = await api.getBooks(); // Método para pegar os livros da API
        this.books = response.data;
        console.log(this.books); // Verifique a estrutura dos livros
        // Verifique se o rating está presente em todos os livros
        this.books.forEach(book => {
          console.log(`Rating for ${book.title}:`, book.rating);
        });
      } catch (error) {
        this.errorMessage = 'Erro ao carregar livros. Tente novamente mais tarde.';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async updateRating(livro, newRating) {
      try {
        await api.updateBookRating(livro.id, newRating); // Assuming you have an API for this
        livro.rating = newRating;
      } catch (error) {
        console.error('Error updating rating:', error);
      }
    },

    handleSearch(event) {
      // Lógica para lidar com a pesquisa (implementação simples)
      const query = event.target.value.toLowerCase();
      this.books = this.books.filter((book) =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
      );
    },

    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },

    profile() {
      // Implementar navegação para a página de perfil
      console.log('Acessando perfil...');
    },

    logout() {
      // Lógica para logout do usuário
      console.log('Logout realizado...');
    },
  },

  mounted() {
    this.fetchBooks(); // Carrega a lista de livros ao montar o componente
  },

  setRating(star) {
    this.$emit('update:rating', star);
  },

  watch: {
  rating(newRating) {
    console.log('Atualização do rating:', newRating); // Verifique se o rating é alterado corretamente
  }
}
  
};
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9; /* Cor de fundo mais suave */
    color: #333; /* Cor de texto padrão */
    font-size: 14px; /* Reduzido de 16px para 14px */
}

/* Cabeçalho e Rodapé */
.cabecalho, footer {
    border: 1px solid #ddd; /* Cor da borda */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra */
}

.cabecalho {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9; /* cor para o cabeçalho */
    color: black; /* Cor do texto no cabeçalho */
    padding: 15px 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    font-size: 14px; /* Ajustado para um tamanho menor */
}

footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9; /* cor fundo para o rodapé */
    color: black;
    padding: 15px 20px;
    width: 100%;
    clear: both; /* Adiciona essa linha para garantir que o rodapé fique abaixo do conteúdo */
}

/* Estilo do botão de login */
.btn-login {
    border: none; /* Aumentado para 4px */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra */
    background-color: #ffffff; /* Cor de fundo mais suave */
    font-size: 12px; /* Reduzido para 12px */
    color: #000000; /* Cor do texto */
    border-radius: 5px;
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.3s;
    text-decoration: none; /* Remove a sublinhado do link */
}

/* Ajusta o botão Entrar para ficar mais escuro no hover */
.btn-login:hover {
    background-color: #c5c5c5; /* Cor de fundo mais escura */
}

/* Estilização do botão Criar uma conta */
.btn-signup {
    background-color: #F4271C; /* Cor de fundo vermelha */
    color: #ffffff; /* Cor do texto branca */
    border: none;
    border-radius: 5px;
    padding: 8px 12px; /* Ajustado para diminuir o padding */
    margin-left: 10px;
    cursor: pointer;
    font-size: 12px; /* Reduzido para 12px */
    transition: background-color 0.3s;
    text-decoration: none; /* Remove a sublinhado do link */
}

/* Efeito hover do botão Criar uma conta */
.btn-signup:hover {
    background-color: #C3201F; /* Cor de fundo mais escura */
}

/* Estilo da logo */
.logo img {
    height: 40px; /* Aumenta a altura da logo */
}

/* Espaçamento do menu de navegação */
nav {
    margin-left: 20px; /* Adiciona espaço entre logo e menu */
}

nav ul {
    display: flex; /* Exibe os itens em linha */
    list-style: none; /* Remove os marcadores padrão da lista */
}

nav ul li {
    margin-right: 30px; /* Aumenta o espaço à direita de cada item do menu */
}

nav ul li a {
    color: black; /* Cor do texto do menu */
    text-decoration: none; /* Remove o sublinhado dos links */
    font-size: 14px; /* Reduzido para 14px */
    transition: color 0.3s; /* Transição suave para mudança de cor ao passar o mouse */
}

nav ul li a:hover {
    color: #ecf0f1; /* Cor mais clara no hover */
}

/* Estilo da barra de pesquisa */
.barra-pesquisa {
    margin: 0 20px; /* Espaço em volta da barra de pesquisa */
}

.barra-pesquisa input {
    padding: 8px; /* Ajustado para diminuir o padding */
    border: 1px solid #ddd; /* Borda da barra de pesquisa */
    border-radius: 5px; /* Bordas arredondadas */
    font-size: 14px; /* Reduzido para 14px */
    width: 600px; /* Largura da barra de pesquisa */
    transition: border-color 0.3s; /* Efeito de transição */
}

.barra-pesquisa input:focus {
    border-color: #F4271C; /* Cor da borda ao focar */
    outline: none; /* Remove o contorno padrão do navegador */
}

.btn-pesquisar:hover {
    background-color: #C3201F; /* Cor do botão no hover */
}

/* Contêiner para os botões de autenticação */
.botoes-autenticacao {
    display: flex; /* Usar flexbox para layout flexível */
    align-items: center; /* Alinha os botões verticalmente ao centro */
}

/* Estilização para o conteúdo do lado direito do cabeçalho */
.cabecalho-direita {
    display: flex;
    align-items: center;
}

/* Estilização do perfil */
.perfil-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
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

.propaganda img {
    width: 100%;
    max-width: 900px; /* Ajusta a largura máxima da propaganda */
    max-height: 400px; /* Ajusta a altura máxima da propaganda */
    object-fit: cover;
    border-radius: 8px; /* Bordas arredondadas */
    margin: 0 auto; /* Centraliza a propaganda */
}

/* Livros */
.livros {
    display: flex;
    justify-content: space-between; /* Garante espaço entre os livros */
    margin: 20px auto;
    max-width: 85%;
    flex-wrap: wrap; /* Permite que os livros se organizem em várias linhas */
    gap: 10px; /* Diminui o espaço entre os livros */
}

.livro {
    flex-basis: calc(20% - 10px); /* Diminui o tamanho das caixas e ainda garante 5 livros por linha */
    background-color: white;
    padding: 8px; /* Diminui o padding */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Reduz a sombra */
    text-align: center;
    border-radius: 6px;
    transition: transform 0.3s;
}

.livro:hover {
    transform: scale(1.03); /* Efeito de zoom ao passar o mouse */
}

.livro img {
    width: 60%; /* Diminui a largura da imagem */
    height: auto; /* Mantém a proporção */
    border-radius: 6px;
    margin-bottom: 6px; /* Diminui a margem inferior */
}

.titulo {
    font-weight: bold;
    margin: 4px 0;
    font-size: 13px; /* Diminui o tamanho do título */
}

.autor,
.disponibilidade {
    font-size: 11px; /* Diminui o tamanho do texto */
    color: #555;
}

/* Barra de pesquisa */
.barra-pesquisa input {
  padding: 8px;
  width: 200px;
  margin-right: 20px;
}

/* Rodapé */
.footer-esquerda {
    display: flex;
    align-items: center;
}

.footer-esquerda img {
    height: 20px; /* Define a altura das imagens para 25 pixels */
    margin-right: 10px; /* Adiciona uma margem de 10 pixels à direita das imagens */
}

.footer-centro {
    text-align: center;
    flex-grow: 1;
}

.footer-direita {
    display: flex;
    justify-content: space-around;
    width: 110px; /* Largura da .footer-direita */
    gap: 0.5px; /* Espaçamento de 5px entre as imagens */
    overflow: visible; /* Como o conteúdo deve ser tratado quando ultrapassa a largura da página */
}

.footer-direita img {
    height: 20px; /* Define a altura das imagens */
    margin: 0 5px; /* Adiciona um espaçamento de 5px à esquerda e à direita das imagens */
}

/* Estrutura Principal */
.conteudo-principal {
    display: flex; /* Flexbox para organizar os filtros e a lista de livros */
    justify-content: flex-start; /* Alinha os itens no início */
}

/* Contêiner de filtros */
.filtros {
    width: 25%; /* Largura dos filtros */
    padding: 0; /* Remover padding interno */
    margin-right: 10px; /* Espaço à direita */
    margin-top: 20px; /* Espaço acima dos filtros */
    margin-left: 20px; /* Adiciona espaço à esquerda dos filtros */
    display: flex;
    flex-direction: column; /* Filtros empilhados verticalmente */
    align-items: flex-start; /* Alinha os filtros à esquerda */
    gap: 10px; /* Espaço entre os filtros */
}

.filtros > div {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra para os filtros */
    border: 1px solid #ddd; /* Borda individual */
    border-radius: 5px; /* Bordas arredondadas */
    padding: 10px; /* Espaçamento interno */
    width: 100%; /* Largura ocupando todo o espaço disponível */
}

/* Estilos para os rótulos */
label {
    display: block; /* Garante que cada label fique em uma nova linha */
    margin: 5px 0; /* Espaço entre as labels */
    text-align: left; /* Alinha o texto à esquerda */
}

/*star*/
.star-rating {
  font-size: 30px; /* Ajuste o tamanho das estrelas */
  cursor: pointer;
  display: flex; /* Para alinhar as estrelas na mesma linha */
  justify-content: center; /* Centraliza as estrelas */
}

.star {
  color: #ccc;
  transition: color 0.3s;
}

.star.filled {
  color: #f5a623;
}
</style>
