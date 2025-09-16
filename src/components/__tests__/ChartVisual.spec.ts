import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
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
        data: [],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
