<template>
  <div class="service-catalog">
    <div class="service-catalog__header">
      <div class="service-catalog__header-title">
        <h2>Service Hub</h2>
        <p class="info">
          Organize services, manage and track versioning and API service documentation. <a href="#">Learn more</a>
        </p>
      </div>

      <div class="service-catalog__actions">
        <input
          v-model="searchQuery"
          class="search-input"
          data-testid="search-input"
          placeholder="Search services"
        >
        <Button
          appearance="primary"
          :icon="icons.plusIcon"
          label="Service Package"
          :show-icon-on-left="true"
        />
      </div>
    </div>

    <div
      v-if="services.length"
      class="catalog"
    >
      <template
        v-for="service in services"
        :key="service.id"
      >
        <Card
          :description="service.description"
          :metrics="service.metrics"
          :name="service.name"
          :versions="service.versions"
        />
      </template>
    </div>
    <div
      v-else
      data-testid="no-results"
    >
      No services
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useServices from '@/composables/useServices'
import Button from '@/components/AppButton/AppButton.vue'
import Card from '@/components/AppCard/AppCard.vue'
import { icons } from '@/lib/icons-mapper'
const { services, loading } = useServices()
const searchQuery = ref('')


</script>

<style lang="scss" scoped>
.service-catalog {
  margin: 2rem auto;
  max-width: 1366px;
  padding: 0 20px;

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &-title {
      .info {
        font-size: var(--font-size-medium);
      }
    }
  }

  &__actions {
    align-items: baseline;
    display: flex;
    gap: 12px;

    .search-input {
      padding: 8px 4px;
    }
  }
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 20px 0 0 0;
}

.service {
  border: 1px solid #999;
  border-radius: 10px;
  margin: 6px;
  padding: 8px 16px;
  width: 200px;

  p:first-of-type {
    color: #333;
    font-weight: 700;
  }

  p {
    color: #666;
  }
}

input {
  padding: 8px 4px;
}
</style>
