import { ref } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import useServices from './useServices'
import servicesData from '../../mocks/services'

const mockedResponses = new Map().set(
  '/api/services',
  vi.fn(() => ({
    data: servicesData,
  })),
)

vi.mock('axios', async () => {
  const actual: any = await vi.importActual('axios')

  return {
    default: {
      ...actual.default,
      get: (url: string) =>
        vi
          .fn()
          .mockResolvedValue(
            mockedResponses.has(url)
              ? mockedResponses.get(url)!()
              : { data: null },
          )(),
    },
  }
})

describe('useServices composable', () => {
  let services: any
  let loading: any
  let error: any
  let getServices: any

  beforeEach(() => {
    services = ref([])
    loading = ref(false)
    error = ref(false)
    getServices = vi.fn()
  })

  it('should fetch services correctly when API call is successful', async () => {
    const {
      getServices: fetchServices,
      services: resultServices,
      loading: resultLoading,
      error: resultError,
    } = useServices()
    await fetchServices()
    expect(resultLoading.value).toBe(false)
    expect(resultError.value).toBe(false)
    expect(resultServices.value).toEqual(servicesData)
  })

  it('should handle errors correctly when API call fails', async () => {
    mockedResponses.set(
      '/api/services',
      vi.fn(() => {
        throw new Error('Request failed')
      }),
    )

    const {
      getServices: fetchServices,
      services: resultServices,
      loading: resultLoading,
      error: resultError,
    } = useServices()

    await fetchServices()
    expect(resultLoading.value).toBe(false)
    expect(resultError.value).toBe(true)
    expect(resultServices.value).toEqual([])
  })
})
