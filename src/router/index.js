import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import SignIn from '../components/signIn.vue';
import SignUp from '../components/signUp.vue';

const routes = [
  {
    path: '/', // only views can be routed
    name: 'home',
    component: HomeView,
  },
  {
    path: '/auth', // only views ca be routed
    name: 'auth',
    component: AuthView,
    children: [
      { path: 'login', component: SignIn },
      { path: 'register', component: SignUp },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
