import { beforeEach, describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import { CoordinatesForm } from '#components';

describe('CoordinatesForm', () => {
  let component: VueWrapper;

  beforeEach(async () => {
    component = await mountSuspended(CoordinatesForm, {
      props: {
        modelValue: null,
      },
    });
  });

  it('should render', async () => {
    expect(component).toBeDefined();
  });
});
