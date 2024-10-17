import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '../AppHeader/AppHeader.vue'


describe('AppHeader.vue', () => {
  const headerItems = [
    {
      id: 1,
      icon: '',
      label: 'Organization',
      link: '/organization',
    },
    {
      id: 2,
      icon: '',
      label: 'Settings',
      link: '/settings',
    },
    {
      id: 3,
      icon: '',
      label: 'user',
      link: '/user',
    },
  ]
  const wrapper = mount(Header, {
    props: {
      headerLogoText: 'Test',
      linkItems: headerItems,
    },
  })
  it('renders the header component on the UI when props are passed', () => {
    expect(wrapper.findTestId('header-nav').exists()).toBe(true)
  })

  it('renders the 4 header links on the UI when props are passed', () => {
    const links = wrapper.findTestId('header-nav').findAll('router-link')
    expect(links).toHaveLength(4)

  })
})

