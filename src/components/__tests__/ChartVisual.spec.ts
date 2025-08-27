import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import { global } from '../../__tests__/globalMock';
import ChartVisual from '../ChartVisual.vue';
import HighchartsVue from 'highcharts-vue';
import waitForExpect from 'wait-for-expect';

describe('ChartVisual.vue', () => {
  test('should render component', async () => {
    const wrapper = mount(ChartVisual, {
      global: {
        ...global,
        plugins: [...global.plugins, HighchartsVue],
      },
      props: {
        chartData: {
          chartType: 'polar',
          data: [],
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  test('should have no data', async () => {
    const wrapper = mount(ChartVisual, {
      global: {
        ...global,
        plugins: [...global.plugins, HighchartsVue],
      },
      props: {
        chartData: {
          chartType: 'polar',
          data: [],
        },
      },
    });
    waitForExpect(() => {
      expect(wrapper.get('.highcharts-series > path.highcharts-area').attributes('d')).toBe(
        'M 0 0',
      );
    });
  });

  test('should have chart', async () => {
    const wrapper = mount(ChartVisual, {
      global: {
        ...global,
        plugins: [...global.plugins, HighchartsVue],
      },
      props: {
        chartData: {
          chartType: 'polar',
          data: [
            {
              date: 1700000000000,
              sunrise: 6 * 3600,
              sunset: 18 * 3600,
              day_length: '12:00:00',
              timezone: 'UTC',
            },
          ],
        },
      },
    });
    waitForExpect(() => {
      expect(wrapper.get('.highcharts-series > path.highcharts-area').attributes('d')).not.toBe(
        'M 0 0',
      );
      expect(wrapper.get('.highcharts-xaxis-grid.highcharts-radial-axis-grid')).toBeTruthy();
    });
  });
});
