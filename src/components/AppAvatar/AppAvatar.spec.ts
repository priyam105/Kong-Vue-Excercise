import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppAvatar from './AppAvatar.vue'
import appAvatarMock from '../../../mocks/avatarMetaData'
describe('AppAvatar.vue', () => {
  const wrapper = mount(AppAvatar, {
    props: {
      avatarMetaData: appAvatarMock,
    },
  })
  it('renders the component on the UI when avatarMetaData is passed as prop', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  it('renders the avatar image when avatarMetaDaa is passed as prop', () => {
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(appAvatarMock.avatar)
    expect(img.attributes('alt')).toBe(`${appAvatarMock.name}'s image`)
  })
})
