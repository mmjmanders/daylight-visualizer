import { shallowMount, VueWrapper } from '@vue/test-utils';
import { describe, test, expect, beforeEach } from 'vitest';
import { global } from '../../__tests__/globalMock';
import ChartVisual from '../ChartVisual.vue';
import waitForExpect from 'wait-for-expect';

describe('ChartVisual.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(ChartVisual, {
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
  });

  test('should render component', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('should have polar chart', async () => {
    wrapper = shallowMount(ChartVisual, {
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
      expect(wrapper.get('.highcharts-container.polar')).toBeTruthy();
    });
  });

  test('should have line chart', async () => {
    wrapper = shallowMount(ChartVisual, {
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
      expect(wrapper.get('.highcharts-container.line')).toBeTruthy();
    });
  });
});
