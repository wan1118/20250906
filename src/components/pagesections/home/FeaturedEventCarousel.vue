<script setup>
// 匯入輪播圖和卡片這兩個基礎元件
import BaseCarousel from '@/components/base/BaseCarousel.vue';
import EventBanner from '@/components/card/EventBanner.vue';


defineProps({
  events: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <BaseCarousel :items="events" :swiper-options="{ slidesPerView: 1, spaceBetween: 30, loop: true }">
    <template #default="{ item }">
      <EventBanner :eventData="item" :has-shadow="false" />
    </template>
  </BaseCarousel>
</template>

<style scoped>
:deep(.mySwiper) {
  padding-bottom: 40px;
}
</style>