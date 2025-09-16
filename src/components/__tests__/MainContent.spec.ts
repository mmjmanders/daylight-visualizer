import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { global } from '../../__tests__/globalMock';
import MainContent from '../MainContent.vue';

describe('MainContent.vue', () => {
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
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  test('should render component', async () => {
    const wrapper = mount(MainContent, {
      global: { ...global, stubs: ['HighchartsVue', 'Highcharts'] },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
