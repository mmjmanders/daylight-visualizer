import { beforeEach, describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
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
        plugins: [createI18n({})],
      },
    });
  });

  it('should render', async () => {
    expect(component.find('.highcharts-light')).toBeTruthy();
  });
});
