import { vi, describe, test, expect, afterEach, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MainContent from '../MainContent.vue';
import { global } from '../../__tests__/globalMock';
import waitForExpect from 'wait-for-expect';

describe('MainContent.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            results: [
              {
                lat: 40.7127281,
                lon: -74.0060152,
                timezone: { name: 'America/New_York' },
              },
            ],
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            status: 'OK',
            results: [
              {
                date: '2025-08-26',
                timezone: 'America/New_York',
                sunrise: '06:00:00',
                sunset: '20:00:00',
                day_length: '14:00:00',
              },
            ],
          }),
        }),
    );

    wrapper = mount(MainContent, {
      global: { ...global, stubs: ['HighchartsVue', 'Highcharts'] },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  test('should render component', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  test.each([
    {
      chartType: 'polar',
    },
    { chartType: 'line' },
  ])('should have chart type $chartType', async ({ chartType }) => {
    await wrapper.get('input#address').setValue('New York City');
    await wrapper.get('select#chartType').setValue(chartType);
    await wrapper.get('form').trigger('submit.prevent');
    await waitForExpect(async () => {
      const chartContainer = wrapper.find('.chart-container');
      expect(chartContainer.exists()).toBe(true);
      expect(chartContainer.classes()).toContain(chartType);
    });
  });

  test('should switch chart type when changed', async () => {
    await wrapper.get('input#address').setValue('New York City');
    await wrapper.get('select#chartType').setValue('line');
    await wrapper.get('form').trigger('submit.prevent');
    await waitForExpect(async () => {
      expect(wrapper.find('.chart-container.line').exists()).toBe(true);
      expect(wrapper.find('.chart-container.polar').exists()).toBe(false);
    });

    await wrapper.get('select#chartType').setValue('polar');
    await waitForExpect(() => {
      expect(wrapper.find('.chart-container.line').exists()).toBe(false);
      expect(wrapper.find('.chart-container.polar').exists()).toBe(true);
    });
  });
});
