<!-- 了解你自己 -->
<script setup>
import { defineProps } from 'vue';
import CardBody from '@/components/base/CardBody.vue';
import IconExternal from '@/components/icons/external.vue';

// 1. 定義 props，接收從父層傳來的卡片資料
defineProps({
  card: {
    type: Object,
    required: true
  },
  hasShadow: {
    type: Boolean,
    default: true
  }
});

// 2. 處理動態圖片路徑的函式
const getImageUrl = (name) => {
  return new URL(`../../assets/img/future/future-test/${name}`, import.meta.url).href;
};
</script>

<template>
  <a :href="card.link" target="_blank" rel="noopener noreferrer"
    class="info-card c-bg-white-base c-text-primary c-card-border ui-radius-48" :class="{ 'no-shadow': !hasShadow }">

    <div class="card-img-wrapper">
      <img :src="getImageUrl(card.imageUrl)" :alt="card.title" class="card-image">
    </div>

    <CardBody :title="card.title" :title-interactive="false" footer-mode="adjacent">

      <template #title="{ titleText }">
        <h3 class="card-title-custom text-h3">
          {{ titleText }}&nbsp;&nbsp;
          <IconExternal class="c-icon-size-27 icon-external" />
        </h3>
      </template>

      <p v-if="card.description" class="text-p">{{ card.description }}</p>

    </CardBody>
  </a>
</template>

<style scoped>
/* 整個卡片的基礎樣式 */
.info-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  box-shadow: var(--c-shadow-soft);
}

/* no-shadow 規則來移除陰影 */
.info-card.no-shadow {
  box-shadow: none;
}

/* 圖片容器：佔滿頂部空間，裁切溢出內容 */
.card-img-wrapper {
  width: 100%;
  /* 您可以根據設計調整圖片的比例 */
  aspect-ratio: 2 / 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 圖片本身：設定內距、縮放方式與慢速動效 */
.card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 2rem;
  /* 透過 padding 產生內部距離 */
  box-sizing: border-box;
  /* 將動效速度放慢 */
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 卡片 Hover 時，放大圖片 */
.info-card:hover .card-image {
  transform: scale(1.1);
}

.info-card :deep(.card-body-container) {
  padding-top: 0;
}

/* 使用 :deep() 來選取並設定 CardBody 插槽內的標題樣式 */
.info-card :deep(.card-title-custom) {
  display: inline-flex;
  align-items: center;
  gap: 1.25rem;
}

/* 設定 Icon 的預設顏色 */
.info-card :deep(.icon-external) {
  color: var(--color-blue-500);
  /* 預設為藍色 */
  transition: color 0.3s ease;
}

/* 卡片 Hover 時，改變標題與 Icon 顏色 */
.info-card:hover :deep(.card-title-custom) {
  color: var(--color-blue-500);
  text-decoration: underline;
}

.info-card:hover :deep(.icon-external) {
  color: var(--color-blue-500);
}
</style>