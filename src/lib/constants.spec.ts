import { describe, it, expect, vi } from 'vitest'
import { CONSTANTS } from './constants'
import { getUserName } from './utils'

vi.mock('./utils', () => ({
  getUserName: vi.fn(() => 'Test User'),
}))

describe('CONSTANTS', () => {
  it('should have the correct app name', () => {
    expect(CONSTANTS.app).toBe('KONNECT')
  })

  it('should have the correct number of header items', () => {
    expect(CONSTANTS.headerItems.length).toBe(3)
  })

  it('should have correct properties in header items', () => {
    expect(CONSTANTS.headerItems[0]).toEqual({
      id: 1,
      icon: new URL('@/assets/icons/organization.svg', import.meta.url).href,
      label: 'Organization',
      link: '/organization',
    })

    expect(CONSTANTS.headerItems[1]).toEqual({
      id: 2,
      icon: new URL('@/assets/icons/gear.svg', import.meta.url).href,
      label: 'Settings',
      link: '/settings',
    })
  })

  it('should call getUserName and set the correct user label', () => {
    expect(getUserName).toHaveBeenCalled()

    expect(CONSTANTS.headerItems[2].label).toBe('Test User')
  })

  it('should have correct pagination settings', () => {
    expect(CONSTANTS.paginationRecordsPerPage).toBe(9)
  })

  it('should have correct debounce timer', () => {
    expect(CONSTANTS.debounceTimer).toBe(500)
  })

  it('should have correct refresh button timer', () => {
    expect(CONSTANTS.refreshButtonTimer).toBe(10000)
  })

  it('should have correct logo dimensions', () => {
    expect(CONSTANTS.logoHeight).toBe(26)
    expect(CONSTANTS.logoWidth).toBe(29)
  })
})
