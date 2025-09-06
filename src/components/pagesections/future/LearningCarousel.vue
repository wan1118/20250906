<script setup>
// 【簡化】只留下需要傳入的 props 和要使用的卡片元件
import BaseSwiperCarousel from '@/components/base/BaseSwiperCarousel.vue';
import InfoCard from '@/components/card/LearningCard.vue';

defineProps({
  cards: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<template>
  <BaseSwiperCarousel 
    :items="cards" 
    carousel-id="learning"
    slide-width="650px"
  >
    <template #default="{ item }">
      <InfoCard :card="item" :has-shadow="false" />
    </template>
  </BaseSwiperCarousel>
</template>

<style scoped>
/* 【清除】這裡所有的樣式都已經移至 BaseSwiperCarousel.vue，所以此處應為空 */
</style>