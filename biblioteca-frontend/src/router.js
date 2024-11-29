import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/pages/LoginPage.vue';
import Register from './components/pages/Register.vue';
import AdminPanel from './components/pages/AdminPanel.vue';
import Dashboard from './components/pages/Dashboard.vue';
import HomePage from './components/pages/HomePage.vue';
import BooksHome from './components/pages/BooksHome.vue';
import BookForm from './components/pages/BookForm.vue';
import BookL from './components/pages/BookList.vue';
import Perfil from './components/pages/PerfilPage.vue';
import Csobre from './components/pages/CabecalhoSobre.vue';

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: Register }, // Página de registro
  { path: '/adminPanel', component: AdminPanel }, // Página de gerenciamento
  { path: '/dashboard', component: Dashboard }, // Página do dashboard
  { path: '/', component: HomePage }, // Página inicial
  { path: '/booksHome', component: BooksHome },
  { path: '/bookForm', component: BookForm },
  { path: '/booksList', component: BookL },
  { path: '/PerfilPage', component: Perfil },
  { path: '/Csobre', component: Csobre },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
