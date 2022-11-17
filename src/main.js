import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'lib-flexible/flexible';
import { Lazyload } from 'vant';
import { List } from '@nutui/nutui';
import 'clusterize.js/clusterize.js';
import 'clusterize.js/clusterize.css';

const app = createApp(App);

app.use(Lazyload);
app.use(List);
app.use(router);

app.mount('#app');

