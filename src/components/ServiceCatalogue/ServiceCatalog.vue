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
        <Button
          v-if="showRefreshButton"
          appearance="secondary"
          label="Refresh"
          @button-clicked="handleRefreshButtonClick"
        />
        <input
          v-model="searchQuery"
          class="search-input"
          data-testid="search-input"
          placeholder="Search services"
        >

        <Button
          appearance="primary"
          icon="+"
          label="Service Package"
          :show-icon-on-left="true"
          @button-clicked="handleServiceClick"
        />
      </div>
    </div>

    <div v-if="loading && paginatedServices?.length === 0">
      Loading...
    </div>
    <div
      v-else-if="paginatedServices?.length > 0 && !loading"
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
      v-if="paginatedServices.length > 0"
      :current-page="currentPage"
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import useServices from '@/composables/useServices'
import useDebounce from '@/composables/useDebounce'
import Button from '@/components/AppButton/AppButton.vue'
import Card from '@/components/AppCard/AppCard.vue'
import Pagination from '@/components/AppPagination/AppPagination.vue'
import Modal from '../AppModal/AppModal.vue'
import type { Developer, Service, Version } from '@/types/versions'
import { CONSTANTS } from '@/lib/constants'
import { getUserName } from '@/lib/utils'

const { paginationRecordsPerPage, debounceTimer, refreshButtonTimer } = CONSTANTS || {}
const searchQuery = ref('')
/**An ask by the panel to show a refresh button to allow the user fetch the latest data (through client side) */
const showRefreshButton = ref(false)
const modalOpen = ref(false)
const currentPage = ref(1)
const recordsPerPage = ref(paginationRecordsPerPage)
const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null)
const modalContent = ref<{
  id: string;
  type: string;
  versionName: string;
  versionDesc: string;
  modifiedDate: string;
  developerDetails: Developer;
}[]>([])


const debouncedSearchQuery = useDebounce(searchQuery, debounceTimer)
const { services, loading } = useServices(debouncedSearchQuery)

const totalPages = computed(() => Math.ceil(totalRecords.value / recordsPerPage.value))
const totalRecords = computed(() => services.value.length || 0)
const indexStart = computed(() => (currentPage.value - 1) * recordsPerPage.value)
const indexEnd = computed(() => indexStart.value + recordsPerPage.value)
const paginatedServices = computed(() => {
  if (!services.value || services.value?.length === 0) return []
  return services.value.slice(indexStart.value, indexEnd.value)
})


const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
}

const handleCardClick = (services: Service) => {
  modalOpen.value = true
  modalContent.value = []

  services.versions.forEach((version: Version) =>
    modalContent.value.push({
      id: version.id,
      type: services.type,
      versionName: version.name,
      versionDesc: version.description,
      modifiedDate: version.updated_at,
      developerDetails: version.developer,
    }))

}

const handleModalClose = () => {
  modalOpen.value = false
}

const handleServiceClick = () => {
  alert(`Service creation initiated for ${getUserName}`)
}

const handleRefreshButtonClick = () => {
  searchQuery.value = ''
  currentPage.value = 1
  setTimeForRefreshButton(refreshButtonTimer)
}
onMounted(() => {
  setTimeForRefreshButton(refreshButtonTimer)
})

onUnmounted(() => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
  }
})

const setTimeForRefreshButton = (timeout: number) => {
  showRefreshButton.value = false
  timeoutId.value = setTimeout(() => {
    showRefreshButton.value = true
  }, timeout)

}
</script>

<style lang="scss" scoped>
.service-catalog {
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
    margin-bottom: 12px;

    .search-input {
      padding: 8px;
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

  .service-catalog {
    &__actions {
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
    grid-template-columns: 2fr 2fr 2fr;
  }
}
</style>
