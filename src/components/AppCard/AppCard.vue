<template>
  <div
    :class="['card', { card__unclickable: versions.length === 0 }]"
    @click="handleCardClick"
  >
    <div class="card__status">
      <div class="card__status__info">
        <StatusIndicator :status="getPublishingStatus" />
      </div>
      <Tag
        v-if="tagLabel"
        :label="tagLabel"
      />
    </div>
    <div class="card__info">
      <p class="text-header">
        {{ serviceDetails.name }}
      </p>
      <p class="text-description">
        {{ serviceDetails.description }}
      </p>
    </div>
    <div class="card__details">
      <Stats :list="serviceDetails.metrics" />
      <!-- <template v-else>
        L
      </template> -->
      <div
        v-if="getDeveloperList?.length > 0"
        class="card__details_avatar"
      >
        <template v-if="getDeveloperList?.length > 2">
          <div class="avatar-placeholder">
            {{ `+${getDeveloperList.length - 2}` }}
          </div>
        </template>
        <template
          v-for="developer in getDeveloperList.slice(0, 2)"
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
import { computed } from 'vue'
import Avatar from '@/components/AppAvatar/AppAvatar.vue'
import StatusIndicator from '../AppStatusIndicator/AppStatusIndicator.vue'
import type { Developer, Service } from '@/types/versions'
import type { PublishStatus } from '@/types/publishStatus'

const props = defineProps<{ serviceDetails: Service }>()

const emit = defineEmits<{
  (event: 'cardClickedEvent', value: Service): void;
}>()

const versions = computed(() => {
  return props.serviceDetails.versions || []
})

const tagLabel = computed(() => {
  if (versions.value.length === 0) return ''

  const versionString = String(versions.value?.length)
  if (versions.value.length > 1) {
    return `${versionString} versions`
  }
  return `${versionString} version`
})

const getPublishingStatus = computed<PublishStatus>(() => {
  const { published, metrics } = props.serviceDetails
  const hasValidMetrics = metrics && Object.keys(metrics)?.length > 0
  if (!hasValidMetrics && !published)
    return 'In Progress'
  if (hasValidMetrics && published) {
    return 'Published'
  }
  return 'Unpublished'
})
const getDeveloperList = computed(() => {
  return versions.value
    ?.map((version: { developer: Developer }) => version.developer)
    .filter(Boolean)
})

const handleCardClick = () => {
  // Emit only if the services.versions has valid data which further triggers the modal
  if (versions.value.length > 0) emit('cardClickedEvent', props.serviceDetails)
}
</script>
<style lang="scss" scoped>
.card {
  background-color: #fff;
  border: var(--card-border);
  border-radius: 10px;
  cursor: pointer;
  margin: 6px;
  padding: 8px 16px;
  width: 90%;

  &__unclickable {
    cursor: auto;
  }

  &__status {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
  }

  &__details {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &_avatar {
      align-items: center;
      display: flex;
      left: 16%;
      position: relative;
    }
  }

  .text-header {
    font-size: var(--font-size-large);
    font-weight: 600;
  }

  .text-description {
    color: var(--color-grey);
    font-size: var(--font-size-small);
  }



  .avatar-placeholder {
    background-color: #ccc;
    border-radius: 50%;
    color: #fff;
    display: inline-block;
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    margin-left: -20px;
    position: absolute;
    text-align: center;
    width: 36px;
    z-index: 4;
  }
}

@media screen and (min-width: 1000px) {
  .card {
    &__details {
      align-items: flex-end;
      flex-direction: row;

      &_avatar {
        align-items: center;
        bottom: 12px;
        display: flex;
        left: 0;
        position: relative;
      }

      .stats__list {
        margin: 6px;
        padding: 12px;
      }
    }
  }

}
</style>
