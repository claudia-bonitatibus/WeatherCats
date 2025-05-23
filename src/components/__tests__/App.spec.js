import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../../App.vue'
import {state} from '../../state.js'

describe('App', () => {
    it('should show input form if there are no weather results to display', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('What Should I Wear Today?')
    expect(wrapper.text()).not.toContain(`It's raining outside. Make sure to wear a raincoat or bring an umbrella.`)
  })
  it('should show weather description if there are results to display', () => {
    state.precipitation = 0.1;
    state.temperature = 68;
    const wrapper = mount(App)
    expect(wrapper.text()).toContain(`It's raining outside. Make sure to wear a raincoat or bring an umbrella.`)
  })
})
