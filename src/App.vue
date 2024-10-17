<template>
  <header>
    <Header
      :header-logo-text="app"
      :link-items="headerItems"
    />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts" setup>
import Header from '@/components/AppHeader/AppHeader.vue'
import { CONSTANTS } from '@/lib/constants'
const { app, headerItems } = CONSTANTS
</script>
<style scoped lang="scss">
main {
  margin: 2rem auto;
  max-width: 100vw;
  padding: 0 20px;
}
</style>
