<script setup>
import BaseLightbox from '@/components/base/BaseLightbox.vue'; // 1. 引入基礎元件
import CaseStudyPost from '@/components/card/CaseStudyPost.vue';

// 2. Props 保持不變，用來接收外部資料
defineProps({
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
  <div class="post-lightbox-wrapper">
    <BaseLightbox
      :items="items"
      :start-index="startIndex"
      :show="show"
      @close="handleClose"
    >
      <template #default="{ item }">
        <CaseStudyPost :case-data="item" class="radius-switch" />
      </template>
    </BaseLightbox>
  </div>
</template>

<style scoped>
/* 新增這段來修正 Swiper 的游標 */
:deep(.swiper-slide) {
  cursor: default;
}
/* 針對 PostLightbox 的特殊樣式可以保留在這裡，
  透過 :deep() 或像您一樣用 class 來影響子元件。
*/
@media (max-width: 768px) {
  /* 因為 BaseLightbox 的 padding 是固定的，
    如果要在手機版上全螢幕，需要從這裡覆寫。
  */
  :deep(.lightbox-overlay) {
    padding: 0;
  }
  :deep(.lightbox-main-content) {
    max-height: unset;
  }
  /* 您的 radius-switch 樣式可以像這樣定義 */
  :deep(.radius-switch) {
    border-radius: 0;
  }
  :deep(.close-btn) {
    top: var(--container-padding);
    right: var(--container-padding);
    color: var(--color-gray-icon);
  }
}
</style>