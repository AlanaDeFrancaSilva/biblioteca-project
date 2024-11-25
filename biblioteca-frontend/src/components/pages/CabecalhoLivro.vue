<template>
    <div>
      <!-- Cabeçalho -->
      <header class="cabecalho">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo Mange Library">
        </div>
        <nav>
          <ul>
            <li><a href="C_livro.html" class="ativo">Livros</a></li>
            <li><a href="C_noticia.html">Notícias</a></li>
            <li><a href="C_sobre.html">Sobre</a></li>
            <li><a href="https://transparencia.sp.senai.br/sac" target="_blank">Fale Conosco</a></li>
          </ul>
        </nav>
        <!-- Barra de pesquisa -->
        <div class="barra-pesquisa">
          <input type="text" placeholder="Pesquisar..." id="pesquisa-input">
        </div>
        <div class="botoes-autenticacao">
          <a href="login.html" class="btn-login">Entrar</a>
          <a href="cadastro.html" class="btn-signup">Criar uma conta</a>
        </div>
      </header>
  
      <header class="C">
        <h1>Bem-vindo à página de Livros</h1>
      </header>
      
      <section class="C">
        <p style="margin-bottom: 30px;">A <strong>Mange Library</strong> é um espaço dedicado a oferecer uma vasta coleção de livros para atender aos mais diversos interesses e necessidades de seus usuários. Com um acervo que abrange várias áreas do conhecimento, a biblioteca é uma referência quando o assunto é a busca por literatura acadêmica, científica e técnica. Seja você estudante, pesquisador ou apenas alguém em busca de aprimorar seus conhecimentos, encontrará aqui um recurso valioso para o seu desenvolvimento pessoal e profissional.</p>
        
        <p style="margin-bottom: 30px;">Nossos acervos são divididos em diversas categorias, com destaque especial para a área acadêmica. Disponibilizamos livros das mais variadas disciplinas, como Engenharia, Ciências Humanas, Medicina, Economia, Tecnologia da Informação, Direito, entre outras. Além disso, há uma seção dedicada às literaturas contemporâneas, clássicas e de ficção científica, atendendo também àqueles que buscam leitura por lazer ou inspiração.</p>
        
        <p style="margin-bottom: 30px;">A <strong>Mange Library</strong> também oferece aos seus usuários a facilidade de empréstimo de livros físicos, permitindo que possam levar para casa as obras que precisam para seus estudos ou leituras pessoais. A organização da biblioteca e o sistema de reservas garantem que o acesso às obras seja rápido e prático, proporcionando uma experiência eficiente e acessível a todos que frequentam o espaço.</p>
        
        <p>Ainda mais importante é que o site da <strong>Mange Library</strong> conta com uma seção especial de livros em formato PDF disponíveis para download gratuito. Nessa área, é possível encontrar uma seleção de títulos acadêmicos e de interesse geral, permitindo que você acesse conteúdos importantes de onde estiver, sem nenhum custo adicional. Essa iniciativa visa democratizar o acesso ao conhecimento, proporcionando mais uma ferramenta de apoio para estudantes e profissionais em suas jornadas de aprendizado.</p>
      </section>
  
      <!-- Rodapé -->
      <footer>
        <div class="footer-esquerda">
          <img src="@/assets/mundo.png" alt="Português (Brasil)">
          <p>Português (Brasil)</p>
        </div>
        <div class="footer-centro">
          <p>© 2024 Todos os direitos reservados, Mange Library ®</p>
        </div>
        <div class="footer-direita">
          <a href="https://www.facebook.com/SENAI.R.Mange/?locale=pt_BR" target="_blank">
            <img src="@/assets/facebook.png" alt="Facebook">
          </a>
          <a href="https://www.linkedin.com/school/escola-senai-roberto-mange/posts/?feedView=all" target="_blank">
            <img src="@/assets/linkedin.png" alt="LinkedIn">
          </a>
          <a href="https://www.youtube.com/@senaisaopaulo-senairoberto8729" target="_blank">
            <img src="@/assets/youtube.png" alt="YouTube">
          </a>
          <a href="https://www.instagram.com/senaimange/" target="_blank">
            <img src="@/assets/instagram.png" alt="Instagram">
          </a>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage",
    data() {
      return {
        // Aqui podem ser adicionadas variáveis reativas, se necessário.
      };
    },
    methods: {
      // Aqui podem ser definidos métodos, caso necessário.
    }
  };
  </script>
  
  <style scoped>
.cabecalho {
    display: flex; /* Usado para criar um layout flexível, permitindo alinhar os itens de forma eficiente */
    justify-content: space-between; /* Distribui os itens com o máximo de espaço possível entre eles */
    align-items: center; /* Alinha os itens verticalmente no centro */
    background-color: #f9f9f9; /* Cor de fundo do cabeçalho */
    color: black; /* Cor do texto do cabeçalho */
    padding: 15px 20px; /* Define o espaçamento interno (padding) do cabeçalho */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Adiciona uma sombra suave ao cabeçalho */
    font-size: 14px; /* Define o tamanho da fonte no cabeçalho */
    width: 100%; /* Garante que o cabeçalho ocupe toda a largura da tela */
    position: fixed; /* Faz com que o cabeçalho permaneça fixo no topo da página ao rolar */
    top: 0; /* Coloca o cabeçalho no topo da página */
    left: 0; /* Alinha o cabeçalho à esquerda */
    z-index: 10; /* Garante que o cabeçalho fique acima de outros elementos que possam ter a mesma posição */
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

/* Estilo dos botões de autenticação */
.botoes-autenticacao button {
    border: none; /* Remove a borda padrão */
    border-radius: 5px; /* Bordas arredondadas */
    padding: 8px 12px; /* Ajustado para diminuir o padding */
    margin-left: 10px;
    cursor: pointer; /* Muda o cursor para pointer ao passar por cima */
    font-size: 12px; /* Reduzido para 12px */
    transition: background-color 0.3s; /* Transição suave para mudança de cor no hover */
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
  