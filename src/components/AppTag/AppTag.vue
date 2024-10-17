<template>
  <div
    class="tag"
    data-testid="tag"
  >
    <span
      class="tag__label"
      data-testid="tag__label"
    >{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
const { label } = defineProps<{ label: string }>()
</script>
<style lang="scss" scoped>
.tag {
  background-color: var(--tag-background);
  border-radius: 50px;
  padding: 10px 8px 10px 8px;
  text-align: center;
  width: 60px;

  &__label {
    color: var(--tag-label-color);
    font-size: var(--font-size-small);
    font-weight: 600;
    vertical-align: middle;
  }
}
</style>