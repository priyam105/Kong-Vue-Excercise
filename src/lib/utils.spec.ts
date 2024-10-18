import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { formatMetric, timeAgo, getUserName } from './utils'

describe('formatMetric', () => {
  it('should format latency as "123.45ms"', () => {
    const result = formatMetric('latency', 123.45)
    expect(result).toBe('123.45ms')
  })

  it('should format uptime as "99.99%"', () => {
    const result = formatMetric('uptime', 0.9999)
    expect(result).toBe('99.99%')
  })

  it('should format requests as "1K"', () => {
    const result = formatMetric('requests', 1000)
    expect(result).toBe('1K')
  })

  it('should format errors as "0.50%"', () => {
    const result = formatMetric('errors', 0.005)
    expect(result).toBe('0.50%')
  })

  it('should return value as string for an unrecognized key', () => {
    const result = formatMetric('unknown', 123)
    expect(result).toBe('123')
  })
})

describe('timeAgo', () => {
  const originalDateNow = Date.now
  beforeEach(() => {
    Date.now = () => new Date('2024-01-01T12:00:00Z').getTime()
  })
  afterEach(() => {
    Date.now = originalDateNow
  })

  it('should return "10 seconds ago" for dates less than 60 seconds ago', () => {
    const result = timeAgo('2024-01-01T11:59:50Z')
    expect(result).toBe('10 seconds ago')
  })

  it('should return "2 days ago" for dates more than 1 day ago', () => {
    const result = timeAgo('2023-12-30T12:00:00Z')
    expect(result).toBe('2 days ago')
  })
})

describe('getUserName', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('should return the user name from localStorage', () => {
    localStorage.setItem('userName', 'Developer')
    const result = getUserName()
    expect(result).toBe('Developer')
  })

  it('should return "Guest" if no user name is found in localStorage', () => {
    const result = getUserName()
    expect(result).toBe('Guest')
  })
})
