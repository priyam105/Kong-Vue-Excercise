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

    <div v-if="loading && services.length === 0">
      Loading...
    </div>
    <div
      v-else-if="services.length && !loading"
      class="catalog"
    >
      <template
        v-for="service in paginatedServices"
        :key="service.id"
      >
        <Card
          :service-details="service"
          @card-clicked-event="handleCardClick"
        />
      </template>
    </div>
    <div
      v-else-if="services.length === 0 && !loading"
      data-testid="no-results"
    >
      No services
    </div>

    <Pagination
      v-if="services.length > 0"
      :current-page="currentPage"
      :index-end="indexEnd"
      :records-per-page="recordsPerPage"
      :total-pages="totalPages"
      :total-records="totalRecords"
      @update:current-page="handlePageChange"
    />
  </div>

  <Modal
    v-model:modal-open="modalOpen"
    :modal-contents="modalContent"
    @modal-close-event="handleModalClose"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import useServices from '@/composables/useServices'
import Button from '@/components/AppButton/AppButton.vue'
import Card from '@/components/AppCard/AppCard.vue'
import { icons } from '@/lib/icons-mapper'
import Pagination from '@/components/AppPagination/AppPagination.vue'
import Modal from '../AppModal/AppModal.vue'
import type { Developer, Service, Version } from '@/types/versions'

const searchQuery = ref('')
console.log(searchQuery.value)
const { services, loading } = useServices(searchQuery)



const modalOpen = ref(false)
const currentPage = ref(1)
const recordsPerPage = ref(9)
const modalContent = ref<{
  id: string;
  type: string;
  versionName: string;
  versionDesc: string;
  modifiedDate: string;
  developerDetails: Developer;
}[]>([])

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

const handleCardClick = (services: Service) => {
  modalOpen.value = true
  modalContent.value = []
  console.log(services)

  services.versions.forEach((version: Version) =>
    modalContent.value.push({
      id: version.id,
      type: services.type,
      versionName: version.name,
      versionDesc: version.description,
      modifiedDate: version.updated_at,
      developerDetails: version.developer,
    }))
  console.log(modalContent)
}

const handleModalClose = () => {
  modalOpen.value = false
}
</script>

<style lang="scss" scoped>
.service-catalog {
  margin: 2rem auto;
  max-width: 1366px;
  padding: 0 20px;

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-title {
      .info {
        font-size: var(--font-size-medium);
      }
    }
  }

  &__actions {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom:12px;
    .search-input {
      padding: 8px 4px;
        width: 100%;
    }
  }
}

.catalog {
  display: grid;
  grid-template-columns: auto
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


@media screen and (min-width: 1000px) {

.service-catalog{
  &__actions{
    flex-direction: row;
  }
    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;


    }
}
.catalog {
  display: grid;
  grid-template-columns: repeat(3, auto)
}
}
</style>
