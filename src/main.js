import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'lib-flexible/flexible';
import { Lazyload } from 'vant';

const app = createApp(App);

app.use(Lazyload);
app.use(router);

app.mount('#app');

