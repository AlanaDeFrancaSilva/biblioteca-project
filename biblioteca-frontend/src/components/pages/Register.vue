<template> 

<div class="Register-page">

  <head>
      <!-- Link para o Google Fonts -->
       <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet">
      </head>    
      <!-- Cabeçalho -->
       <header class="cabecalho">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo" class="logo-icon">
          <h1 class="title">Cadastro</h1>
        </div>
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
import axios from 'axios'; // Importa a biblioteca axios para realizar requisições HTTP

export default {
  name: 'RegisterPage', // Nome do componente Vue.js

  // A função data() retorna o estado do componente, ou seja, as variáveis que armazenam informações
  data() {
    return {
      name: '', // Armazena o nome do usuário
      email: '', // Armazena o e-mail do usuário
      userType: '', // Armazena o tipo de usuário (Aluno, Professor, Bibliotecário, etc.)
      nif: '', // Armazena o NIF (número de identificação fiscal) - para professores e bibliotecários
      rm: '', // Armazena o RM (registro do aluno) - para alunos
      phone: '', // Armazena o número de telefone do usuário
      password: '', // Armazena a senha do usuário
      confirmPassword: '', // Armazena a confirmação da senha
      errorMessage: '' // Armazena mensagens de erro que serão exibidas no frontend
    };
  },

  // Métodos que podem ser utilizados no componente
  methods: {
    // Método toggleFields (exibido com v-if no Vue) que pode ser usado para alternar campos dinamicamente
    toggleFields() {
      // O Vue já cuida da exibição condicional com v-if, portanto o método está vazio
    },

    // Método para validar os campos e garantir que apenas números sejam inseridos em alguns campos
    validateInput(field) {
      // Remove caracteres não numéricos dependendo do campo
      if (field === 'nif') {
        this.nif = this.nif.replace(/\D/g, ''); // Remove qualquer caractere não numérico do campo 'nif'
      } else if (field === 'rm') {
        this.rm = this.rm.replace(/\D/g, ''); // Remove qualquer caractere não numérico do campo 'rm'
      } else if (field === 'phone') {
        this.phone = this.phone.replace(/\D/g, ''); // Remove qualquer caractere não numérico do campo 'phone'
      }
    },

    // Método assíncrono para lidar com o registro do usuário
    async handleRegister() {
      // Verifica se as senhas coincidem
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'As senhas não coincidem.'; // Exibe uma mensagem de erro caso as senhas não batam
        return; // Interrompe a execução do código caso as senhas não coincidam
      }

      // Limpa a mensagem de erro se as senhas coincidirem
      this.errorMessage = '';

      // Criação de um objeto com os dados do usuário a ser enviado para o backend
      let userData = {
        name: this.name, // Nome do usuário
        email: this.email, // E-mail do usuário
        userType: this.userType, // Tipo de usuário (Aluno, Professor, Bibliotecário)
        phone: this.phone, // Telefone do usuário
        password: this.password, // Senha do usuário
      };

      // Condicional para adicionar campos específicos para tipos de usuários diferentes
      if (this.userType === 'Aluno') {
        userData.rm = this.rm; // Se for aluno, inclui o campo RM
      } else if (this.userType === 'Professor' || this.userType === 'Bibliotecário') {
        userData.nif = this.nif; // Se for professor ou bibliotecário, inclui o campo NIF
      }

      try {
        // Realiza uma requisição POST para a API para criar o usuário
        const response = await axios.post('http://localhost:5000/api/usuarios', userData);

        // Após o sucesso no cadastro, o usuário será redirecionado para uma página específica
        const createdUser = response.data; // Recebe a resposta da API (dados do usuário criado)

        // Verifica o tipo de usuário e direciona para a página apropriada
        if (createdUser.userType === 'Bibliotecário') {
          this.$router.push('/adminPanel'); // Redireciona bibliotecário para o dashboard
        } else {
          this.$router.push('/booksHome'); // Redireciona outros tipos de usuário para a lista de livros
        }

        alert("Cadastro realizado com sucesso!"); // Exibe um alerta de sucesso
      } catch (error) {
        // Caso haja erro, exibe uma mensagem de erro
        console.error(error); // Exibe o erro no console para depuração

        if (error.response) {
          // Se o erro vier da resposta da API, exibe a mensagem de erro retornada pela API
          this.errorMessage = error.response.data.message || 'Erro ao cadastrar, tente novamente.';
        } else {
          // Caso não haja resposta da API, exibe uma mensagem genérica de erro
          this.errorMessage = 'Erro ao cadastrar, tente novamente.';
        }
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
  margin: 150px auto; /* Espaço superior para não cobrir com o cabeçalho fixo */
  text-align: center;
  padding-top: 80px; /* Ajuste do padding para que o conteúdo não sobreponha o cabeçalho */
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
