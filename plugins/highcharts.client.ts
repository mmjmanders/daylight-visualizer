import HighchartsVue from 'highcharts-vue';
import 'highcharts/highcharts-more';
import 'highcharts/modules/boost-canvas';
import 'highcharts/modules/boost';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(HighchartsVue);
});
