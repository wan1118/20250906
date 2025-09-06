<script setup>
import { defineProps } from 'vue';
import CategoryButton from '@/components/button/CategoryButton.vue';
import BaseTag from '@/components/base/BaseTag.vue';
// 1. 引入 CardBody 和 LearnMoreButton 元件
import CardBody from '@/components/base/CardBody.vue';
import LearnMoreButton from '@/components/button/LearnMoreButton.vue';

// 定義傳入的 props
defineProps({
  // 案例研究的資料物件
  caseData: {
    type: Object,
    required: true,
  },
  // 圖片的 URL
  imageUrl: {
    type: String,
    default: '',
  },
  hasShadow: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <div class="case-study-card d-flex align-items-center c-bg-white-base c-card-border ui-radius-48"
    :class="{ 'no-shadow': !hasShadow }">
    <div class="image-container d-flex justify-content-center align-items-center">
      <img :src="imageUrl" alt="案例研究圖片" class="case-image ui-radius-26">
    </div>

    <CardBody :line-clamp="1" :title="caseData.title" footer-align="right"> <template #header>
        <CategoryButton :text="caseData.category" :isClickable="false" />
      </template>

      <p class="card-content text-p">
        {{ caseData.description }}
      </p>
      <div class="tags-list">
        <div v-for="(tag, tagIndex) in caseData.tags" :key="tagIndex" class="tag-wrapper">
          <BaseTag :text="tag.text" :clickable="false" />
        </div>
      </div>

      <template #footer>
        <LearnMoreButton :to="caseData.moreUrl" text="閱讀全文" @click.prevent />
      </template>
    </CardBody>
  </div>
</template>


<style scoped>
/* 原本的樣式大多可以保留，因為它們是針對 Card 內元素的樣式 */
.case-study-card {
  height: 100%;
  /* << ⭐️ 確保卡片預設填滿父容器(carousel__slide)的高度 */
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  /* 修改為 stretch 讓 CardBody 能填滿高度 */
  max-width: 1400px;
  width: 100%;
  box-shadow: var(--c-shadow-soft);
}

/* 【no-shadow 規則來移除陰影 */
.case-study-card.no-shadow {
  box-shadow: none;
}

.image-container {
  width: 560px;
  padding: var(--card-body-padding) 0 var(--card-body-padding) var(--card-body-padding);
  flex-shrink: 0;
  height: auto;
}

.case-image {
  width: 100%;
  aspect-ratio: 940 / 788;
  object-fit: cover;
}

.card-content {
  white-space: pre-line;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-title {
  /* white-space: normal; */
  overflow-wrap: break-word;
}

.tags-list {
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tags-list::-webkit-scrollbar {
  display: none;
}

.tag-wrapper {
  flex-shrink: 0;
}



/* --- RWD 響應式修改 --- */
@media (max-width: 1560px) {
  .case-study-card {
    width: calc(100vw - (var(--container-padding) * 2));
  }
}

@media (max-width: 1200px) {
  .image-container {
    width: 50%;
  }

  .case-image {
    /* aspect-ratio: 700 / 788; */
  }

  .card-content {
    -webkit-line-clamp: 3;
  }
}

@media (max-width: 992px) {
  .case-study-card {
    width: calc(100vw - (var(--container-padding) * 3));
  }
}


@media (max-width: 850px) {
  .case-image {
    aspect-ratio: 700 / 720;
  }
}

/* @media (max-width: 765px) {
  .case-image {
    aspect-ratio: 940 / 788;
  }
} */

@media (max-width: 576px) {
  .case-study-card {
    width: calc(100vw - (var(--container-padding) * 2));
    width: 100%;

    flex-direction: column;
    align-items: normal;
    height: auto;
    /* 在手機版直向排列時，讓高度回歸自動 */
  }

  .image-container {
    padding: var(--card-body-padding) var(--card-body-padding) 0;
    width: 100%;
  }

  .case-image {
    /* max-height: 300px; */
    aspect-ratio: 940 / 788;
  }

  .card-content {
    -webkit-line-clamp: 2;
  }
}
</style>