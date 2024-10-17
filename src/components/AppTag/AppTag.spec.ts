import { mount } from '@vue/test-utils'
import Tag from './AppTag.vue'
import { describe, expect, it } from 'vitest'

describe('AppTag.vue', () => {
  const wrapper = mount(Tag, {
    props: {
      label: 'Dummy',
    },
  })
  it('renders the Tag component when correct props are passed', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findTestId('tag__label').text()).toBe('Dummy')

  })
})