import { ref, watch, type Ref } from 'vue'
import axios from 'axios'
import type { Service } from '@/types/versions'

// This composable is a simplified example for the exercise **and could likely be improved**.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

export default function useServices(searchQuery?: Ref<string>): {
  getServices: () => Promise<void>;
  services: Ref<any[]>;
  loading: Ref<boolean>;
  error: Ref<boolean>;
} {
  const services = ref<any[]>([])
  const loading = ref(false)
  const error = ref(false)
  const getServices = async (): Promise<void> => {
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

  if (searchQuery) {
    watch(
      searchQuery,
      async () => {
        await getServices()
      },
      { immediate: true },
    )
  }

  // Return stateful data
  return {
    getServices,
    services,
    loading,
    error,
  }
}
