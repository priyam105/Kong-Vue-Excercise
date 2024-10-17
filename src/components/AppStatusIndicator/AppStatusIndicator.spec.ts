import { describe, it, expect } from 'vitest'
import StatusIndicator from './AppStatusIndicator.vue'
import { mount } from '@vue/test-utils'

describe('AppStatusIndicator.vue', () => {

  it('renders the StatusIndicator component with Published label when status:true props is passed', () => {
    const wrapper = mount(StatusIndicator, {
      props: {
        status: true,
      },
    })

    const indicator = wrapper.find('.status-indicator')
    expect(indicator.exists()).toBe(true)
    expect(indicator.text()).includes('Published')
  })
  it('renders the StatusIndicator component with Published label when status:false props is passed', () => {
    const wrapper = mount(StatusIndicator, {
      props: {
        status: false,
      },
    })

    const indicator = wrapper.find('.status-indicator')
    expect(indicator.exists()).toBe(true)
    expect(indicator.text()).includes('Unpublished')
  })
})