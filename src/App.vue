<template>
  <Header
    :header-logo-text="app"
    :link-items="headerItems"
  />
  <main>
    <router-view />
  </main>
</template>

<script lang="ts" setup>
import Header from '@/components/AppHeader/AppHeader.vue'
import { CONSTANTS } from '@/lib/constants'
const { app, headerItems } = CONSTANTS
</script>
