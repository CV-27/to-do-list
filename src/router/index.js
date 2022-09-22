import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import SignIn from '../components/signIn.vue';
import SignUp from '../components/signUp.vue';
import RecoverPass from '../components/recoverPass.vue';

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
      { path: 'recovery', component: RecoverPass },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
