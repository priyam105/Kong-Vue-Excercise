<template>
  <div class="stats">
    <ul
      v-if="!isListEmpty"
      class="stats__list"
    >
      <li>
        <span class="value">{{ formatMetric('latency', list?.latency) }}</span>
        <span class="key">latency</span>
      </li>
      <li>
        <span class="value">{{ formatMetric('uptime', list?.uptime) }}</span>
        <span class="key">uptime</span>
      </li>
      <li>
        <div class="requests-error">
          <div class="request">
            <span class="value ">{{ formatMetric('requests', list?.requests) }}</span>
            <span class="key">requests</span>
          </div>
          <div class="errors">
            <span class="value ">{{ formatMetric('errors', list?.errors) }}</span>
            <span class="key">errors</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { formatMetric } from '@/lib/utils'
import { computed } from 'vue'
const props = defineProps<{
  list: Record<string, any>
}>()

const isListEmpty = computed(() => {
  return props?.list && Object.keys(props.list).length === 0
})

</script>
<style lang="scss" scoped>
.stats {
  &__list {
    li::marker {
      color: #42D782;
    }

    .requests-error {
      display: flex;
      gap: 5px;

      .errors {
        margin-left: 10px;

        .value {
          width: 40px;
        }
      }
    }

    .value {
      display: inline-block;
      font-size: var(--font-size-small);
      font-weight: 600;
      width: 45px;
    }

    .key {
      color: var(--color-grey);
      font-size: var(--font-size-small);
      font-weight: 600;
    }

  }
}
</style>