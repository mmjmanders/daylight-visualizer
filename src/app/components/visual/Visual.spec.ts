import { mount } from '@vue/test-utils';
import { VueQueryPlugin } from '@tanstack/vue-query';
import Visual from './Visual.vue';

describe('Visual', () => {
  it('renders the Visual component properly', () => {
    const wrapper = mount(Visual, {
      global: {
        plugins: [VueQueryPlugin],
      },
    });
    expect(wrapper.findComponent(Visual).exists()).toBe(true);
  });
});
