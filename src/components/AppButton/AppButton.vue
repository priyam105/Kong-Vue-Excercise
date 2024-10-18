<template>
  <component
    :is="buttonType"
    :class="[
      `${appearance}-button`,
      { 'disabled': isDisabled }
    ]"
    data-testid="button"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <span
      v-if="iconOnly && icon"
      class="icon"
    >{{ icon }}</span>
    <span v-else>
      <span
        v-if="showIconOnLeft && icon"
        class="icon--left"
      >{{ icon }}</span>
      <span v-if="!iconOnly">{{ label }}</span>
      <span
        v-if="showIconOnRight && icon"
        class="icon--right"
      >{{ icon }}</span>
    </span>
  </component>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  appearance: { type: String, default: 'primary' },
  label: { type: String, default: '' },
  icon: { type: String, default: '' },
  showIconOnLeft: { type: Boolean, default: false },
  showIconOnRight: { type: Boolean, default: false },
  iconOnly: { type: Boolean, default: false },
  isDisabled: { type: Boolean, default: false },
  to: { type: [String, Object], default: '' },
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
.icon
{
&--left{
  margin: 0 4px 0 0;
}
&--right{
  margin: 0 0 0 4px;
}
}
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
