import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './AppButton.vue' // Assuming this is the correct path

describe('Button.vue', () => {

  it('renders correctly for a button type (default)', async () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Click me',
      },
    })

    // Check if the button is rendered
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
    console.log(button.attributes())
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



  it('renders the icon on the right when showIconOnRight is true', async () => {
    const wrapper = mount(Button, {
      props: {
        showIconOnRight: true,
        icon: 'right-icon',
        label: 'Button with right icon',
      },
    })

    const rightIcon = wrapper.find('span:last-of-type')
    expect(rightIcon.text()).toBe('right-icon')
    expect(wrapper.text()).toContain('Button with right icon')
  })

  it('renders the icon both on the left and right when both showIconOnLeft and showIconOnRight are true', async () => {
    const wrapper = mount(Button, {
      props: {
        showIconOnLeft: true,
        showIconOnRight: true,
        icon: 'double-icon',
        label: 'Button with double icon',
      },
    })

    const leftIcon = wrapper.find('span:first-of-type')
    const rightIcon = wrapper.find('span:last-of-type')

    expect(leftIcon.text()).toBe('double-icon')
    expect(rightIcon.text()).toBe('double-icon')
    expect(wrapper.text()).toContain('Button with double icon')
  })


})
