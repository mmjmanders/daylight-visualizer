import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { ChartVisual } from '#components';

describe('ChartVisual', () => {
  it('should render', async () => {
    const component = await mountSuspended(ChartVisual, {
      props: {
        data: [],
      },
    });
    expect(component.find('.highcharts-light')).toBeTruthy();
  });
});
