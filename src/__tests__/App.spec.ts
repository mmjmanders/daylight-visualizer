import { describe, test, expect, beforeEach } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import App from '../App.vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

describe('App.vue', () => {
  let component: VueWrapper<any>;

  beforeEach(() => {
    component = shallowMount(App, {
      global: {
        plugins: [VueQueryPlugin],
      },
    });
  });

  test('should render component', async () => {
    expect(component.exists()).toBe(true);
  });

  test('should have version element', async () => {
    expect(component.html()).toContain('v2.2');
  });
});
