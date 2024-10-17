import { vi, describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ServiceCatalog from './ServiceCatalog.vue'
import servicesData from '../../../mocks/services'
import Card from '../AppCard/AppCard.vue'
import Pagination from '../AppPagination/AppPagination.vue'
import Stats from '../AppStats/AppStats.vue'
import StatusIndicator from '../AppStatusIndicator/AppStatusIndicator.vue'
// Mock the axios module for fetching API services
const mockedResponses = new Map()
  .set('/api/services', vi.fn(() => ({
    data: servicesData,
  })))

vi.mock('axios', async () => {
  const actual: any = await vi.importActual('axios')
  return {
    default: {
      ...actual.default,
      // Mock get request responses
      get: (url: string) => vi.fn().mockResolvedValue(mockedResponses.get(url) !== undefined
        ? mockedResponses.get(url)()
        : undefined)(),
    },
  }
})

// Example component test for ServiceCatalog.vue
describe('ServiceCatalog', () => {
  it('shows the search input', async () => {
    // No `mockedResponses` modification needed; just use the default mocked response
    const wrapper = mount(ServiceCatalog)
    expect(wrapper.findTestId('search-input').isVisible()).toBe(true)
  })

  it('properly handles no services returned from the API', async () => {
    mockedResponses.get('/api/services').mockReturnValue({
      data: [],
    })
    const wrapper = mount(ServiceCatalog)
    await flushPromises()
    expect(wrapper.findTestId('no-results').isVisible()).toBe(true)
  })

  it('displays "Loading..." when services are being fetched', async () => {
    mockedResponses.get('/api/services').mockReturnValueOnce({
      data: [],
    })
    const wrapper = mount(ServiceCatalog)
    expect(wrapper.text()).toContain('Loading...')
  })

  it('renders its child components Cards, Pagination, Stats, StatusIndicators when api data is fetched successfully', async () => {
    mockedResponses.get('/api/services').mockReturnValueOnce({
      data: servicesData,
    })
    const wrapper = mount(ServiceCatalog)
    await flushPromises()

    const serviceCards = wrapper.findAllComponents(Card)
    expect(serviceCards.length).toBeGreaterThan(0)
    expect(wrapper.findComponent(Pagination).exists()).toBe(true)
    expect(wrapper.findComponent(Stats).exists()).toBe(true)
    expect(wrapper.findComponent(StatusIndicator).exists()).toBe(true)
  })

})
