<template>
    <div class="perfil-container">
      <header>
        <!-- Cabeçalho -->
        <div class="cabecalho">
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
          <div class="cabecalho-direita">
            <div class="barra-pesquisa">
              <input type="text" placeholder="Pesquisar..." id="pesquisa-input" />
            </div>
            <div class="perfil-container" @click="toggleDropdown">
              <div class="perfil-circulo"></div>
              <div class="perfil-dropdown" v-if="showDropdown">
                <ul>
                  <li @click="perfil"><i class="icon-perfil"></i> Perfil</li>
                  <li><i class="icon-config"></i> Configurações</li>
                  <li @click="logout"><i class="icon-sair"></i> Sair</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
  
      <div class="perfil-content">
        <h2>Perfil do Usuário</h2>
        <div v-if="user">
          <p><strong>Nome:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Data de Registro:</strong> {{ user.createdAt }}</p>
          <!-- Adicione mais campos conforme necessário -->
        </div>
        <div v-else>
          <p>Carregando informações do perfil...</p>
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
  name: 'PerfilPage',
  data() {
    return {
      showDropdown: false,
      user: null,
    };
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      localStorage.removeItem("auth_token");  // Remove o token de autenticação
      this.$router.push("/");  // Redireciona para a página inicial
    },
    perfil() {
      this.$router.push("perfil");  // Redireciona para a página inicial
    },
    async fetchUserProfile() {
      try {
        const response = await fetch("/api/user/profile", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
          },
        });
        if (response.ok) {
          this.user = await response.json();
        } else {
          throw new Error("Erro ao carregar perfil");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
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

/* Adiciona uma borda ao redor do Cabeçalho e do Rodapé */
.cabecalho, footer {
  border: 1px solid #ddd; /* Cor da borda */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra */
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

/* Estilo do cabeçalho */
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

/* Estilo da logo */
.logo img {
  height: 40px; /* Aumenta a altura da logo */
}

/* Espaçamento do menu de navegação */
nav {
  margin-left: 20px; /* Adiciona espaço entre logo e menu */
}

/* Estilo da lista de navegação */
nav ul {
  display: flex; /* Exibe os itens em linha */
  list-style: none; /* Remove os marcadores padrão da lista */
}

/* Estilo dos itens da lista de navegação */
nav ul li {
  margin-right: 30px; /* Aumenta o espaço à direita de cada item do menu */
}

/* Estilo dos links no menu */
nav ul li a {
  color: black; /* Cor do texto do menu */
  text-decoration: none; /* Remove o sublinhado dos links */
  font-size: 14px; /* Reduzido para 14px */
  transition: color 0.3s; /* Transição suave para mudança de cor ao passar o mouse */
}

/* Efeito hover nos links do menu */
nav ul li a:hover {
  color: #ecf0f1; /* Cor mais clara no hover */
}

/* Estilo da barra de pesquisa */
.barra-pesquisa {
  margin: 0 20px; /* Espaço em volta da barra de pesquisa */
}

/* Estilo do input da barra de pesquisa */
.barra-pesquisa input {
  padding: 8px; /* Ajustado para diminuir o padding */
  border: 1px solid #ddd; /* Borda da barra de pesquisa */
  border-radius: 5px; /* Bordas arredondadas */
  font-size: 14px; /* Reduzido para 14px */
  width: 600px; /* Largura da barra de pesquisa */
  transition: border-color 0.3s; /* Efeito de transição */
}

/* Efeito ao focar no input da barra de pesquisa */
.barra-pesquisa input:focus {
  border-color: #F4271C; /* Cor da borda ao focar */
  outline: none; /* Remove o contorno padrão do navegador */
}

/* Efeito hover do botão de pesquisar */
.btn-pesquisar:hover {
  background-color: #C3201F; /* Cor do botão no hover */
}

/* Contêiner para os botões de autenticação */
.botoes-autenticacao {
  display: flex; /* Usar flexbox para layout flexível */
  align-items: center; /* Alinha os botões verticalmente ao centro */
}

/* Cabeçalho */
.cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Estilização para o conteúdo do lado direito do cabeçalho */
.cabecalho-direita {
  display: flex;
  align-items: center;
}

/* Barra de pesquisa */
.barra-pesquisa {
  margin-right: 20px;
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

/* Linha divisória */
hr {
  width: 85%; /* Define a largura da linha */
  margin: 20px auto; /* Centraliza horizontalmente */
  border: 1px solid #ddd; /* Define a cor e espessura da linha */
}

/* Livros enfileirados */
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

/*Botão para se cadastrar p/ +*/

/* Estilização do contêiner para centralizar */
.container-cadastre {
  display: flex;
  flex-direction: column; /* Para garantir que o botão fique no centro mesmo se o espaço mudar */
  justify-content: center; /* Centraliza verticalmente */
  align-items: center;     /* Centraliza horizontalmente */
  margin-bottom: 10px; /* Ajuste para dar espaço ao rodapé */
}

/* Botão para se cadastrar p/ + */
.btn-cadastre-mais {
  background-color: #F4271C;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px; /* Reduzir o padding */
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  margin: 0 auto; /* Diminui o espaço ao redor do botão */
  text-decoration: none; /* Remove a sublinhado do link */
}

.btn-cadastre-mais:hover {
  background-color: #C3201F;
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
  