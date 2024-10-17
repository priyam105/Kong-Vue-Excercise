<template>
  <nav
    class="header-nav"
    data-testid="header-nav"
  >
    <div class="header__logo">
      <router-link
        class="header-text link"
        to="/"
      >
        <img
          alt="Logo Icon"
          :height="logoHeight"
          src="@/assets/images/header-icon.svg"
          :width="logoWidth"
        >
        <span class="header__logo-text desktop_only">{{
          props.headerLogoText
        }}</span>
      </router-link>
    </div>
    <div class="header__links">
      <template
        v-for="item in props.linkItems"
        :key="item.id"
      >
        <router-link
          :active-class="item.label"
          class="header__links-items header-text"
          :to="item.link"
        >
          <img
            :alt="`${item.label}'s logo'`"
            :height="logoHeight"
            :src="item.icon"
            :width="logoWidth"
          >
          <span class="desktop_only"> {{ item.label }}</span>
        </router-link>
      </template>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type { LinkItem } from '@/types/header'
import { CONSTANTS } from '@/lib/constants'

const { logoHeight, logoWidth } = CONSTANTS

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

    .desktop_only {
      display: none;
    }

    .router-link-exact-active {
      background: linear-gradient(180deg, #09224f 0%, #072863 100%);
      border-radius: 5px;
    }
  }

  &__logo {
    margin: 0 0 0 10px;

    &-text {
      display: none;
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
    gap: 20px;
  }
}

@media screen and (min-width: 1000px) {
  .header {
    &-nav {
      .desktop_only {
        display: inline-block;
        margin: 0 0 0 4px;
        vertical-align: super;
      }
    }

    &__logo {
      margin: 0 0 0 12px;
    }

    &__links {
      gap: 30px;
    }
  }
}
</style>
