import { beforeEach, describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import { ChartVisual } from '#components';

describe('ChartVisual', () => {
  let component: VueWrapper;

  beforeEach(async () => {
    component = await mountSuspended(ChartVisual, {
      props: {
        data: [],
      },
      global: {
        stubs: ['highcharts'],
      },
    });
  });

  it('should render', async () => {
    expect(component.find('.highcharts-light')).toBeTruthy();
  });
});
