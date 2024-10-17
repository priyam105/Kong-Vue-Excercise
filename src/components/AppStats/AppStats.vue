<template>
  <div class="stats">
    <ul
      v-if="hasValidList"
      class="stats__list"
      data-testid="stats__list"
    >
      <li>
        <span class="value">{{ formatMetric("latency", list?.latency) }}</span>
        <span class="key">latency</span>
      </li>
      <li>
        <span class="value">{{ formatMetric("uptime", list?.uptime) }}</span>
        <span class="key">uptime</span>
      </li>
      <li>
        <div class="requests-error">
          <div class="request">
            <span class="value">{{
              formatMetric("requests", list?.requests)
            }}</span>
            <span class="key">requests</span>
          </div>
          <div class="errors">
            <span class="prefix">•</span>
            <span class="value">{{
              formatMetric("errors", list?.errors)
            }}</span>
            <span class="key">errors</span>
          </div>
        </div>
      </li>
    </ul>
    <div
      v-else
      class="stats__no_list"
    >
      <p>
        <span class="prefix">•</span>
        Not configured with runtime yet
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatMetric } from '@/lib/utils'
import { computed } from 'vue'
const props = defineProps<{
  list: Record<string, any> | undefined;
}>()

const hasValidList = computed(() => {
  return props?.list && Object.keys(props.list).length > 0
})
</script>
<style lang="scss" scoped>
.stats {
  &__list {
    li::marker {
      color: #42d782;
    }

    .requests-error {
      display: flex;
      gap: 5px;

      .errors {
        margin-left: 10px;

        .prefix {
          font-size: 8px;
        }

        .value {
          margin-left: 4px;
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

  &__no_list {
    color: var(--color-grey);
    font-size: var(--font-size-small);
    margin-top:60px;
  }
}
</style>
