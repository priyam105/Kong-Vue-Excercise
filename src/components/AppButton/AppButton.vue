<template>
  <button :class="`${props.appearance}-button`">
    <span v-if="props.showIconOnLeft">{{ icon }}</span>
    {{ props.label }}
  </button>
  <span v-if="props.showIconOnRight">{{ icon }}</span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  appearance: string,
  label: string,
  icon?: string | null,
  showIconOnLeft: boolean | null,
  showIconOnRight?: boolean,
  iconOnly?: boolean
}>()
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

  &:hover {
    background-color: var(--primary-button-hover);
  }
}
</style>