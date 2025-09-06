<script setup>
import { onMounted, ref } from 'vue';
import CategoryButton from '@/components/button/CategoryButton.vue';
import BaseTag from '@/components/base/BaseTag.vue';
import CardBody from '@/components/base/CardBody.vue';

// 接收從燈箱傳來的資料
const props = defineProps({
  caseData: {
    type: Object,
    required: true,
  },
});

// 處理圖片動態載入 (這段邏輯從 CaseCardCarousel.vue 借過來)
const imageUrl = ref('');
onMounted(async () => {
  try {
    const imageUrls = import.meta.glob('@/assets/img/future/future-awareness/*.{jpg,png,svg}');
    const path = `/src/assets/img/future/future-awareness/${props.caseData.imageUrl}`;
    if (imageUrls[path]) {
      const module = await imageUrls[path]();
      imageUrl.value = module.default;
    }
  } catch (error) {
    console.error("圖片載入失敗:", error);
  }
});
</script>

<template>
  <div class="case-study-post c-bg-white-base c-card-border ui-radius-48">
    <div class="image-container">
      <img v-if="imageUrl" :src="imageUrl" alt="案例研究圖片" class="case-image ui-radius-26">
    </div>

    <CardBody :line-clamp="false" :title="caseData.title" footer-mode="adjacent" :title-interactive="false">
      <template #header>
        <CategoryButton :text="caseData.category" :isClickable="false" />
      </template>

      <div class="scrollable-content">
        <p class="card-content text-p">
          {{ caseData.description }}
        </p>
        <div class="tags-list">
          <div v-for="(tag, tagIndex) in caseData.tags" :key="tagIndex" class="tag-wrapper">
            <BaseTag :text="tag.text" :clickable="false" />
          </div>
        </div>
      </div>
      
      <template #footer>
      </template>
    </CardBody>
  </div>
</template>

<style scoped>
/* 佈局與 CaseStudyCard 相似，但針對燈箱進行了調整 */
.case-study-post {
  display: flex;
  flex-direction: row;
  overflow: hidden; /* 確保圓角效果正常 */
  width: 100%;
  height: 100%;
}

.image-container {
  width: 560px;
  padding: var(--card-body-padding);
  flex-shrink: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.case-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* CardBody 的父容器會繼承 flex 屬性，我們讓它填滿剩餘空間 */
:deep(.card-body-container) {
  /* 確保 CardBody 填滿剩餘高度，並讓內部元素從頂部開始排列 */
  height: 100%;
  justify-content: flex-start; /* 【重點】讓 CardBody 內容置頂 */
}

/* 【滾動內容的關鍵】 */
.scrollable-content {
  flex-grow: 1; /* 佔據 CardBody 剩餘的垂直空間 */
  overflow-y: auto; /* 當內容超出時，顯示垂直滾動條 */
  min-height: 0; /* 在 Flexbox 中啟用滾動的關鍵技巧 */
  padding-right: 16px; /* 留出滾動條空間，避免內容被遮擋 */
  margin-right: -16px; /* 將多餘的 padding 推回去，維持視覺對齊 */
}

.card-content {
  white-space: pre-line; /* 保留換行符 */
  margin-bottom: 24px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap; /* 讓標籤可以換行 */
  gap: 1rem;
}

/* --- ▼▼▼ 滾輪CardBody :deep --- */
/* 因為 CardBody.vue 預設使用 gap: 24px 來處理區塊間距，
  但在沒有 footer 的情況下，這個 gap 會在固定高度的容器中產生問題。
  所以我們在這裡針對這個特例進行覆寫。
*/
:deep(.card-body-container) {
  /* 步驟 1: 關閉 CardBody 的全域 gap，避免產生多餘的底部間距 */
  gap: 0;
}

:deep(.header-slot) {
  /* 步驟 2: 手動補回 header 下方的間距，維持版面視覺 */
  margin-bottom: 24px;
}
@media (max-width: 996px) {
.image-container {
  width: 500px;
}
}

/* --- RWD 響應式修改 --- */
@media (max-width: 768px) {
  .case-study-post {
    flex-direction: column;
  }

  .image-container {
    width: 100%;
    height: auto;
    max-height: 40vh; /* 手機上限制圖片高度 */
    padding: var(--card-body-padding) var(--card-body-padding) 0;
  }
  .case-image {
  width: auto;
  height: 100%;
  object-fit: contain;
}

 /* 👇  RWD 滾動 */
  :deep(.card-body-container) {
    flex-grow: 1;  /* 讓 CardBody 填滿父容器在垂直方向上剩餘的空間 */
    min-height: 0; /* 這是關鍵！允許 CardBody 本身的高度可以被壓縮，從而讓其內部可以滾動 */
  }
}
</style>