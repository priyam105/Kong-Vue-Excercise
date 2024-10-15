<template>
  <div
    v-if="props.avatarMetaData?.avatar"
    class="avatars"
  >
    <div class="avatars__profile">
      <img
        :alt="`${props.avatarMetaData.name}'s image`"
        class="avatars__img"
        :src="props.avatarMetaData?.avatar"
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Developer } from '@/types/versions'
const props = defineProps<{
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
    width: 36px;
}

.avatars__profile {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
}

.avatars__img {
    /* Make the image cover the avatar area */
    height: 100%;
    object-fit: cover;
    width: 100%;
    /* Ensure image scales proportionally */
}
</style>