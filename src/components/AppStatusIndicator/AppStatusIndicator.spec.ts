import { describe, it, expect } from 'vitest'
import StatusIndicator from './AppStatusIndicator.vue'
import { mount } from '@vue/test-utils'

describe('AppStatusIndicator.vue', () => {

  it('renders the StatusIndicator component with Published label when `published` status props is passed', () => {
    const wrapper = mount(StatusIndicator, {
      props: {
        status: 'Published',
      },
    })

    const indicator = wrapper.findTestId('status-indicator')
    expect(indicator.exists()).toBe(true)
    expect(indicator.text()).includes('Published')
  })
  it('renders the StatusIndicator component with Unpublished label when `Unpublished`status props is passed', () => {
    const wrapper = mount(StatusIndicator, {
      props: {
        status: 'Unpublished',
      },
    })

    const indicator = wrapper.findTestId('status-indicator')
    expect(indicator.exists()).toBe(true)
    expect(indicator.text()).includes('Unpublished')
  })

  it('renders the StatusIndicator component with In Progress label when `In Progress`status props is passed', () => {
    const wrapper = mount(StatusIndicator, {
      props: {
        status: 'In Progress',
      },
    })

    const indicator = wrapper.findTestId('status-indicator')
    expect(indicator.exists()).toBe(true)
    expect(indicator.text()).includes('In Progress')
  })
})