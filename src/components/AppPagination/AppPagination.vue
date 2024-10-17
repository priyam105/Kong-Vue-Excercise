<template>
  <div class="pagination">
    <Button
      appearance="secondary"
      icon="<"
      :icon-only="true"
      :is-disabled="props.currentPage === 1"
      @button-clicked="handlePrevPage"
    />
    <div class="count">
      <span class="count__page">
        {{ count }} of
      </span>
      <span class="count__totalSize">{{ props.totalRecords }} services</span>
    </div>
    <Button
      appearance="secondary"
      icon=">"
      :icon-only="true"
      :is-disabled="props.currentPage === props.totalPages"
      @button-clicked="handleNextPage"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Button from '../AppButton/AppButton.vue'
const props = defineProps<{
  totalPages: number,
  currentPage: number,
  recordsPerPage?: number | 9;
  totalRecords?: number,

}>()

const emit = defineEmits<{
  (event: 'update:currentPage', value: number): void
}>()

const currentPage = ref(props.currentPage)

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    emit('update:currentPage', currentPage.value)
  }
}

const handleNextPage = () => {
  if (currentPage.value < props.totalPages) {
    currentPage.value += 1
    emit('update:currentPage', currentPage.value)
  }
}

const count = computed(() => {
  const recordsPerPage = props.recordsPerPage ?? 9
  const totalRecords = props.totalRecords ?? 0

  const fromPageCount = (currentPage.value - 1) * recordsPerPage + 1
  const toPageCount = totalRecords > currentPage.value * recordsPerPage ? currentPage.value * recordsPerPage : totalRecords
  return `${fromPageCount}- ${toPageCount}`
})


watch(()=>props.currentPage,() => {
  currentPage.value = props.currentPage
})

</script>
<style scoped lang="scss">
.pagination {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  margin-top: 8px;

  .count {
    color: var(--color-grey);
    font-size: var(--font-size-medium);

    &__page {
      font-weight: 600;
    }
  }
}
</style>