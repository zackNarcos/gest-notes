import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSweetalert2 from "vue-sweetalert2";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVuestic(undefined))
app.use(VueSweetalert2);
app.mount('#app')
