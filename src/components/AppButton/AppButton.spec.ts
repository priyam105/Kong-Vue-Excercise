import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './AppButton.vue' // Assuming this is the correct path

describe('Button.vue', () => {

  it('renders correctly for a button type (default)', async () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Click me',
      },
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Click me')
  })




  it('applies the correct appearance class', async () => {
    const wrapper = mount(Button, {
      props: {
        appearance: 'secondary',
        label: 'Secondary button',
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('secondary-button')
  })

  it('applies the disabled class and does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        isDisabled: true,
        label: 'Disabled button',
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('disabled')
    expect(button.attributes('disabled')).toBeDefined()

  })

  it('fires the buttonClicked event when clicked and not disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        isDisabled: false,
        label: 'Enabled button',
      },
    })

    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted('buttonClicked')).toBeTruthy()
  })

})
