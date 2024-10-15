<template>
  <div class="card">
    <div class="card__status">
      <div class="card__status__info">
        <span>icon</span>
        <span class="text-large">Status</span>
      </div>
      <Tag :label="tagLabel" />
    </div>
    <div class="card__info">
      <p class="text-header">
        {{ name }}
      </p>
      <p class="text-description">
        {{ description }}
      </p>
    </div>
    <div class="card__details">
      <Stats :lists="metrics" />
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
import type { Version } from '@/types/versions'

const props = defineProps<{
  name: string,
  versions: Version[],
  description: string,
  metrics: Metrics,
  status?: string
}>()

const tagLabel = computed(() => {
  console.log(props.versions)
  const versionString = String(props.versions.length)
  return `${versionString} version`
})

const developerDataArr = computed(() => {
  const { versions } = props

  if (versions.length === 0) return []
  return versions.map((item) => {
    return item.developer

  })
})
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