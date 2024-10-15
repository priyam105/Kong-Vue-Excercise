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
        v-for="service in paginatedServices"
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
    <Pagination
      :current-page="currentPage"
      :index-end="indexEnd"
      :records-per-page="recordsPerPage"
      :total-pages="totalPages"
      :total-records="totalRecords"
      @update:current-page="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import useServices from '@/composables/useServices'
import Button from '@/components/AppButton/AppButton.vue'
import Card from '@/components/AppCard/AppCard.vue'
import { icons } from '@/lib/icons-mapper'
import Pagination from '@/components/AppPagination/AppPagination.vue'

const { services, loading } = useServices()
const searchQuery = ref('')
const currentPage = ref(1)
const recordsPerPage = ref(9)
const totalPages = computed(() => Math.ceil(totalRecords.value / recordsPerPage.value))
const totalRecords = computed(() => services.value.length || 0)
const indexStart = computed(() => (currentPage.value - 1) * recordsPerPage.value)
const indexEnd = computed(() => indexStart.value + recordsPerPage.value)

const paginatedServices = computed(() => {
  if (services.value.length === 0) return []
  return services.value.slice(indexStart.value, indexEnd.value)
})

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
}
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
