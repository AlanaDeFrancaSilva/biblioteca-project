<template>
  <div class="emprestimo">

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
      <h1>Registrar Empréstimo</h1>
      <form @submit.prevent="registrarEmprestimo">
        <div>
          <label for="livro">Selecione o Livro:</label>
          <select v-model="livroId" id="livro">
            <option v-for="livro in livros" :key="livro._id" :value="livro._id">
              {{ livro.title }} - {{ livro.author }}
            </option>
          </select>
        </div>

        <div>
          <label for="aluno">Selecione o Aluno:</label>
          <select v-model="usuarioId" id="aluno">
            <option v-for="usuario in usuarios" :key="usuario._id" :value="usuario._id">
              {{ usuario.name }}
            </option>
          </select>
        </div>

        <!-- Data de devolução agora é calculada automaticamente -->
        <div>
          <label for="dataDevolucao">Data de Devolução: </label>
          <span>{{ dataDevolucao }}</span> <!-- Exibe a data calculada -->
        </div>

        <button type="submit">Registrar Empréstimo</button>
      </form>

      <div v-if="mensagem">
        <p>{{ mensagem }}</p>
      </div>
    </div>
  </div>
</template>

  
<script>
export default {
  data() {
    return {
      livros: [],
      usuarios: [],
      showDropdown: false, // Controla a exibição do dropdown de perfil
      showMenu: false, // Controla a exibição do menu lateral
      livroId: '',
      usuarioId: '',
      dataDevolucao: '', // Armazena a data de devolução
      mensagem: ''
    };
  },
  mounted() {
    this.carregarLivros();
    this.carregarUsuarios();
    this.calcularDataDevolucao(); // Calcula a data de devolução ao carregar o componente
  },
  methods: {
    async carregarLivros() {
      try {
        const resposta = await fetch('http://localhost:5000/api/livros');
        const dados = await resposta.json();
        this.livros = dados;
      } catch (error) {
        console.error('Erro ao carregar livros', error);
      }
    },
    async carregarUsuarios() {
      try {
        const resposta = await fetch('http://localhost:5000/api/usuarios');
        const dados = await resposta.json();
        this.usuarios = dados;
      } catch (error) {
        console.error('Erro ao carregar usuários', error);
      }
    },
    calcularDataDevolucao() {
      const hoje = new Date();
      hoje.setDate(hoje.getDate() + 7); // Adiciona 7 dias à data atual
      const ano = hoje.getFullYear();
      const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Mes começa de 0
      const dia = String(hoje.getDate()).padStart(2, '0');
      this.dataDevolucao = `${ano}-${mes}-${dia}`; // Formata a data no formato YYYY-MM-DD
    },
    async registrarEmprestimo() {
      try {
        const resposta = await fetch('http://localhost:5000/api/emprestimo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookId: this.livroId,
            userId: this.usuarioId,
            dueDate: this.dataDevolucao, // Envia a data calculada
          }),
        });
        const dados = await resposta.json();
        this.mensagem = dados.message;
      } catch (error) {
        this.mensagem = 'Erro ao registrar o empréstimo';
        console.error(error);
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

    // Método para redirecionar ao perfil do usuário
    profile() {
      this.$router.push('/PerfilPage');
    },

    // Método para realizar o logout
    logout() {
      // Limpar o armazenamento local ou de sessão, caso você tenha um token de login armazenado
      localStorage.removeItem('auth_token');  // Se você estiver usando o localStorage

      // Depois de limpar os dados de sessão, redireciona para a página inicial
      this.$router.push('/'); // Redireciona para a HomePage
    }
  }
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

</style>  