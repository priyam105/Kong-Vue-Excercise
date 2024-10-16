import { ref, onBeforeMount, watch, type Ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

// This composable is a simplified example for the exercise **and could likely be improved**.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

export default function useServices(searchQuery?: Ref<string>): any {
  console.log(searchQuery)
  const services = ref<any[]>([])
  const loading = ref<any>(false)
  const error = ref<any>(false)
  // const pollingInterval = 30000 // Polling data to ensrure we have fresh data after every 30 seconds
  let intervalId: NodeJS.Timeout | undefined

  const getServices = async (): Promise<any> => {
    try {
      // Initialize loading state
      loading.value = true

      // Fetch data from the API
      const { data } = await axios.get('/api/services', {
        params: { q: searchQuery?.value || '' },
      })

      // Store data in Vue ref
      services.value = data
    } catch (err: any) {
      error.value = true
    } finally {
      // Reset loading state
      loading.value = false
    }
  }
  watch(searchQuery, async () => {
    console.log(searchQuery.value)
    await getServices()
  }, { immediate: true })

  // onMounted(() => {
  //   intervalId = setInterval(getServices, pollingInterval)
  // })

  // onUnmounted(() => {
  //   if (intervalId) {
  //     clearInterval(intervalId)
  //   }
  // })
  // onBeforeMount(async (): Promise<void> => {
  //   // Fetch services from the API
  //   await getServices()
  // })

  // Return stateful data
  return {
    services,
    loading,
    error,
  }
}
