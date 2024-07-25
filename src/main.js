import { createApp } from 'vue';
import VueTheMask from 'vue-the-mask';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
app.use(VueTheMask);
app.mount('#app');
