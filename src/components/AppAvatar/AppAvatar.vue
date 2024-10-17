<template>
  <div
    v-if="avatarMetaData?.avatar"
    class="avatars"
    data-testid="avatars"
  >
    <div class="avatars__profile">
      <img
        :alt="`${avatarMetaData.name}'s image`"
        class="avatars__img"
        :src="avatarMetaData?.avatar"
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Developer } from '@/types/versions'
const { avatarMetaData } = defineProps<{
  avatarMetaData: Developer
}>()

</script>
<style lang="scss" scoped>
.avatars {
  border: 2px solid #ccc;
  border-radius: 50%;
  display: inline-block;
  height: 36px;
  overflow: hidden;
  position: relative;
  width: 36px;
  z-index: 1;

}

.avatars:nth-child(1) {
  margin-right: -11px;
  z-index: 3;

}

.avatars:nth-child(2) {
  margin-right: -2px;
  z-index: 2;

}

.avatars:nth-child(3) {
  margin-left: -10px;
  z-index: 1;

}

.avatars__profile {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.avatars__img {
  height: 100%;
  object-fit: cover;
  width: 100%;

}
</style>