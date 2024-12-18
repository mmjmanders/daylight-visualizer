import './styles.scss';
import { createApp } from 'vue';
import HighchartsVue from 'highcharts-vue';
import App from './app/App.vue';

const app = createApp(App);

app.use(HighchartsVue);
app.mount('#root');
