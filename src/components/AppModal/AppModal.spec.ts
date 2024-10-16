import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '../AppModal/AppModal.vue'
import modalContents from '../../../mocks/modalContent'
describe('AppModal.vue', () => {
  it('renders the modal on the UI when correct props are passed', () => {
    const wrapper = mount(Modal, {
      props: {
        modalOpen: true,
        modalContents: modalContents,
      },
    })
    console.log(wrapper.html())
    expect(wrapper.find('.overlay').exists()).toBe(true)
    expect(wrapper.find('.modal').exists()).toBe(true)
    expect(wrapper.find('h4').text()).toBe('Versions (1)')
    expect(wrapper.find('.version-name').text()).toBe('v1.8.6')
    expect(wrapper.find('.version-desc').text()).toBe('Organized bifurcated hardware')
    expect(wrapper.find('.version-type').exists()).toBe(true)
    expect(wrapper.find('.version-dev-name').exists()).toBe(true)

  })

  it('adds last-column class dynamically to the modal grid if developers object is present', () => {
    const wrapper = mount(Modal, {
      props: {
        modalOpen: true,
        modalContents: modalContents,
      },
    })
    console.log(wrapper.html())

    expect(wrapper.find('.last-column').exists()).toBe(true)


  })



  it('doesn\'t add last-column class dynamically to the modal grid if developers object is present', () => {
    const modalContentWithoutDeveloper = modalContents.map((content) => {
      const { developerDetails, ...rest } = content
      return rest
    })
    const wrapper = mount(Modal, {
      props: {
        modalOpen: true,
        modalContents: modalContentWithoutDeveloper,
      },
    })
    console.log(wrapper.html())
    expect(wrapper.find('.last-column').exists()).toBe(false)


  })
})