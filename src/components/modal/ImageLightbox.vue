<script setup>
import BaseLightbox from '@/components/base/BaseLightbox.vue';
import PaginationDots from '@/components/base/PaginationDots.vue';

const props = defineProps({
  items: { type: Array, required: true },
  startIndex: { type: Number, default: 0 },
  show: { type: Boolean, default: false }
});

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};
</script>

<template>
  <BaseLightbox
    :items="items"
    :start-index="startIndex"
    :show="show"
    :show-footer="true" 
    @close="handleClose"
  >
    <template #default="{ item }">
      <div class="image-wrapper">
        <img :src="item.imageUrl" :alt="item.title.text" class="main-image">
      </div>
    </template>

    <template #footer="{ items, currentIndex, 'onUpdate:currentIndex': onIndexUpdate }">
      <div v-if="items[currentIndex]" class="info-footer">
        <div class="image-title text-p fw-bold">{{ items[currentIndex].title.text }}</div>
        
        <PaginationDots 
            :total-items="items.length" 
            :currentIndex="currentIndex"
            @update:currentIndex="onIndexUpdate"
        />
      </div>
    </template>
  </BaseLightbox>
</template>

<style scoped>
/* 這裡只保留 ImageLightbox 特有的樣式 */
.image-wrapper {
  /* 讓圖片容器填滿 swiper-slide 的空間 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.main-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 16px;
}
.info-footer {
  /* 這個樣式現在由 BaseLightbox 的 .footer-content 控制外部間距，
     這裡只需要控制內部元素即可。*/
  text-align: center;
}
.image-title {
  color: var(--color-white-base);
  margin-bottom: 16px;
}
</style>