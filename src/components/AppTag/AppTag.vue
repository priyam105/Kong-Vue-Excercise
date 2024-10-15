<template>
  <div class="tag">
    <span class="tag__label">{{ props.label }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

</script>
<style lang="scss" scoped>
.tag {
  background-color: var(--tag-background);
  border-radius: 50px;
  padding: 8px 16px 8px 16px;
  text-align: center;
  width: 90px;

  &__label {
    color: var(--tag-label-color);
    font-size: var(--font-size-small);
    font-weight: 600;
  }
}
</style>