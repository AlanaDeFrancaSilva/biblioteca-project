<template>
    <div>
      <!-- Cabeçalho -->
      <header class="cabecalho">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo Mange Library" />
        </div>
        <nav>
          <ul>
            <li><router-link to="/Clivros">Livros</router-link></li>
            <li><router-link to="/noticias">Notícias</router-link></li>
            <li><router-link to="/sobre">Sobre</router-link></li>
            <li><a href="https://transparencia.sp.senai.br/sac" target="_blank">Fale Conosco</a></li>
          </ul>
        </nav>
        <!-- Barra de pesquisa -->
        <div class="barra-pesquisa">
          <input type="text" placeholder="Pesquisar..." id="pesquisa-input" @keypress.enter="handleSearch" />
        </div>
        <div class="botoes-autenticacao">
          <router-link to="/login" class="btn-login">Entrar</router-link>
          <router-link to="/register" class="btn-signup">Criar uma conta</router-link>
        </div>
      </header>
  
      <!-- Propaganda -->
      <section class="propaganda">
        <img src="@/assets/propaganda.png" alt="Propaganda" />
      </section>
  
      <!-- Linha divisória -->
      <hr />
  
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
  
      <!-- Botão para se cadastrar p/ + -->
      <div class="container-cadastre">
        <router-link to="/register" class="btn-cadastre-mais">Se cadastre para mais</router-link>
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
        livros: [
          {
            imagem: require('@/assets/livro1.png'), // Use require para resolver o caminho corretamente
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
            titulo: "Arquitetura de Software: as Partes Difíceis",
            autor: "Neal Ford",
            disponibilidade: "Não",
          },
          {
            imagem: require('@/assets/livro19.png'),
            avaliacao: "★★★★☆",
            titulo: "O Pequeno Príncipe - Edição de Luxo Almofadada",
            autor: "Antoine de Saint-Exupéry",
            disponibilidade: "Sim",
          },
          {
            imagem: require('@/assets/livro20.png'),
            avaliacao: "★★★☆☆",
            titulo: "Engenharia de Software Moderna",
            autor: "Marco Tulio",
            disponibilidade: "Não",
          },
        ],
      };
    },
    methods: {
      handleSearch(event) {
        alert('Você pesquisou: ' + event.target.value);
        // Aqui você pode adicionar a lógica de pesquisa
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
    background-color: #f9f9f9;
    color: #333;
    font-size: 14px;
    min-height: 100vh;
    margin-bottom: 60px;
    padding-top: 100px; /* Adiciona espaçamento para que o conteúdo não sobreponha o cabeçalho fixo */
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

/* Propaganda */
.propaganda {
    margin-top: 100px; /* Aumenta o espaço superior da propaganda */
    margin-bottom: 30px; /* Mantém o espaço inferior */
    text-align: center;
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
    width: 50%; /* Diminui a largura da imagem */
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
.container-cadastre {
    display: flex; /* Usa o Flexbox para organizar os elementos de forma flexível */
    flex-direction: column; /* Alinha os itens na coluna (verticalmente) */
    justify-content: center; /* Centraliza o conteúdo verticalmente dentro do contêiner */
    align-items: center;     /* Centraliza o conteúdo horizontalmente dentro do contêiner */
    margin-top: 50px; /* Adiciona 50px de espaço acima do contêiner (acima do botão) */
    margin-bottom: 50px; /* Adiciona 50px de espaço abaixo do contêiner (abaixo do botão) */
}

/* Estilização do botão "Se cadastre para mais" */
.btn-cadastre-mais {
    background-color: #F4271C; /* Cor de fundo vermelha para o botão */
    color: #ffffff; /* Cor do texto do botão (branco) */
    border: none; /* Remove a borda padrão do botão */
    border-radius: 5px; /* Bordas arredondadas do botão */
    padding: 8px 12px; /* Ajusta o espaçamento interno do botão (menos padding) */
    cursor: pointer; /* Muda o cursor para o formato de mão quando passa por cima */
    font-size: 14px; /* Tamanho da fonte do texto dentro do botão */
    transition: background-color 0.3s; /* Transição suave para a mudança de cor de fundo */
    margin: 0 auto; /* Garante que o botão seja centralizado (sem margens laterais) */
    text-decoration: none; /* Remove qualquer sublinhado do link */
}

/* Efeito de hover no botão "Se cadastre para mais" */
.btn-cadastre-mais:hover {
    background-color: #C3201F; /* Muda a cor de fundo para um tom mais escuro quando o mouse passa por cima */
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
  