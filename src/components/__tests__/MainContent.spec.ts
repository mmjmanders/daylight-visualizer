import { vi, describe, test, expect, afterEach, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MainContent from '../MainContent.vue';
import { global } from './globalMock';
import waitForExpect from 'wait-for-expect';
import InputForm from '../InputForm.vue';

describe('MainContent.vue', () => {
  let component: VueWrapper<any>;

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

    component = mount(MainContent, {
      global,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  test('should render component', async () => {
    expect(component.exists()).toBe(true);
  });

  test.each([
    {
      chartType: 'polar',
    },
    { chartType: 'line' },
  ])('should have chart type $chartType', async ({ chartType }) => {
    await component.get('input#address').setValue('New York City');
    await component.get('select#chartType').setValue(chartType);
    await component.get('form').trigger('submit.prevent');
    await waitForExpect(async () => {
      const chartContainer = component.find('.chart-container');
      expect(chartContainer.exists()).toBe(true);
      expect(chartContainer.classes()).toContain(chartType);
    });
  });

  test('should switch chart type when changed', async () => {
    await component.get('input#address').setValue('New York City');
    await component.get('select#chartType').setValue('line');
    await component.get('form').trigger('submit.prevent');
    await waitForExpect(async () => {
      expect(component.find('.chart-container.line').exists()).toBe(true);
      expect(component.find('.chart-container.polar').exists()).toBe(false);
    });

    await component.get('select#chartType').setValue('polar');
    await waitForExpect(() => {
      expect(component.find('.chart-container.line').exists()).toBe(false);
      expect(component.find('.chart-container.polar').exists()).toBe(true);
      console.log(component.getComponent(InputForm).vm);
    });
  });
});
