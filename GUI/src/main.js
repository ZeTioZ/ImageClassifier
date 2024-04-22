import { createApp } from 'vue';
import '@/assets/css/main.css';
import App from './App.vue';

import Notifications from '@kyvg/vue3-notification';

import axios from 'axios';
import VueAxios from 'vue-axios';

// axios setup
axios.defaults.baseURL = 'http://localhost:8000';


const app = createApp(App);

app.use(VueAxios, axios);
app.use(Notifications);

app.mount('#app');
