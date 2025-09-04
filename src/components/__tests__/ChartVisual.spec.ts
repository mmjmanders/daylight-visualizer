import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import waitForExpect from 'wait-for-expect';
import { global } from '../../__tests__/globalMock';
import ChartVisual from '../ChartVisual.vue';

describe('ChartVisual.vue', () => {
  test('should render component', async () => {
    const wrapper = shallowMount(ChartVisual, {
      global: {
        ...global,
        stubs: ['highcharts'],
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

  test('should have polar chart', async () => {
    const wrapper = shallowMount(ChartVisual, {
      global: {
        ...global,
        stubs: ['highcharts'],
      },
      props: {
        chartData: {
          chartType: 'polar',
          data: [],
        },
      },
    });
    waitForExpect(() => {
      expect(wrapper.get('.highcharts-container.polar')).toBeDefined();
      expect(wrapper.get('.highcharts-container.line')).not.toBeDefined();
    });
  });

  test('should have line chart', async () => {
    const wrapper = shallowMount(ChartVisual, {
      global: {
        ...global,
        stubs: ['highcharts'],
      },
      props: {
        chartData: {
          chartType: 'line',
          data: [],
        },
      },
    });
    waitForExpect(() => {
      expect(wrapper.get('.highcharts-container.line')).toBeDefined();
      expect(wrapper.get('.highcharts-container.polar')).not.toBeDefined();
    });
  });
});
