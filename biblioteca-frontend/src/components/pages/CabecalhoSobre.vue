<template>
    <div>
      <!-- Cabeçalho -->
      <header class="cabecalho">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo Mange Library">
        </div>
        <nav>
          <ul>
            <li><a href="https://sp.senai.br/unidade/campinas/biblioteca" target="_blank">Biblioteca</a></li>
            <li><router-link to="/Cnotic">Notícias</router-link></li>
            <li><router-link to="/Csobre">Sobre</router-link></li>
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
  
      <!-- Cabeçalho da Página de Livros com a Imagem -->
      <header class="C">
  <div class="titulo-container">
    <router-link to="/">
      <img src="@/assets/casa.png" alt="Casa" class="titulo-imagem">
    </router-link>
    <h1>Sobre</h1>
  </div>
</header>

      <!-- Carrossel de imagens -->
       <section class="carrossel-container">
        <swiper 
        :slidesPerView="1"
        :spaceBetween="10"
        loop
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        >
        <swiper-slide>
            <img src="@/assets/carrosellivro.png" alt="Imagem 1" />
        </swiper-slide>
        <swiper-slide>
            <img src="@/assets/propaganda.png" alt="Imagem 2" />
        </swiper-slide>
        <swiper-slide>
            <img src="@/assets/propaganda.png" alt="Imagem 3" />
        </swiper-slide>
    </swiper>

    </section>
      
    <section class="paragrafos-container">
    <p style="margin-bottom: 30px;">A <strong>Mange Library</strong> é um espaço dedicado a oferecer uma vasta coleção de livros que atendem aos mais diversos interesses e necessidades de seus usuários. Com um acervo que abrange várias áreas do conhecimento, a biblioteca se destaca como uma referência quando o assunto é a busca por literatura acadêmica, científica e técnica. Seja você um estudante buscando aprofundamento em sua área de estudo, um pesquisador à procura de fontes confiáveis, ou simplesmente alguém que deseja expandir seus horizontes e aprimorar seus conhecimentos, a <strong>Mange Library</strong> oferece uma rica variedade de recursos que irão contribuir significativamente para o seu desenvolvimento pessoal e profissional. Com a crescente demanda por educação e informações atualizadas, nossa missão é proporcionar um ambiente de aprendizado inclusivo, com materiais de qualidade ao alcance de todos.</p>

    <p style="margin-bottom: 30px;">O acervo da <strong>Mange Library</strong> é cuidadosamente organizado e dividido em diversas categorias, abrangendo um vasto espectro de áreas do saber. Com um foco especial em literatura acadêmica e científica, os livros da biblioteca são selecionados com rigor para garantir que os usuários tenham acesso a conteúdos atualizados e relevantes para suas áreas de estudo. A biblioteca disponibiliza obras das mais variadas disciplinas, como Engenharia, Ciências Humanas, Medicina, Economia, Tecnologia da Informação, Direito, Ciências Sociais, Psicologia, Educação, entre outras. Além disso, a <strong>Mange Library</strong> se orgulha de oferecer uma seleção de títulos voltados para o lazer e a inspiração, com uma seção dedicada à literatura contemporânea, clássica e ficção científica, permitindo que os visitantes encontrem livros que atendem tanto à sua necessidade de aprendizado quanto ao prazer da leitura por lazer.</p>

    <p style="margin-bottom: 30px;">A <strong>Mange Library</strong> também oferece aos seus usuários a facilidade de empréstimo de livros físicos, permitindo que eles levem para casa as obras que precisam para seus estudos ou leituras pessoais. Este serviço é facilitado por um sistema de organização eficiente e um sistema de reservas que torna o processo de obtenção de livros rápido e simples. Com um ambiente acolhedor e uma equipe sempre disponível para ajudar, nossa biblioteca visa oferecer uma experiência prática e acessível, garantindo que todos os usuários possam acessar os recursos de que precisam sem complicação. Além disso, as condições de empréstimo são flexíveis, para que cada usuário tenha tempo suficiente para se dedicar aos seus estudos ou à leitura das obras, sem pressa.</p>

    <p style="margin-bottom: 30px;">Outro ponto relevante da <strong>Mange Library</strong> é a sua versão digital, que proporciona uma experiência de acesso à informação ainda mais prática e ágil. O site da biblioteca conta com uma seção especial dedicada à oferta de livros em formato PDF, disponíveis para download gratuito. Esta iniciativa foi pensada para democratizar o acesso ao conhecimento e permitir que estudantes, profissionais e qualquer pessoa interessada no aprimoramento de seus conhecimentos possam acessar uma vasta seleção de livros de qualquer lugar, sem nenhum custo adicional. A seção digital inclui livros acadêmicos, títulos de interesse geral e obras que, de outra forma, poderiam ser inacessíveis a muitos devido a questões geográficas ou financeiras. Com a tecnologia a favor, a <strong>Mange Library</strong> facilita o acesso ao conhecimento de forma inclusiva, proporcionando mais uma ferramenta de apoio para a educação e o aprendizado contínuo.</p>

    <p style="margin-bottom: 30px;">Além da grande variedade de livros disponíveis, a <strong>Mange Library</strong> também promove eventos e atividades culturais, como palestras, workshops, debates e clubes de leitura. Estas ações visam criar uma comunidade vibrante de leitores e aprendizes, estimulando a troca de ideias e o desenvolvimento intelectual entre os usuários. A biblioteca se transforma, assim, em um ponto de encontro para aqueles que buscam expandir seus conhecimentos não só por meio da leitura, mas também por meio do contato direto com especialistas e colegas que compartilham interesses semelhantes.</p>

    <p style="margin-bottom: 30px;">Com o compromisso de se manter atualizada, a <strong>Mange Library</strong> busca constantemente expandir seu acervo com títulos novos e inovadores, acompanhando as tendências e os avanços do mercado editorial. Também se preocupa em incluir materiais que atendam a públicos diversos, como literatura inclusiva, livros sobre diversidade e títulos que tratem de temas sociais relevantes. Nosso objetivo é ser mais do que apenas um lugar para pegar emprestado livros; queremos ser um centro de aprendizado contínuo e um motor para a transformação educacional.</p>

    <p>A <strong>Mange Library</strong> acredita que a educação deve ser acessível a todos, independentemente de sua condição social, localização ou recursos financeiros. Por isso, o acesso gratuito ao conteúdo digital e a disponibilidade de obras físicas para empréstimo visam oferecer uma plataforma justa e igualitária para todos. Ao facilitar o acesso ao conhecimento, a biblioteca contribui para a construção de um futuro mais informado, mais justo e mais igualitário. Em um mundo cada vez mais digital, nossa missão é equilibrar a tradição da leitura física com as inovações tecnológicas, garantindo que nossos usuários tenham acesso aos melhores recursos, onde quer que estejam.</p>
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
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css'; // Importação do CSS do Swiper
  import 'swiper/css/navigation'; // Para usar a navegação
  import 'swiper/css/pagination'; // Para usar a paginação
  
  export default {
    name: 'HomePage',
    components: {
      Swiper,
      SwiperSlide
    }
  };
  </script>
  
  <style scoped>
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

header.C {
  margin-top: 70px; /* Mantém a margem superior */
  padding-top: 20px; /* Adiciona um pouco de espaçamento interno adicional */
}

.titulo-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;  /* Alinha o conteúdo à esquerda */
  gap: 15px; /* Espaçamento entre a imagem e o título */
  margin-left: 350px; /* Adiciona margem à esquerda para afastar o conteúdo da borda */
}

.titulo-imagem {
  width: 30px; /* Ajuste o tamanho da imagem */
  height: auto; /* Mantém a proporção da imagem */
}

h1 {
  font-size: 20px;  /* Ajuste o tamanho da fonte para um tamanho mais adequado */
  font-weight: bold;
}

/* Estilo para o carrossel */
.carrossel-container {
  margin: 20px 0;
  width: 100%;
}

.swiper-slide img {
  width: 80%; /* Ajuste a largura para 80% da largura do slide */
  height: auto; /* Mantém a proporção da imagem */
  max-height: 300px; /* Define uma altura máxima para as imagens */
  object-fit: contain; /* Garante que as imagens mantenham sua proporção */
  margin: 0 auto; /* Centraliza a imagem dentro do slide */
}

/* Corpo */
.paragrafos-container {
  width: 95%; /* Aumenta a largura para 95% da tela */
  max-width: 1200px; /* Aumenta a largura máxima para 1200px */
  margin: 0 auto; /* Centraliza o contêiner horizontalmente */
  padding: 20px;
}

.paragrafos-container p {
  margin-bottom: 30px;
  text-align: justify; /* Justifica o texto */
  padding-right: 20px; /* Adiciona um padding à direita para afastar o texto das bordas */
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
  