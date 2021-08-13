import { createApp } from 'vue';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/arya-blue/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(PrimeVue).use(ToastService).use(router).mount('#app');
