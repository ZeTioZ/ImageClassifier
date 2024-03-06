import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

// axios setup
axios.defaults.baseURL = 'http://localhost:3000';



const app = createApp(App);

app.use(VueAxios, axios);

app.mount('#app');
