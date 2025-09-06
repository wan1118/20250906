<script setup>
import { ref, computed } from 'vue';
import CategoryButton from '@/components/button/CategoryButton.vue';
import CardBody from '@/components/base/CardBody.vue';
import PlayTriangle from '@/components/icons/play-triangle.vue';

// 定義 props，讓父元件可以傳遞一個包含所有卡片資訊的物件
const props = defineProps({
  cardData: {
    type: Object,
    required: true,
    default: () => ({
      videoId: 'yt_01', // 預設的影片 ID
      category: '預設分類',
      categoryUrl: '#',
      title: '這是一個預設的活動標題',
      titleUrl: '#',
      learnMoreUrl: '#'
    })
  },
  stateManagedByParent: {
    type: Boolean,
    default: false // 預設為 false (自主管理模式)
  },
  categoryClickable: {
    type: Boolean,
    default: true
  },
  fullWidth: {
    type: Boolean,
    default: false // 預設為 false，維持原本的響應式行為
  },
  hasShadow: {
    type: Boolean,
    default: true // 預設為 true (有陰影)
  }
});

// 定義此組件可以發出的自訂事件
const emit = defineEmits(['category-click', 'load-video']);

// 當分類按鈕被點擊時，呼叫此函式
function handleCategoryClick() {
  // 只有在 categoryClickable 為 true 時才執行
  if (props.categoryClickable) {
    emit('category-click', props.cardData.category);
  }
}

// 追蹤影片是否已載入
// 內部狀態，僅在「自主管理模式」下使用
const isLoadedInternal = ref(false);

// 根據模式，決定到底要看父層的狀態還是自己的狀態
const shouldShowVideo = computed(() => {
  return props.stateManagedByParent ? props.cardData.isLoaded : isLoadedInternal.value;
});

// 根據模式，決定點擊後的行為
function handleLoadVideo() {
  if (props.stateManagedByParent) {
    emit('load-video'); // 在父層管理模式下，通知父層
  } else {
    isLoadedInternal.value = true; // 在自主管理模式下，自己改變狀態
  }
}
</script>

<template>
  <div class="activity-card c-bg-white-base c-text-primary c-card-border ui-radius-80"
    :class="{ 'is-full-width': fullWidth, 'no-shadow': !hasShadow }">
    <div class="video-container">
      <div v-if="!shouldShowVideo" class="video-placeholder" @click="handleLoadVideo">
        <img :src="`https://img.youtube.com/vi/${cardData.videoId}/hqdefault.jpg`" :alt="cardData.title"
          class="video-thumbnail">
        <div class="play-button">
          <PlayTriangle class="play-icon" />
        </div>
      </div>
      <iframe v-else :src="`https://www.youtube.com/embed/${cardData.videoId}?autoplay=1`" title="YouTube video player"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
    <CardBody :title="cardData.title">

      <template #header>
        <div class="categories">
          <CategoryButton :text="cardData.category" :href="cardData.categoryUrl" @click.prevent="handleCategoryClick"
            :is-clickable="categoryClickable" />
        </div>
      </template>

      <template #title>
        <a :href="cardData.titleUrl" @click.prevent="handleLoadVideo">
          {{ cardData.title }}
        </a>
      </template>

    </CardBody>
  </div>
</template>

/* In VideoCard.vue */
<style scoped>
/* --- ▼▼▼ 調整樣式邏輯 ▼▼▼ --- */
/* 預設的響應式樣式 (當 is-full-width class 不存在時生效) */
.activity-card:not(.is-full-width) {
  height: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  /* 桌機版寬度，根據計算結果設定 */
  width: 686px;
  width: calc((100vw - ((var(--c-gap-28)) / 2)) / 2 - (var(--container-padding) * 2));
  box-shadow: var(--c-shadow-soft);
}

/* 覆寫並移除陰影 */
.activity-card.no-shadow {
  box-shadow: none;
}

/* 全寬模式的樣式 */
.activity-card.is-full-width {
  width: 100%;
  height: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}


/* 上方影片區域 */
.activity-card .video-container {
  aspect-ratio: 16 / 9;
  max-height: 386px;
  position: relative;
  overflow: hidden;
}

.activity-card .video-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
}

.video-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: #000;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 118px*/
  width: 7.375rem;
  height: 7.375rem;
  border-radius: 50%;
  /* background-color: rgba(104, 104, 104, 0.6); */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  border: 0.3rem solid white;
  /* 4.81px */
}

.play-icon {
  /* 50.57px 3.16rem*/
  width: 2.5rem;
  height: 2.5rem;
  color: var(--color-white-base);
}

.video-placeholder:hover .play-button {
  background-color: rgba(255, 255, 255, 0.8);
  background-color: rgba(255, 255, 255, 0.39);

  transform: translate(-50%, -50%) scale(1.1);
}

/* 使用 :deep() 來針對 CardBody 內部的標題進行樣式追加 */
.activity-card :deep(.card-title-wrapper a) {
  height: calc(var(--font-size-h3) * 1.5 * 2);
}


@media (max-width: 1200px) {
  .play-button {
    width: 80px;
    height: 80px;
    border-width: 0.25rem;
  }

  .play-icon {
    width: 1.6rem;
    height: 1.6rem;
  }
}


@media (max-width: 576px) {
  .activity-card:not(.is-full-width) {
    width: calc(100vw - (var(--container-padding) * 2));
  }
}
</style>