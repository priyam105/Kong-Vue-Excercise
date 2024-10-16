import { mount } from '@vue/test-utils'
import Stats from './AppStats.vue'
import { describe, expect, it } from 'vitest'
import services from '../../../mocks/services'
describe('AppStats.vue', () => {
  it('renders the Stats component when the correct props are passed', () => {
    const wrapper = mount(Stats, {
      props: {
        list: services[0].metrics,
      },
    })
    console.log(wrapper.html())
    const listItems = wrapper.find('.stats__list').findAll('li')
    expect(listItems).toHaveLength(3)
  })

  it('renders the list in proper sequence when correct props are passed', () => {
    const wrapper = mount(Stats, {
      props: {
        list: services[0].metrics,
      },
    })
    const expectedValues = {
      latency: '0.46ms',
      uptime: '96.43%',
      requests: '317K',
      errors: '8.65%',
    }

    const listItems = wrapper.find('.stats__list').findAll('li')
    const requestErrorSection = listItems[2].find('.requests-error')
    expect(listItems[0].find('.value').text()).toBe(expectedValues.latency)
    expect(listItems[1].find('.value').text()).toBe(expectedValues.uptime)
    expect(requestErrorSection.findAll('.value')[0].text()).toBe(expectedValues.requests)
    expect(requestErrorSection.findAll('.value')[1].text()).toBe(expectedValues.errors)

  })
})