<script setup>
// 【新增】引入 Vue 的 onMounted, onUnmounted, ref 以偵測螢幕寬度
import { ref, onMounted, onUnmounted } from 'vue';

// 【修改】同時引入兩種輪播元件
import FullBleedCarousel from '@/components/base/FullBleedCarousel.vue';
import BaseSwiperCarousel from '@/components/base/BaseSwiperCarousel.vue'; // 【新增】
import CaseStudyCard from '@/components/card/CaseStudyCard.vue';

const props = defineProps({
  awarenessData: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const imageUrls = import.meta.glob('@/assets/img/future/future-awareness/*.{jpg,png,svg}');
const resolvedImages = ref({});

onMounted(async () => {
  for (const item of props.awarenessData) {
    const path = `/src/assets/img/future/future-awareness/${item.imageUrl}`;
    if (imageUrls[path]) {
      const module = await imageUrls[path]();
      resolvedImages.value[item.id] = module.default;
    }
  }
});

const emit = defineEmits(['show-details']);

const handleShowDetails = (item) => {
  emit('show-details', item);
};

// --- 【新增】偵測螢幕寬度的邏輯 ---
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 576;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
// --- 偵測螢幕寬度邏輯結束 ---
</script>

<template>
  <div v-if="isMobile">
    <BaseSwiperCarousel
      :items="awarenessData"
      carousel-id="case-study-mobile"
      slide-width="420px"
    >
      <template #default="{ item }">
        <CaseStudyCard
          :case-data="item"
          :image-url="resolvedImages[item.id]"
          :has-shadow="false"
          @click="handleShowDetails(item)"
          style="cursor: pointer;"
        />
      </template>
    </BaseSwiperCarousel>
  </div>

  <div v-else>
    <FullBleedCarousel :items="awarenessData" show-buttons>
      <template #default="{ item }">
        <CaseStudyCard
          :case-data="item"
          :image-url="resolvedImages[item.id]"
          :has-shadow="false"
          @click="handleShowDetails(item)"
          style="cursor: pointer;"
        />
      </template>
    </FullBleedCarousel>
  </div>
</template>

<style scoped>
/* 這個樣式對於兩種輪播內的卡片都適用，因此予以保留 */
:deep(.swiper-slide) {
  display: flex;
  align-items: stretch;
}
</style>