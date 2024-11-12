<template>
  <div class="admin-panel">
    <!-- Cabeçalho -->
    <header class="header-admin">
      <div class="header-left">
        <img src="@/assets/menu.png" alt="Menu" class="menu-icon" @click="toggleMenu">
        <img src="@/assets/logo.png" alt="Logo" class="logo-icon">
        <h1 class="title">Administrativo</h1>
      </div>
      <div class="header-right">
        <div class="perfil-container" @click="toggleDropdown">
          <div class="perfil-circulo"></div>
          <div class="perfil-dropdown" v-if="showDropdown">
            <ul>
              <li><i class="icon-perfil"></i> Perfil</li>
              <li><i class="icon-config"></i> Configurações</li>
              <li><i class="icon-sair"></i> Sair</li>
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
export default {
  data() {
    return {
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
      this.$router.push('/api.js');  // Navega para a página /book-form
    },
  },
  mounted() {
    // Carrega os dias ao montar o componente
    this.loadDays();
  },
};
</script>


<style scoped>
.header-admin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px 20px;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
}

.menu-icon, .logo-icon, .settings-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.title {
  font-size: 24px;
  margin-left: 10px;
}

.perfil-container {
  display: flex;
  align-items: center;
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
  top: 60px;
  right: 20px;
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  width: 120px;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.main-box {
  background-color: #f0f0f0;
  padding: 40px;
  width: 100%;
  max-width: 1700px;  /* Aumenta a largura máxima */
  text-align: center;
  margin-bottom: 20px;
  border-radius: 8px;  /* Adiciona bordas arredondadas com raio de 8px */
}

.search-bar {
  width: 60%;
  padding: 10px;
  margin-bottom: 20px;
}

.action-circles {
  display: flex;
  justify-content: center;  /* Alinha os círculos horizontalmente ao centro */
  align-items: center;      /* Alinha os círculos verticalmente ao centro */
  gap: 150px;                /* Ajuste o espaçamento entre os círculos, se necessário */
  width: 100%;              /* Faz o container ocupar toda a largura da tela */
  padding: 0;               /* Remover qualquer padding extra */
}

.circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  position: relative;
}

.circle p {
  position: absolute; /* Coloca o texto fora do círculo */
  bottom: -20px; /* Ajusta a posição para que o texto fique embaixo do círculo */
  margin: 0; /* Remove qualquer margem extra */
  font-size: 14px;
  color: #000000;
}

.circle.new-book {
  background-color: #F4271C; /* Cor para o círculo 'Novo Livro' */
}

.circle.users {
  background-color: #2133B0; /* Cor para o círculo 'Usuários' */
}

.circle.reports {
  background-color: #3197A6; /* Cor para o círculo 'Relatórios' */
}

.circle img {
  width: 40px;
  height: 40px;
}

.mini-dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  max-width: 800px;
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
  width: 50px; /* Ajuste a largura conforme necessário */
  height: auto; /* Mantém a proporção */
}

.calendar-header img {
  width: 20px; /* Ajuste a largura conforme necessário */
  height: auto; /* Mantém a proporção */
}

.footer-esquerda, .footer-centro, .footer-direita {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
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
