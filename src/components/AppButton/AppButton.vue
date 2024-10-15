<template>
  <button
    :class="[
      `${props?.appearance || 'primary'}-button`,
      { 'disabled': isDisabled }
    ]"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <span v-if="props.iconOnly && props.icon">{{ icon }}</span>
    <span v-else>
      <span v-if="props.showIconOnLeft && props.icon">{{ icon }}</span>
      <span v-if="!props.iconOnly">{{ props.label }}</span>
      <span v-if="props.showIconOnRight && props.icon">{{ icon }}</span>
    </span>
  </button>
  <span v-if="props.showIconOnRight">{{ icon }}</span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  label?: string | '',
  appearance?: string | 'primary',
  icon?: string | null,
  showIconOnLeft?: boolean | null,
  showIconOnRight?: boolean,
  iconOnly?: boolean,
  isDisabled?: boolean
}>()
const emit = defineEmits<{
  (event: 'buttonClicked'): void
}>()

const handleClick = () => {
  if (!props.isDisabled) {
    emit('buttonClicked')
  }
}
</script>
<style lang="scss" scoped>
.primary-button {
  background-color: var(--primary-button-background);
  border: none;
  border-radius: 50px;
  color: var(--color-white);
  cursor: pointer;
  height: 44px;
  padding: 12px 24px 12px 16px;
  width: 197px;
  font-weight: 600;

  &:hover {
    background-color: var(--primary-button-hover);
  }

  &.disabled {
    background-color: var(--primary-button-disabled);
    cursor: not-allowed;
    opacity: 0.6;

  }
}

.secondary-button {
  background-color: var(--secondary-button-background);
  border: var(--secondary-button-border);
  border-radius: 50px;
  cursor: pointer;
  height: 44px;
  padding: 12px 20px 12px 20px;

  &.disabled {
    border: 1px solid #0000001A;
    cursor: not-allowed;
    opacity: 0.6
  }
}
</style>