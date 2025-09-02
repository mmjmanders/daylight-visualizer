import { describe, test, expect, beforeEach } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import App from '../App.vue';
import { global } from './globalMock';

const { VITE_APP_VERSION: version } = import.meta.env;

describe('App.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      global,
    });
  });

  test('should render component', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('should have version element', async () => {
    expect(wrapper.html()).toContain(`v${version}`);
  });
});
