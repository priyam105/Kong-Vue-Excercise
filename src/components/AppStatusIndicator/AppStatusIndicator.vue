<template>
  <div class="status-indicator">
    <template v-if="props.status">
      <img src="@/assets/icons/tick.svg">
      <p>Published</p>
    </template>
    <template v-else>
      <img src="@/assets/icons/cross.svg">
      <p>Unpublished</p>
    </template>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  status: boolean
}>()
</script>
<style lang="scss" scoped>
.status-indicator{
    display:flex;
    color:var(--color-grey);
    font-size: var(--font-size-small);
}
</style>