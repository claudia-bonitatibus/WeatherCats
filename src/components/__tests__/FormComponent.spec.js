import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FormComponent from '../FormComponent.vue'

describe('FormComponent', () => {
    it('should render all form fields', () => {
        const wrapper = mount(FormComponent)
        expect(wrapper.text()).toContain('What Should I Wear Today?')
        expect(wrapper.text()).toContain('ZIP Code:')
        expect(wrapper.html()).toContain('textArea')
        expect(wrapper.html()).toContain('radioItem')
        expect(wrapper.html()).toContain('button')
        expect(wrapper.text()).toContain('How do cats wear pants? On two legs')
    })
})