<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import BaseButton from '@/components/button/BaseButton.vue';
import IconDown from '@/components/icons/direction/down.vue';

// 定義元件接收的 props
const props = defineProps({
  // 接收完整的、已經篩選過的項目陣列
  items: {
    type: Array,
    required: true,
  },
  // 初始顯示的項目數量
  initialShow: {
    type: Number,
    default: 6,
  },
  // 每次點擊 "載入更多" 時要增加的項目數量
  itemsPerLoad: {
    type: Number,
    default: 6,
  },
  // 是否啟用自動滾動載入 (infinite scroll)
  autoLoad: {
    type: Boolean,
    default: false,
  },
});

// 內部狀態：當前可見的項目數量
const visibleCount = ref(props.initialShow);

// 計算要顯示在畫面上的項目
const displayedItems = computed(() => {
  return props.items.slice(0, visibleCount.value);
});

// 計算是否還有更多項目可以載入
const hasMore = computed(() => {
  return visibleCount.value < props.items.length;
});

// "載入更多" 的處理函式
function loadMore() {
  if (hasMore.value) {
    visibleCount.value += props.itemsPerLoad;
  }
}

// 監聽傳入的 items 陣列。當它發生變化時 (例如，父層的篩選條件改變)，
// 就重置 visibleCount 為初始值。
watch(() => props.items, () => {
  visibleCount.value = props.initialShow;
}, { deep: true }); // 使用 deep watch 確保陣列內部變化也能被偵測

// --- 以下是自動滾動載入的邏輯 ---
const observerEl = ref(null);
let observer = null;

onMounted(() => {
  // 只有在 autoLoad 為 true 且有觀察目標時才啟用
  if (props.autoLoad && observerEl.value) {
    observer = new IntersectionObserver((entries) => {
      // 當觀察目標進入視窗時，自動載入更多
      if (entries[0].isIntersecting && hasMore.value) {
        loadMore();
      }
    }, {
      rootMargin: '0px',
      threshold: 0.1,
    });
    observer.observe(observerEl.value);
  }
});

// 元件銷毀時，斷開觀察者以避免記憶體洩漏
onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <div>
    <template v-if="items.length > 0">
      <slot :items="displayedItems"></slot>
    </template>

    <template v-else>
      <div class="no-results-container">
        <slot name="empty">
          <p>找不到符合條件的項目</p>
        </slot>
      </div>
    </template>

    <div v-if="hasMore && !autoLoad" class="load-more-container">
      <BaseButton size="large" shape="pill" variant="solid">
        <button @click="loadMore">
          <span>了解更多</span>
          <IconDown class="c-icon-size-16 c-transition-transform icon-down-on-hover" />
        </button>
      </BaseButton>
    </div>

    <div v-if="hasMore && autoLoad" ref="observerEl" class="observer-element"></div>
  </div>
</template>

<style scoped>
.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: var(--c-gap-100);
}

.no-results-container {
  text-align: center;
  color: #888;
  padding: 80px 0;
  min-height: 300px;
  /* 避免畫面太空 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 針對不同頁面可能需要調整的樣式 */
@media (max-width: 769px) {
  .load-more-container {
    margin-top: var(--c-gap-62);
  }
}

/* 自動載入的觀察點，通常不需要大小 */
.observer-element {
  height: 20px;
}
</style>