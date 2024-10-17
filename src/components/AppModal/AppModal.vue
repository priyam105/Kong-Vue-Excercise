<template>
  <div
    v-if="modalOpen"
    class="overlay"
  >
    <div class="modal">
      <div class="modal__header">
        <h4>Versions ({{ modalContents.length }})</h4>
        <Button
          appearance="secondary"
          icon="X"
          :icon-only="true"
          @button-clicked="handleModalClose"
        />
      </div>
      <div
        v-for="content in modalContents"
        :key="content.id"
        class="modal__content"
        :class="{ 'last-column': content?.developerDetails?.name }"
      >
        <div class="version-name">
          v{{ content.versionName }}
        </div>
        <div class="version-desc">
          {{ content.versionDesc }}
        </div>
        <div class="version-type">
          <Tag :label="content.type" />
        </div>
        <div
          v-if="content?.developerDetails?.name"
          class="version-dev-details"
        >
          <Avatar :avatar-meta-data="content.developerDetails" />
          <div class="version-dev-name">
            <p>{{ content.developerDetails.name }}</p>
            <p>
              {{ timeAgo(content.modifiedDate) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from '../AppButton/AppButton.vue'
import Avatar from '../AppAvatar/AppAvatar.vue'
import Tag from '../AppTag/AppTag.vue'
import { timeAgo } from '@/lib/utils'
defineProps<
  {
    modalOpen: boolean,
    modalContents: Array<any>
  }
>()

const emit = defineEmits<{
  (event: 'modalCloseEvent'): void
}>()

const handleModalClose = () => {
  emit('modalCloseEvent')
}

</script>
<style lang="scss" scoped>
.overlay {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 999;

}

.modal {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 650px;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__content {
    border-bottom: 1px solid #F1F1F5;
    display: grid;
    font-size: var(--font-size-small);
    grid-template-columns: 1fr 4fr 1.5fr auto;
    padding: 12px 0 12px 0;

    &:last-child {
      border-bottom: none;
    }

    &.last-column {
      grid-template-columns: 1fr 4fr 1.5fr 2fr;
    }
  }

  .version {
    &-name {
      font-weight: 600;
    }

    &-desc {
      color: var(--color-grey);
      font-weight: 600;
    }

    &-dev-name {
      align-items: center;
      display: flex;
      gap: 20px;

      & p:first-child {
        font-weight: 600;
        margin: 0
      }

      & p:last-child {
        color: var(--color-grey);
        margin: 0
      }
    }
  }
}
</style>