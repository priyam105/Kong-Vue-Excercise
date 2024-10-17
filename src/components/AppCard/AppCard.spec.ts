import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from './AppCard.vue'
import Tag from '../AppTag/AppTag.vue'
import StatusIndicator from '../AppStatusIndicator/AppStatusIndicator.vue'
import Avatar from '../AppAvatar/AppAvatar.vue'
import services from '../../../mocks/services'
describe('Card.vue', () => {

  it('renders service name and description', () => {
    const wrapper = mount(Card, {
      props: {
        serviceDetails: services[1],
      },
    })
    const card = wrapper.findTestId('card')
    console.log(card.html())
    expect(card.exists()).toBe(true)
    expect(card.find(('[data-testid="text-header"]')).text()).toBe('Small Steel Salad')
    expect(card.find(('[data-testid="text-description"]')).text()).toBe('Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles')
  })

  it('renders the tag and status indicator', () => {
    const wrapper = mount(Card, {
      props: {
        serviceDetails: services[1],
      },
    })
    expect(wrapper.findComponent(Tag).exists()).toBe(true)
    expect(wrapper.findComponent(StatusIndicator).exists()).toBe(true)
  })
  it('emits the cardClickedEvent when the card is clicked', async () => {
    const wrapper = mount(Card, {
      props: {
        serviceDetails: services[1],
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('cardClickedEvent')).toBeTruthy()

  })
  it('renders two avatars and avatar placeholder for additional developers', () => {
    const wrapper = mount(Card, {
      props: {
        serviceDetails: services[1],
      },
    })

    const avatars = wrapper.findAllComponents(Avatar)
    expect(avatars.length).toBe(2) // Only first 2 avatars should render
    expect(wrapper.findTestId('avatar-placeholder').text()).toBe('+2') // Placeholder for the 3rd developer
  })

  it('does not render avatars if no developers are present', () => {
    const serviceWithoutDevelopers = {
      ...services[1],
      versions: [],
    }

    const wrapper = mount(Card, {
      props: {
        serviceDetails: serviceWithoutDevelopers,
      },
    })

    expect(wrapper.findTestId('card__details_avatar').exists()).toBe(false)
  })
})
