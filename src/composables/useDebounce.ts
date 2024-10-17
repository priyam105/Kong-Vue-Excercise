import { ref, watch, type Ref } from 'vue'

export default function useDebounce<T>(value: Ref<T>, delay: number): any {
  // Set initial value
  const debouncedValue = ref<T>(value.value)

  let timeout: ReturnType<typeof setTimeout> | null = null


  watch(value, (newValue) => {
    if (timeout != null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      debouncedValue.value = newValue

    }, delay)
  })

  return debouncedValue
}
