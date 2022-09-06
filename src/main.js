import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persist';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/base.css';
import App from './App.vue';
import router from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app');
