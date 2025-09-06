<!-- 未來研究院學習區三卡套用 -->
 <script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import IconRight from '@/components/icons/direction/right.vue';
import IconLeft from '@/components/icons/direction/left.vue';

// 【修改】Props 變得更通用
const props = defineProps({
  // 接收任何類型的資料陣列
  items: {
    type: Array,
    required: true,
  },
  // 為了確保多個輪播在同一頁時，按鈕的 class 不會衝突
  carouselId: {
    type: String,
    required: true,
  },
  // 讓卡片寬度可以從外部傳入
  slideWidth: {
    type: String,
    default: '650px',
  }
});

const modules = [Navigation, Keyboard];

// 【新增】根據 carouselId 動態生成唯一的按鈕 class
const nextButtonClass = `swiper-nav-${props.carouselId}-next`;
const prevButtonClass = `swiper-nav-${props.carouselId}-prev`;
</script>

<template>
  <div class="base-carousel-container c-shadow-filter-soft">
    <swiper
      :modules="modules"
      :slides-per-view="'auto'"
      :space-between="32"
      :centered-slides="true"
      :loop="false"
      :keyboard="{ enabled: true }"
      :initial-slide="1" 
      :navigation="{
        nextEl: `.${nextButtonClass}`,
        prevEl: `.${prevButtonClass}`,
      }"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in items" :key="item.id || index">
        <slot :item="item" :index="index"></slot>
      </swiper-slide>
    </swiper>

    <button :class="['nav-button', prevButtonClass]">
      <IconLeft />
    </button>
    <button :class="['nav-button', nextButtonClass]">
      <IconRight />
    </button>
  </div>
</template>

<style scoped>
.base-carousel-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.mySwiper {
  padding: 40px max(var(--container-padding), calc((100vw - 1400px) / 2));
  overflow: visible;
}

@media (max-width: 1560px) {
  .mySwiper {
    padding: 40px var(--container-padding);
  }
}

:deep(.swiper-wrapper) {
  align-items: center;
}

:deep(.swiper-slide) {
  /* 【修改】使用 CSS 變數來設定寬度 */
  width: v-bind(slideWidth);
  max-width: 90vw;
  transform: scale(0.8);
  transition: transform 0.5s ease, opacity 0.5s ease;
}

:deep(.swiper-slide-active) {
  transform: scale(1);
  z-index: 10;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  background-color: unset;
  width: 40px;
  height: 40px;
  padding: 8px; 
  box-sizing: border-box;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-button:first-of-type { /* 使用 :first-of-type 替代舊的 class name */
  left: 20px;
}

.nav-button:last-of-type { /* 使用 :last-of-type 替代舊的 class name */
  right: 20px;
}

@media (max-width: 700px) {
  :deep(.swiper-slide),
  :deep(.swiper-slide-active) {
    transform: none;
  }
  
  .nav-button:first-of-type {
    left: calc(var(--container-padding) - 10px);
  }

  .nav-button:last-of-type {
    right: calc(var(--container-padding) - 10px);
  }
}
</style>