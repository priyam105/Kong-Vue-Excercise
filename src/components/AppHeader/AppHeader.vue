<template>
  <nav class="header-nav">
    <div class="header__logo">
      <router-link
        class="header-text link"
        to="/"
      >
        <img
          alt="Logo Icon"
          height="26"
          src="@/assets/images/header-icon.svg"
          width="29"
        >
        <span class="header__logo-text">{{ props.headerLogoText }}</span>
      </router-link>
    </div>
    <div class="header__links">
      <template
        v-for="item in props.linkItems"
        :key="item.id"
      >
        <div class="header__links-items header-text">
          {{ item.label }}
        </div>
      </template>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type { LinkItem } from '@/types/header'
const props = defineProps<{
  headerLogoText: string;
  linkItems: LinkItem[];
}>()
</script>

<style lang="scss" scoped>
.header {
  &-nav {
    align-items: center;
    background: linear-gradient(180deg, #09224f 0%, #073382 100%);
    display: flex;
    flex-direction: row;
    font-weight: 600;
    justify-content: space-between;
    padding: 12px;
  }

  &__logo {
    margin: 0 0 0 60px;

    &-text {
      margin-left: 10px;
      vertical-align: super;
    }
  }

  &-text {
    &.link {
      &.link {
        display: block;
      }
    }
  }

  &__links {
    display: flex;
    gap: 24px;
  }
}
</style>
