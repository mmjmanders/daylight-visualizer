import { mount } from '@vue/test-utils';
import CoordinatesForm from './CoordinatesForm.vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

describe('CoordinatesForm', () => {
  it('renders the CoordinatesForm component properly', () => {
    const wrapper = mount(CoordinatesForm, {
      props: {
        modelValue: null,
      },
      global: {
        plugins: [VueQueryPlugin],
      },
    });
    expect(wrapper.findComponent(CoordinatesForm).exists()).toBe(true);
  });
});
