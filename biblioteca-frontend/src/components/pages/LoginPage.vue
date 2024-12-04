<template>
  <div class="Login-page">
    
    <head>
      <!-- Link para o Google Fonts -->
       <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet">
      </head>    
      <!-- Cabeçalho -->
       <header class="cabecalho">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo" class="logo-icon">
          <h1 class="title">Login</h1>
        </div>
       </header>

    <div class="container">
      <p class="welcome-text">Entrar no Mange Library</p>

      <form class="login-form" @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="E-mail" required />
        <input type="password" v-model="password" placeholder="Senha" required />
        <button type="submit" class="login-button">Conecte-se</button>
      </form>

      <a href="#" class="reset-password">Redefinir senha</a>
      <p class="create-account">Não tem conta? <router-link to="/register" class="create-link">Crie uma</router-link></p>
      <router-link to="/" class="btn-back">Voltar para Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
  async handleLogin() {
    try {
      const response = await fetch('http://localhost:5000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Tipo de usuário:", data.userType); // Verifica o tipo de usuário
        if (data.userType === 'Professor' || data.userType === 'Aluno') {
          console.log("Redirecionando para /books");
          this.$router.push('/booksHome');
        } else if (data.userType === 'Bibliotecário') {
          console.log("Redirecionando para /adminPanel");
          this.$router.push('/adminPanel');
        }
      } else {
        console.error(data.message);
        // Exibir mensagem de erro ao usuário
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }
}
};
</script>

<style scoped>
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
  font-size: 20px; /* Tamanho da fonte */
  font-weight: bold;
  margin-left: 0px;
}


/* Container do conteúdo da página de login */
.container {
  max-width: 400px;
  margin: 180px auto; /* Espaço superior para não cobrir com o cabeçalho fixo */
  text-align: center;
  padding-top: 80px; /* Ajuste do padding para que o conteúdo não sobreponha o cabeçalho */
}

/* Texto de boas-vindas */
.welcome-text {
  font-size: 20px;
  margin: 20px 0;
}

/* Formulário de login */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Estilo dos campos de input */
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* Botão de login */
.login-button {
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
}

/* Efeito hover do botão de login */
.login-button:hover {
  background-color: #333;
}

/* Link de redefinir senha */
.reset-password {
  margin-top: 30px;
  color: #4197F1;
  text-decoration: none;
}

.reset-password:hover {
  text-decoration: underline;
}

/* Texto para criar uma conta */
.create-account {
  margin-top: 20px;
  color: black;
}

/* Link para criar conta */
.create-link {
  color: #4197F1;
  text-decoration: none;
}

.create-link:hover {
  text-decoration: underline;
}

/* Botão de voltar para a home */
.btn-back {
  display: block;
  margin-top: 20px;
  color: #4197F1;
  text-decoration: none;
}

.btn-back:hover {
  text-decoration: underline;
}
</style>
