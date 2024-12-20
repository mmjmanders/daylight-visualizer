import { mount } from '@vue/test-utils';
import { VueQueryPlugin } from '@tanstack/vue-query';
import Visual from './Visual.vue';

describe('Visual', () => {
  it('renders the Visual component properly', () => {
    const wrapper = mount(Visual, {
      props: {
        data: [],
      },
      global: {
        plugins: [VueQueryPlugin],
        stubs: ['highcharts'],
      },
    });
    expect(wrapper.findComponent(Visual).exists()).toBe(true);
  });
});
