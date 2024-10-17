import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '../AppModal/AppModal.vue'
import modalContents from '../../../mocks/modalContent'
import { timeAgo } from '@/lib/utils'
describe('AppModal.vue', () => {
  const wrapper = mount(Modal, {
    props: {
      modalOpen: true,
      modalContents: modalContents,
    },
  })
  it('renders the modal on the UI when correct props are passed', () => {
    console.log(wrapper.html())
    const developerDetailsContent = wrapper.find('.version-dev__details')
    expect(wrapper.find('.overlay').exists()).toBe(true)
    expect(wrapper.find('.modal').exists()).toBe(true)
    expect(wrapper.find('h4').text()).toBe(
      `Versions (${modalContents.length})`,
    )
    expect(wrapper.find('.version-name').text()).toBe(
      `v${modalContents[0].versionName}`,
    )
    expect(wrapper.find('.version-desc').text()).toBe(
      modalContents[0].versionDesc,
    )
    expect(developerDetailsContent.find('p:nth-child(1)').text()).toBe(
      modalContents[0].developerDetails.name,
    )
    expect(developerDetailsContent.find('p:nth-child(2)').text()).toBe(
      timeAgo(modalContents[0].modifiedDate),
    )
  })

  it('adds last-column class dynamically to the modal grid if developers object is present', () => {
    expect(wrapper.find('.last-column').exists()).toBe(true)
  })

  it("doesn't add last-column class dynamically to the modal grid if developers object is present", () => {
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

    expect(wrapper.find('.last-column').exists()).toBe(false)
  })
})
