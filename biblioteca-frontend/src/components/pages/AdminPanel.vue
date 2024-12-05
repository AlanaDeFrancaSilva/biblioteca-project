<template>
  <div class="admin-panel">

    <head>
      <!-- Link para o Google Fonts -->
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet">
    </head>    
    
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

    <!-- Corpo -->
    <div class="main-content">

      <!-- Caixa principal com barra de pesquisa e botões -->
      <div class="main-box">
        <input type="text" placeholder="Pesquisar..." class="search-bar">
        <div class="action-circles">
          <div class="circle new-book" @click="goToBookForm">
            <img src="@/assets/addition.png" alt="Novo livro">
            <p>Novo Livro</p>
          </div>
          <div class="circle users">
            <img src="@/assets/users.png" alt="Usuários">
            <p>Usuários</p>
          </div>
          <div class="circle reports">
            <img src="@/assets/report.png" alt="Relatórios">
            <p>Relatórios</p>
          </div>
        </div>
      </div>

      <!-- Mini Dashboard -->
      <div class="mini-dashboard">
        <div class="book-count">
          <h3>Livros</h3>
          <p>{{ bookCount }} unidades</p>
        </div>
        <div class="chart">Gráfico de livros</div>
        <div class="popular-books">
          <h3>Livros Mais Procurados</h3>
          <ul>
            <li>
              <img src="@/assets/livro1.png" alt="Livro 1">
              <p>Livro 1 - <span>Disponível</span></p>
            </li>
            <li>
              <img src="@/assets/livro2.png" alt="Livro 2">
              <p>Livro 2 - <span>Indisponível</span></p>
            </li>
          </ul>
        </div>
        <div class="task-list">Checklist de Tarefas</div>
        <div class="calendar">
          <div class="calendar-header">
            <img src="@/assets/left-arrow.png" @click="previousMonth" alt="Mês Anterior" />
            <h3>{{ currentMonthName }} {{ currentYear }}</h3>
            <img src="@/assets/right-arrow.png" @click="nextMonth" alt="Próximo Mês" />
          </div>
          <div class="calendar-grid">
            <div class="calendar-day" v-for="day in daysInMonth" :key="day.date" @click="markDay(day)">
              <span :class="{ marked: day.marked }">{{ day.date.getDate() }}</span>
            </div>
          </div>
        </div>
      </div>

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
//import axios from "axios";  // Importe o axios

export default {
  data() {
    return {
      bookCount: 0, // Contagem dos livros
      showDropdown: false, // Controla a exibição do dropdown de perfil
      showMenu: false, // Controla a exibição do menu lateral
      currentMonth: new Date().getMonth(), // Mês atual
      currentYear: new Date().getFullYear(), // Ano atual
      daysInMonth: [], // Armazena os dias do mês
    };
  },
  computed: {
    // Computa o nome do mês atual
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString("pt-BR", {
        month: "long",
      });
    },
  },
  methods: {
    // Método para buscar a contagem de livros do banco de dados
    async fetchBookCount() {
      try {
        const response = await fetch('http://localhost:5000/api/livros/count'); // Usando fetch (ou axios se configurado)
        const data = await response.json();
        
        if (data && data.count !== undefined) {
          this.bookCount = data.count; // Atualiza o valor de bookCount com a contagem
        } else {
            console.error('Contagem de livros não encontrada');
        }
      } catch (error) {
          console.error("Erro ao buscar contagem de livros:", error);
      }
    },

    // Alterna a visibilidade do dropdown de perfil
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    
    // Alterna a visibilidade do menu lateral
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    // Carrega os dias do mês para exibição no calendário
    loadDays() {
      this.daysInMonth = [];
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        this.daysInMonth.push({
          date: new Date(this.currentYear, this.currentMonth, day),
          marked: false, // Define se o dia está marcado
        });
      }
    },

    // Navega para o mês anterior no calendário
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.loadDays();
    },

    // Navega para o próximo mês no calendário
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.loadDays();
    },

    // Marca ou desmarca um dia no calendário
    markDay(day) {
      day.marked = !day.marked;
    },

    // Navega para a página de formulário de livro
    goToBookForm() {
      this.$router.push('/bookForm'); // Navega para a página /book-form
    },

    // Método para realizar o logout
    logout() {
      // Limpar o armazenamento local ou de sessão, caso você tenha um token de login armazenado
      localStorage.removeItem('auth_token');  // Se você estiver usando o localStorage

      // Depois de limpar os dados de sessão, redireciona para a página inicial
      this.$router.push('/'); // Redireciona para a HomePage
    },

    // Método para redirecionar ao perfil do usuário
    profile() {
      this.$router.push('/PerfilPage');
    }
  },
  mounted() {
    // Carrega os dias ao montar o componente
    this.loadDays();
    
    // Chama o método para obter a contagem de livros
    this.fetchBookCount();
    
    // Atualiza a contagem de livros a cada 10 segundos
    setInterval(() => {
      this.fetchBookCount();
    }, 10000);
  },
};
</script>


<style scoped>
body {
  font-family: 'Noto Sans', sans-serif;
}

body, html {
  height: 100%; /* Assegura que o body ocupe toda a altura da tela */
  margin: 0; /* Remove margens padrão */
}

/* Cabeçalho */
.cabecalho {
  display: flex;
  justify-content: space-between;  /* Espaça o conteúdo de logo e perfil */
  align-items: center;  /* Alinha verticalmente */
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

/* Logo */
.logo {
  display: flex;
  align-items: center;
  flex-grow: 1;  /* Faz a logo ocupar o máximo de espaço disponível */
  margin-left: 20px;  /* Move o conteúdo da logo um pouco para a direita */
}

.logo img {
  height: 40px;
  margin-right: 30px;
}

.title {
  font-family: 'Noto Sans', sans-serif; /* Aplica a fonte Noto Sans */
  font-size: 15px; /* Tamanho da fonte ajustado */
  font-weight: bold;
  margin-left: 0px;
}

/* Perfil */
.perfil-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-right: 50px; /* Ajuste a distância que você quer mover para a esquerda */
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

/* Corpo */
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 70px;  /* Adiciona espaçamento extra, se necessário */
}

.main-box {
  background-color: #f0f0f0;
  padding: 60px;
  width: 100%;
  max-width: 1700px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 8px;
}

.search-bar {
  width: 60%;
  padding: 10px;
  margin: 0; /* Remover margem */
  border: none; /* Remover borda */
  background-color: #fff; /* Define um fundo branco para a barra de pesquisa */
  border-radius: 10px; /* Adiciona bordas arredondadas */
}

.action-circles {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px; /* Ajuste o espaçamento entre os círculos, se necessário */
  width: 100%;
  padding: 0;
  margin-top: 20px; /* Adiciona um espaçamento extra entre a barra de pesquisa e os círculos */
}

.circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px; /* Reduzido de 80px para 60px */
  height: 60px; /* Reduzido de 80px para 60px */
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  position: relative;
}

.circle p {
  position: absolute;
  bottom: -18px; /* Ajuste o espaçamento entre o texto e o círculo */
  margin: 0;
  font-size: 12px; /* Diminui o tamanho do texto */
  color: #000000;
}

.circle.new-book {
  background-color: #F4271C;
}

.circle.users {
  background-color: #2133B0;
}

.circle.reports {
  background-color: #3197A6;
}

.circle img {
  width: 30px; /* Reduzido de 40px para 30px */
  height: 30px; /* Reduzido de 40px para 30px */
}

/* Mini Dashboard */
.mini-dashboard {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  width: 100%;
  max-width: 800px;
}

.book-count {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 150px; /* Ajuste a altura conforme necessário */
}

.book-count h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.book-count p {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
}

.chart, .calendar, .task-list, .popular-books {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
}

.calendar {
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.calendar-header h3 {
  margin: 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  padding: 10px;
  cursor: pointer;
}

.calendar-day span {
  display: inline-block;
  width: 100%;
  text-align: center;
}

.calendar-day .marked {
  background-color: #4CAF50;
  color: white;
}

.popular-books img {
  width: 50px;
  height: auto;
}

.calendar-header img {
  width: 20px;
  height: auto;
}

/* Rodapé */
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

/* Adiciona essa classe ao elemento que contém o conteúdo da página */
.container {
  min-height: 100vh; /* Ajusta a altura mínima do conteúdo para a altura da página */
  margin-bottom: 60px; /* Adiciona um espaçamento de 60px no final do conteúdo para o rodapé */
  padding-top: 100px; /* Este espaçamento desloca o conteúdo para baixo, evitando que seja coberto pelo cabeçalho */
}


.footer-esquerda {
  display: flex;
  align-items: center;
}

.footer-esquerda img {
  height: 20px; /* Define a altura das imagens para 25 pixels, garantindo uma aparência consistente */
  margin-right: 10px; /* Adiciona uma margem de 10 pixels à direita das imagens para espaçamento entre elementos */
}

.footer-centro {
  text-align: center;
  flex-grow: 1;
}

/* Define a largura da .footer-direita */
.footer-direita {
  display: flex;
  justify-content: space-around;
  width: 110px; /* Mantém a largura da .footer-direita em 100px */
  gap: 0.5px; /* Adiciona um espaçamento de 10px entre as imagens */
  overflow: visible; /* Define como o conteúdo deve ser tratado quando ultrapassa a largura da página */
}

/* Define o estilo para as imagens dentro da .footer-direita */
.footer-direita img {
  height: 20px; /* Define a altura das imagens */
  margin: 0 5px; /* Adiciona um espaçamento de 5px à esquerda e à direita das imagens */
}

</style>
