import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'leaflet/dist/leaflet.css';
import { createPinia } from 'pinia'


const app = createApp(App);
app.use(createPinia());
app.mount('#app');
