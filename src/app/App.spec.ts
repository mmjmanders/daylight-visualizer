import { shallowMount } from '@vue/test-utils';
import App from './App.vue';

describe('App', () => {
  it('renders the App component properly', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.getComponent(App)).toBeTruthy();
  });
});
