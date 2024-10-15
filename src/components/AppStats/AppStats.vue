<template>
  <div class="stats">
    <ul
      v-if="!isListsEmpty"
      class="stats__list"
    >
      <li
        v-for="value, key, index in props.lists"
        :key="`${index}_${key}`"
      >
        <span class="value">{{ formatMetric(key, value) }}</span>
        <span class="key">{{ key }}</span>
      </li>
    </ul>
    <div
      v-else
      class="stats__empty"
    >
      Not configured with run-time yet
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatMetric } from '@/lib/utils'
import { computed } from 'vue'
const props = defineProps<{
  lists: Record<string, any>
}>()

const isListsEmpty = computed(() => {
  return props?.lists && Object.keys(props.lists).length === 0
})

</script>
<style lang="scss" scoped>
.stats {
    &__list {
        li::marker {
            color: #42D782;
        }

        .value {
            display: inline-block;
            font-size: var(--font-size-small);
            font-weight: 600;
            width: 75px;
        }

        .key {
            color: var(--color-grey);
            font-size: var(--font-size-small);
            font-weight: 600;
        }
    }
}
</style>