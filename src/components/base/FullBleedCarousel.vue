<script setup>
// 【新增】引入 computed 以建立響應式樣式
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Keyboard } from 'swiper/modules';
import IconRight from '@/components/icons/direction/right.vue';
import IconLeft from '@/components/icons/direction/left.vue';

import 'swiper/css';
import 'swiper/css/navigation';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  gap: {
    type: String,
    default: '28px'
  },
  // 【新增】新增 prop 以控制 ICON 是否可見
  buttonIconVisible: {
    type: Boolean,
    default: false // 預設為 false，代表 ICON 透明
  }
});

// 【新增】建立計算屬性來決定 ICON 的透明度
const iconOpacity = computed(() => {
  // 檢查是否在瀏覽器環境且寬度是否為手機尺寸
  if (typeof window !== 'undefined' && window.innerWidth <= 576) {
    return 1; // 手機尺寸，強制不透明
  }
  // 桌面尺寸，根據 prop 決定透明或不透明
  return props.buttonIconVisible ? 1 : 0;
});

const modules = [Navigation, Keyboard];
</script>

<template>
  <div class="fbc-container c-shadow-filter-soft" :style="{ '--icon-opacity': iconOpacity }">
    <swiper
      :modules="modules"
      :slides-per-view="'auto'"
      :space-between="parseInt(gap)"
      :loop="false"
      :keyboard="{ enabled: true }"
      :navigation="{
        nextEl: '.fbc-button-next',
        prevEl: '.fbc-button-prev',
      }"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in items" :key="item.id || index">
        <slot :item="item" :index="index"></slot>
      </swiper-slide>
    </swiper>

    <button class="nav-button fbc-button-prev">
      <IconLeft />
    </button>
    <button class="nav-button fbc-button-next">
      <IconRight />
    </button>
  </div>
</template>

<style scoped>
/* 容器 */
.fbc-container {
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
  align-items: center; /* 垂直置中 */
}

:deep(.swiper-slide) {
  width: auto;
  display: flex;
  align-items: stretch;
}


/* --- 按鈕樣式 (關鍵) --- */

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
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* 【新增】使用 CSS 變數來動態控制 ICON 的透明度 */
.nav-button :deep(svg) {
  opacity: var(--icon-opacity);
  transition: opacity 0.3s ease;
}

.fbc-container:hover .nav-button {
  opacity: 1;
}

.nav-button.swiper-button-disabled {
  display: none;
}

.fbc-button-prev {
  left: 20px;
}
.fbc-button-next {
  right: 20px;
}


/* --- 手機版響應式樣式 (≤ 576px) --- */
@media (max-width: 576px) {
  .nav-button {
    opacity: 1;
  }
  
  .fbc-button-prev {
    left: calc(var(--container-padding) - 10px);
  }
  .fbc-button-next {
    right: calc(var(--container-padding) - 10px);
  }
}
</style>