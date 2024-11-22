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
                <!-- Atualize a opção no dropdown do cabeçalho -->
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
            <label><input type="checkbox" value="Administracao" /> Administração</label>
            <label><input type="checkbox" value="Artes" /> Artes</label>
            <label><input type="checkbox" value="Computacao" /> Computação</label>
            <label><input type="checkbox" value="Educacao" /> Educação</label>
            <label><input type="checkbox" value="EsporteLazer" /> Esporte e Lazer</label>
            <label><input type="checkbox" value="Fantasia" /> Fantasia, Horror e...</label>
            <label><input type="checkbox" value="Infantil" /> Infantil</label>
            <label><input type="checkbox" value="Romance" /> Romance</label>
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
          <div class="livro" v-for="(livro, index) in livros" :key="index">
            <img :src="livro.imagem" :alt="livro.titulo" />
            <div class="descricao">
              <div class="avaliacao">{{ livro.avaliacao }}</div>
              <div class="titulo">{{ livro.titulo }}</div>
              <div class="autor">Autor: {{ livro.autor }}</div>
              <div class="disponibilidade">Disponível: {{ livro.disponibilidade }}</div>
            </div>
          </div>
        </section>
      </div>
  
      <!-- Propaganda -->
      <section class="propaganda">
        <img src="@/assets/propaganda.png" alt="Propaganda" />
      </section>
  
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
        livros: [
          {
            imagem: require('@/assets/livro1.png'),
            avaliacao: "★★★★☆",
            titulo: "É assim que acaba",
            autor: "Autor 1",
            disponibilidade: "Sim",
          },
          {
            imagem: require('@/assets/livro2.png'),
            avaliacao: "★★★★★",
            titulo: "Café com Deus Pai",
            autor: "Antonio Cirilo",
            disponibilidade: "Não",
          },
          {
            imagem: require('@/assets/livro3.png'),
            avaliacao: "★★★★☆",
            titulo: "Me Poupe! (Edição atualizada)",
            autor: "Nathalia Arcuri",
            disponibilidade: "Sim",
          },
          {
            imagem: require('@/assets/livro4.png'),
            avaliacao: "★★★★★",
            titulo: "Veríty",
            autor: "Colleen Hoover",
            disponibilidade: "Não",
          },
          {
            imagem: require('@/assets/livro5.png'),
            avaliacao: "★★★★☆",
            titulo: "O Homem Mais Rico da Babilônia",
            autor: "George S. Clason",
            disponibilidade: "Não",
          },
          {
            imagem: require('@/assets/livro6.png'),
            avaliacao: "★★★★☆",
            titulo: "O Poder do Hábito: Por Que Fazemos o Que Fazemos na Vida e nos Negócios",
            autor: "Charles Duhigg",
            disponibilidade: "Sim",
          },
          {
            imagem: require('@/assets/livro7.png'),
            avaliacao: "★★★★☆",
            titulo: "Mindset: A nova psicologia do sucesso",
            autor: "Carol S. Dweck",
            disponibilidade: "Não",
          },
          {
            imagem: require('@/assets/livro8.png'),
            avaliacao: "★★★★★",
            titulo: "A Psicologia Financeira",
            autor: "Morgan Housel",
            disponibilidade: "Sim",
          },
          {
            imagem: require('@/assets/livro9.png'),
            avaliacao: "★★☆☆☆",
            titulo: "Os Segredos da Mente Milionária",
            autor: "T. Harv Eker",
            disponibilidade: "Não",
          },
          {
            imagem: require('@/assets/livro10.png'),
            avaliacao: "★★★★☆",
            titulo: "A geração ansiosa",
            autor: "Jonathan Haidt",
            disponibilidade: "Sim",
          },
          {
            imagem: require('@/assets/livro11.png'),
            avaliacao: "★★★★☆",
            titulo: "É assim que começa",
            autor: "Colleen Hoover",
            disponibilidade: "Não",
          },
          {
            imagem: require('@/assets/livro12.png'),
            avaliacao: "★★★★☆",
            titulo: "Princípios milenares",
            autor: "Tiago Brunet",
            disponibilidade: "Sim",
          },
          {
            imagem: require('@/assets/livro13.png'),
            avaliacao: "★★★★☆",
            titulo: "A biblioteca da meia-noite",
            autor: "Matt Haig",
            disponibilidade: "Não",
          },
          {
            imagem: require('@/assets/livro14.png'),
            avaliacao: "★★★★★",
            titulo: "Corte de chamas prateadas",
            autor: "Sarah J. Maas",
            disponibilidade: "Sim",
          },
          {
            imagem: require('@/assets/livro15.png'),
            avaliacao: "★★★★☆",
            titulo: "Introdução à Programação com Python",
            autor: "Nilo Ney",
            disponibilidade: "Sim",
          },
          {
            imagem: require('@/assets/livro16.png'),
            avaliacao: "★★★☆☆",
            titulo: "Desinformação",
            autor: "Dan Ariely",
            disponibilidade: "Não",
          },
          {
            imagem: require('@/assets/livro17.png'),
            avaliacao: "★★★★★",
            titulo: "A guerra dos chips: A batalha pela tecnologia que move o mundo",
            autor: "Chris Miller",
            disponibilidade: "Sim",
          },
          {
            imagem: require('@/assets/livro18.png'),
            avaliacao: "★★☆☆☆",
            titulo: "O medo do medo",
            autor: "Amy Cuddy",
            disponibilidade: "Não",
          },
          {
            imagem: require('@/assets/livro19.png'),
            avaliacao: "★★★★☆",
            titulo: "O poder da ação",
            autor: "Paulo Vieira",
            disponibilidade: "Sim",
          },
          {
            imagem: require('@/assets/livro20.png'),
            avaliacao: "★★★★☆",
            titulo: "Eleanor Oliphant está perfeitamente bem",
            autor: "Gail Honeyman",
            disponibilidade: "Não",
          },
        ],
        showDropdown: false,
      pesquisa: "", // Adicionei pesquisa como uma variável data se for necessário
    };
  },
  methods: {
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  },
  handleSearch() {
    console.log("Pesquisa iniciada:", this.pesquisa);
  },
  profile() {
    console.log("Redirecionando para a página de perfil..."); // Debug
    this.$router.push('/perfil'); // Redireciona para a página de perfil
  },
  logout() {
    localStorage.removeItem('auth_token');
    this.$router.push('/');
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


/* Estilos para a estrutura principal */
.conteudo-principal {
    display: flex; /* Flexbox para organizar os filtros e a lista de livros */
    justify-content: flex-start; /* Alinha os itens no início */
}

/* Estilos para o contêiner de filtros */
.filtros {
    width: 10%; /* Largura dos filtros */
    padding: 0; /* Remover padding interno */
    margin-right: 10px; /*  o espaço à direita */
    margin-top: 20px; /*  espaço acima dos filtros */
    margin-left: 20px; /* Adiciona espaço à esquerda dos filtros */
    display: flex;
    flex-direction: column; /* Filtros empilhados verticalmente */
    align-items: flex-start; /* Alinha os filtros à esquerda */
    gap: 10px; /* Espaço entre os filtros */
}

/* Estilos para cada filtro individual */
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

/* Estilos para a lista de livros */
.livros {
    flex: 1; /* O restante do espaço é ocupado pela lista de livros */
    display: flex;
    flex-wrap: wrap; /* Permite que os livros se ajustem à linha */
    gap: 10px; /* Espaçamento entre os livros */
}

  </style>
  