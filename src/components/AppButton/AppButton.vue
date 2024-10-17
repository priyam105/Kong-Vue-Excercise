<template>
  <component
    :is="buttonType"
    :class="[
      `${appearance}-button`,
      { 'disabled': isDisabled }
    ]"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <span v-if="iconOnly && icon">{{ icon }}</span>
    <span v-else>
      <span v-if="showIconOnLeft && icon">{{ icon }}</span>
      <span v-if="!iconOnly">{{ label }}</span>
      <span v-if="showIconOnRight && icon">{{ icon }}</span>
    </span>
  </component>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  appearance: { type: String, default: 'primary' },
  label: { type: String, default: '' },
  icon: { type: String, default: '' },
  showIconOnLeft: Boolean,
  showIconOnRight: Boolean,
  iconOnly: Boolean,
  isDisabled: Boolean,
  to: [String, Object], // to handle either string or object (like router-link)
})
const emit = defineEmits<{
  (event: 'buttonClicked'): void
}>()

const handleClick = () => {
  if (!props.isDisabled) {
    emit('buttonClicked')
  }
}
const buttonType = computed((): string => {
  if (props.to && typeof props.to === 'string') {
    return 'a'
  } else if (props.to) {
    return 'router-link'
  }

  return 'button'
})

</script>
<style lang="scss" scoped>
.primary-button {
  background-color: var(--primary-button-background);
  border: none;
  border-radius: 50px;
  color: var(--color-white);
  cursor: pointer;
  font-weight: 600;
  height: 44px;
  padding: 12px 24px 12px 16px;
  width: 50%;

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

@media screen and (min-width: 1000px) {

  .primary-button {
    width: 100%;
  }
}
</style>