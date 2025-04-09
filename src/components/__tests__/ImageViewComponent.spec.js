import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ImageViewComponent from '../ImageViewComponent.vue'

describe('ImageViewComponent', () => {
    it('should handle warm weather', () => {
    const wrapper = mount(
        ImageViewComponent, {
            props: {
                precipitation: 0,
                temperature: 75,
                selected: 'On two legs'
            },
      }
    )
    expect(wrapper.html()).toContain('warm_01.svg')
    expect(wrapper.text()).toContain(`It's very warm today. Dress lightly and don't forget your sunscreen.`)
  })
  
  it('should handle cool weather properly', () => {
    const wrapper = mount(
        ImageViewComponent, {
            props: {
                precipitation: 0,
                temperature: 64,
                selected: 'On four legs'
            },
      }
    )
    expect(wrapper.html()).toContain('cool_02.svg')
    expect(wrapper.text()).toContain(`It's a little chilly out. The purrfect weather for a light jacket or your favorite sweater.`)
  })

  it('should handle cold weather', () => {
    const wrapper = mount(
        ImageViewComponent, {
            props: {
                precipitation: 0,
                temperature: 32,
                selected: 'On two legs'
            },
      }
    )
    expect(wrapper.html()).toContain('cold_01.svg')
    expect(wrapper.text()).toContain(`It's cold today. Make sure you bundle up in a jacket and some cozy mittens. Add a pop of color for extra warmth.`)
  })

  it('should show precipitation instead of temperature description if it rains', () => {
    const wrapper = mount(
        ImageViewComponent, {
            props: {
                precipitation: 0.1,
                temperature: 45,
                selected: 'On four legs'
            },
      }
    )
    expect(wrapper.html()).toContain('rain_02.svg')
    expect(wrapper.text()).toContain(`It's raining outside. Make sure to wear a raincoat or bring an umbrella.`)
  })
})

