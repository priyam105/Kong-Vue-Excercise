<template>
  <div
    class="status-indicator"
    data-testId="status-indicator"
  >
    <template v-if="status">
      <img :src="getPublishIcon">
      <p>{{ status }}</p>
    </template>
  </div>
</template>
<script lang="ts" setup>
import type { PublishStatus } from '@/types/publishStatus'
import { computed } from 'vue'
const props = defineProps<{
  status: PublishStatus
}>()

const getPublishIcon = computed(() => {
  if (props.status === 'Published') return new URL('@/assets/icons/tick.svg', import.meta.url).href
  if (props.status === 'Unpublished') return new URL('@/assets/icons/cross.svg', import.meta.url).href
  return new URL('@/assets/icons/inProgress.svg', import.meta.url).href
})
</script>
<style lang="scss" scoped>
.status-indicator {
  color: var(--color-grey);
  display: flex;
  font-size: var(--font-size-small);
}
</style>