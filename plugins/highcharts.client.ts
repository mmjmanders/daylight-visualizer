import HighchartsVue from 'highcharts-vue';
import 'highcharts/highcharts-more';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(HighchartsVue);
});
