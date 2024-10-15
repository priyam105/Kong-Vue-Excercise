<template>
  <div
    class="card"
    @click="handleCardClick"
  >
    <div class="card__status">
      <div class="card__status__info">
        <StatusIndicator :status="props.service.published" />
      </div>
      <Tag
        v-if="tagLabel"
        :label="tagLabel"
      />
    </div>
    <div class="card__info">
      <p class="text-header">
        {{ props.service.name }}
      </p>
      <p class="text-description">
        {{ props.service.description }}
      </p>
    </div>
    <div class="card__details">
      <Stats :lists="props.service.metrics" />
      <div
        v-if="developerDataArr.length > 0"
        class="card__details_avatar"
      >
        <template
          v-for="developer in developerDataArr"
          :key="developer?.id"
        >
          <Avatar
            v-if="developer"
            :avatar-meta-data="developer"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Tag from '@/components/AppTag/AppTag.vue'
import Stats from '@/components/AppStats/AppStats.vue'
import type { Metrics } from '@/types/metrics'
import { computed, ref } from 'vue'
import Avatar from '@/components/AppAvatar/AppAvatar.vue'
import StatusIndicator from '../AppStatusIndicator/AppStatusIndicator.vue'
import type { Developer, Version } from '@/types/versions'

const props = defineProps<{
  service: any
}>()
const emit = defineEmits<{
  (event: 'cardClickedEvent', value: Array<any>): void
}>()

const tagLabel = computed(() => {
  if (props.service.versions.length === 0) return ''

  const versionString = String(props.service.versions.length)
  return `${versionString} version`
})

const developerDataArr = computed(() => {
  return props.service.versions.map((version: { developer: Developer }) => version.developer).filter(Boolean)
})

const handleCardClick = () => {
  emit('cardClickedEvent', props.service)

}
</script>
<style lang="scss" scoped>
.card {
  border: var(--card-border);
  border-radius: 10px;
  margin: 6px;
  padding: 8px 16px;
  width: 380px;

  &__status {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
  }

  &__details {
    align-items: end;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .text-header {
    font-size: var(--font-size-large);
    font-weight: 600;
  }

  .text-description {
    color: var(--color-grey);
    font-size: var(--font-size-small)
  }
}
</style>