import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { CoordinatesForm } from '#components';

describe('CoordinatesForm', () => {
  it('should render', async () => {
    const component = await mountSuspended(CoordinatesForm, {
      props: {
        modelValue: null,
      },
    });
    expect(component.find('form')).toBeTruthy();
  });
});
