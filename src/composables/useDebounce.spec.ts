import { ref } from 'vue'
import { describe, it, expect } from 'vitest'
import useDebounce from './useDebounce'

describe('useDebounce', () => {
  it('should return the debounced value after the specified delay', async () => {
    const value = ref('initial')
    const delay = 200
    const debouncedValue = useDebounce(value, delay)
    expect(debouncedValue.value).toBe('initial')
    value.value = 'changed'
    expect(debouncedValue.value).toBe('initial')
    await new Promise((resolve) => setTimeout(resolve, delay + 10))
    expect(debouncedValue.value).toBe('changed')
  })
})
