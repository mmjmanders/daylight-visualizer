import { shallowMount } from '@vue/test-utils';
import App from './App.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders the App component properly', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.getComponent(App)).toBeTruthy();
  });
});
