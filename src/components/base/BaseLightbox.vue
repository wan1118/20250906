<script setup>
import { ref, watch, nextTick } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import IconRight from '@/components/icons/direction/right.vue';
import IconLeft from '@/components/icons/direction/left.vue';

const props = defineProps({
  items: { type: Array, required: true },
  startIndex: { type: Number, default: 0 },
  show: { type: Boolean, default: false },
  // 1. 【新增】用這個 prop 來決定是否要顯示底部區域
  showFooter: { type: Boolean, default: false }
});

const emit = defineEmits(['close']);

const swiperInstance = ref(null);
const modules = [Navigation, Keyboard];
const internalCurrentIndex = ref(props.startIndex);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const onSlideChange = (swiper) => {
  internalCurrentIndex.value = swiper.activeIndex;
};

// 2. 【新增】提供一個函式讓子元件可以從外部更新 swiper 的頁碼
const onIndexUpdate = (newIndex) => {
    internalCurrentIndex.value = newIndex;
    swiperInstance.value?.slideTo(newIndex);
};

watch(() => props.show, async (isVisible) => {
  if (isVisible) {
    internalCurrentIndex.value = props.startIndex;
    await nextTick();
    swiperInstance.value?.slideTo(props.startIndex, 0);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeydown);
  } else {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeydown);
  }
});

const closeLightbox = () => {
  emit('close');
};

const handleKeydown = (e) => {
  if (props.show && e.key === 'Escape') {
    closeLightbox();
  }
};
</script>

<template>
  <transition name="lightbox-fade">
    <div v-if="show && items.length" class="lightbox-overlay" @click.self="closeLightbox">
      <button class="close-btn" @click="closeLightbox" aria-label="關閉視窗">&times;</button>
      
      <div class="lightbox-main-content">
        <div class="swiper-container">
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="30"
            :keyboard="{ enabled: true }"
            :navigation="{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }"
            :initial-slide="props.startIndex"
            @swiper="onSwiper"
            @slide-change="onSlideChange"
            class="mySwiper"
          >
            <swiper-slide v-for="(item, index) in items" :key="item.id || index">
              <slot :item="item" :index="index"></slot>
            </swiper-slide>
          </swiper>

          <button class="nav-btn swiper-button-prev-custom" aria-label="上一則">
            <IconLeft class="c-icon-size-50" />
          </button>
          <button class="nav-btn swiper-button-next-custom" aria-label="下一則">
            <IconRight class="c-icon-size-50" />
          </button>
        </div>
        
        <div v-if="showFooter" class="footer-content">
          <slot 
            name="footer" 
            :items="items" 
            :currentIndex="internalCurrentIndex" 
            :onUpdate:currentIndex="onIndexUpdate"
          ></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.lightbox-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.85); /* 移除變數依賴，更通用 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1030;
  padding: var(--container-padding);
  box-sizing: border-box;
}
.lightbox-main-content {
  width: 100%; height: 100%;
  max-width: 1200px;
  max-height: 90vh;
  /* 【修改】設定為 flex column 佈局 */
  display: flex;
  flex-direction: column;
}
.close-btn {
  position: absolute;
  top: 20px; right: 30px;
  font-size: 3rem; color: var(--color-white-base);
  background: none; border: none; cursor: pointer;
  line-height: 1; z-index: 10;
}
.swiper-container {
  position: relative;
  /* 【修改】讓 swiper 填滿剩餘空間 */
  flex-grow: 1;
  min-height: 0; /* Flex 佈局下，允許內容縮小的關鍵 */
  display: flex;
  align-items: center;
  justify-content: center;
}
.mySwiper {
  width: 100%; height: 100%;
}
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: none; border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer; transition: color 0.3s;
}
.nav-btn:hover { color: var(--color-white-base); }

.nav-btn.swiper-button-disabled {
  opacity: 0.2; /* 讓按鈕變透明 */
  cursor: not-allowed; /* 將滑鼠游標改為「禁止」圖示 */
  color: rgba(255, 255, 255, 0.7); /* 避免 hover 時又變亮 */
}

.swiper-button-prev-custom { left: -80px; }
.swiper-button-next-custom { right: -80px; }

/* 【新增】底部內容的樣式 */
.footer-content {
  flex-shrink: 0; /* 確保底部區域高度不會被壓縮 */
  padding-top: 16px;
  text-align: center;
}

@media (max-width: 992px) {
  .swiper-button-prev-custom,
  .swiper-button-next-custom {
    display: none;
  }
}
.lightbox-fade-enter-active, .lightbox-fade-leave-active { transition: opacity 0.4s ease; }
.lightbox-fade-enter-from, .lightbox-fade-leave-to { opacity: 0; }
</style>