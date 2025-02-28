import { describe, expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  test('it should mount the app', async () => {
    const wrapper = shallowMount(App)
    expect(wrapper.find('h1').text()).toContain('Daylight Visualizer')
  })
})
