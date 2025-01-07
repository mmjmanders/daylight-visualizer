import './styles.scss';
import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import HighchartsVue from 'highcharts-vue';
import 'highcharts/highcharts-more';
import 'highcharts/modules/boost';
import App from './app/App.vue';

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(HighchartsVue);
app.mount('#root');
