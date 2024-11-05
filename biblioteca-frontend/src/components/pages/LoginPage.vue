<template>
  <div class="body_login">
    <header class="header_login">
      <img src="@/assets/logo.png" alt="Ícone Logo" class="icon-logo" />
      <h1 class="page-title">Login</h1>
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
        const response = await fetch('http://localhost:5000/login', {
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
          console.log("Login:", data.message);
          // Redirecionar ou armazenar o token de sessão, conforme necessário
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
.body_login {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: white;
  height: 100%;
  overflow: hidden;
}

.header_login {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
}

.icon-logo {
  width: 100px;
  height: auto;
  margin-right: 10px;
}

.page-title {
  font-size: 24px;
  color: black;
}

.container {
  max-width: 400px;
  margin: 150px auto;
  text-align: center;
}

.welcome-text {
  font-size: 20px;
  margin: 20px 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

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

.login-button:hover {
  background-color: #333;
}

.reset-password {
  margin-top: 30px;
  color: #4197F1;
  text-decoration: none;
}

.reset-password:hover {
  text-decoration: underline;
}

.create-account {
  margin-top: 20px;
  color: black;
}

.create-link {
  color: #4197F1;
  text-decoration: none;
}

.create-link:hover {
  text-decoration: underline;
}

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
