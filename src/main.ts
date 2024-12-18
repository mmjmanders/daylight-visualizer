import './styles.scss';
import { createApp } from 'vue';
import HighchartsVue from 'highcharts-vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './app/App.vue';

const app = createApp(App);

app.use(HighchartsVue);
app.use(VueQueryPlugin);
app.mount('#root');
