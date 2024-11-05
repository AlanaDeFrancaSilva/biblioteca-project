import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/pages/LoginPage.vue';
import Register from './components/pages/Register.vue';
import AdminPanel from './components/pages/AdminPanel.vue';
import Dashboard from './components/pages/Dashboard.vue';
import HomePage from './components/pages/HomePage.vue';
import BooksList from './components/pages/BooksList.vue';

// ... (restante do código do router)


const routes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: Register }, // Página de registro
  { path: '/adminPanel', component: AdminPanel }, // Página de gerenciamento
  { path: '/dashboard', component: Dashboard }, // Página do dashboard
  { path: '/', component: HomePage }, // Página inicial
  { path: '/books', component: BooksList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
