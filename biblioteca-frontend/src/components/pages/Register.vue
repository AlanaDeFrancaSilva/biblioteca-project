<template> 
  <div>
    <header class="header_login">
      <img src="@/assets/logo.png" alt="Ícone Logo" class="icon-logo">
      <h1 class="page-title">Cadastro</h1>
    </header>

    <div class="container">
      <p class="welcome-text">Inscreva-se na Biblioteca Mange</p>

      <form class="login-form" @submit.prevent="handleRegister">
        <input type="text" v-model="name" placeholder="Nome" required>

        <input type="email" v-model="email" placeholder="E-mail" required>

        <select v-model="userType" @change="toggleFields" required>
          <option value="" disabled selected>Selecione o tipo de usuário</option>
          <option value="Professor">Professor</option>
          <option value="Aluno">Aluno</option>
          <option value="Bibliotecário">Bibliotecário</option>
        </select>

        <!-- Campo NIF, visível para Professor e Bibliotecário -->
        <div v-if="userType === 'Professor' || userType === 'Bibliotecário'" class="nif-field">
          <input type="text" v-model="nif" maxlength="7" placeholder="Digite seu NIF" @input="validateInput('nif')">
        </div>

        <!-- Campo RM, visível para Aluno -->
        <div v-if="userType === 'Aluno'" class="rm-field">
          <input type="text" v-model="rm" maxlength="7" placeholder="Digite seu RM" @input="validateInput('rm')">
        </div>

        <input type="tel" v-model="phone" placeholder="Digite seu Telefone" maxlength="11" @input="validateInput('phone')">

        <input type="password" v-model="password" placeholder="Senha" required>

        <input type="password" v-model="confirmPassword" placeholder="Confirmação de Senha" required>

        <button type="submit" class="login-button">Cadastrar</button>
      </form>

      <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>

      <a href="#" class="reset-password">Redefinir senha</a>

      <p class="create-account">Já tem uma conta? <router-link to="/login" class="create-link">Entrar</router-link></p>

      <router-link to="/" class="btn-back">Voltar para a Home</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      email: '',
      userType: '',
      nif: '',
      rm: '',
      phone: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    toggleFields() {
      // O Vue já cuida da exibição condicional com v-if
    },
    validateInput(field) {
      // Remove caracteres não numéricos
      if (field === 'nif') {
        this.nif = this.nif.replace(/\D/g, '');
      } else if (field === 'rm') {
        this.rm = this.rm.replace(/\D/g, '');
      } else if (field === 'phone') {
        this.phone = this.phone.replace(/\D/g, '');
      }
    },
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'As senhas não coincidem.';
        return; // Adiciona um return para evitar o fluxo continuado
      }

      this.errorMessage = '';

      // Remover campos desnecessários antes de enviar os dados
      let userData = {
        name: this.name,
        email: this.email,
        userType: this.userType,
        phone: this.phone,
        password: this.password,
      };

      // Verificar tipo de usuário e incluir o campo correto
      if (this.userType === 'Aluno') {
        userData.rm = this.rm; // Apenas incluir o RM para alunos
      } else if (this.userType === 'Professor' || this.userType === 'Bibliotecário') {
        userData.nif = this.nif; // Apenas incluir o NIF para professores e bibliotecários
      }

      try {
        const response = await axios.post('http://localhost:5000/api/usuarios', userData);

        // Redirecionar com base no tipo de usuário
        const createdUser = response.data;
        if (createdUser.userType === 'Bibliotecário') {
          this.$router.push('/dashboard');
        } else {
          this.$router.push('/bookslist');
        }

        alert("Cadastro realizado com sucesso!");
      } catch (error) {
        console.error(error);
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Erro ao cadastrar, tente novamente.';
        } else {
          this.errorMessage = 'Erro ao cadastrar, tente novamente.';
        }
      }
    }
  }
};
</script>

<style scoped>
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

input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
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
