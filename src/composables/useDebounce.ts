import { onBeforeUnmount, ref, watch, type Ref } from 'vue'

export default function useDebounce<T>(value: Ref<any>, delay: number): Ref<any> {
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
  onBeforeUnmount(() => {
    if (timeout) {
      clearTimeout(timeout)
    }
  })

  return debouncedValue
}
