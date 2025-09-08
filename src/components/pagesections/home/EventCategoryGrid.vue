<script setup>
import { shallowRef } from 'vue';
import { useRouter } from 'vue-router';

// 1. 將 Icon 元件的 import 移至此處
import IconLeisure from '@/components/iconsecd/IconLeisure.vue';
import IconCompetition from '@/components/iconsecd/IconCompetition.vue';
import IconLearning from '@/components/iconsecd/IconLearning.vue';
import IconExhibition from '@/components/iconsecd/IconExhibition.vue';
import IconCharity from '@/components/iconsecd/IconCharity.vue';

// 2. 將 eventCategories 的定義移至此處
const eventCategories = shallowRef([
  { name: "休閒娛樂", iconComponent: IconLeisure },
  { name: "競賽與體育", iconComponent: IconCompetition },
  { name: "學習與成長", iconComponent: IconLearning },
  { name: "宣導與展覽", iconComponent: IconExhibition },
  { name: "公益與志工", iconComponent: IconCharity },
]);

// 3. 將路由功能和導航方法移至此處
const router = useRouter();
const goToInformation = (categoryName) => {
  router.push({ path: '/information', query: { category: categoryName } });
};
</script>

<template>
  <div class="event-cata-icon">
    <div v-for="(category, index) in eventCategories" :key="index"
      class="cata text-h4 c-bg-white-base ui-radius-48 c-shadow-soft" @click="goToInformation(category.name)">
      <div class="cata-icon-wrapper">
        <component :is="category.iconComponent" />
      </div>
      <div v-if="category.name === '公益與志工'" class="fw-bold">
        公益與志工<br class="br-tablet">
      </div>
      <div v-else class="fw-bold">
        {{ category.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 【修改】容器改用 display: grid 排版 */
.event-cata-icon {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* 預設 5 欄式佈局 */
  gap: var(--c-gap-20);
}

/* 【修改】卡片樣式調整 */
.cata {
  /* 拿掉固定的寬高，讓 grid 系統決定 */
  /* width: 16rem; */
  /* height: 16rem; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  /* 【新增】四邊 padding */
  padding: 2.1875rem 1rem;
  /* 35px 32px */

  /* 【新增】icon 與文字的間距 */
  gap: 1.5rem;
  /* 24px */

  transition: background-color 0.3s ease, color 0.3s ease;
  --svg-color: var(--color-blue-500);
  cursor: pointer;
}

/* 【新增】包裝 icon 的容器，用來控制 icon 的最大尺寸 */
.cata-icon-wrapper {
  width: 100%;
  max-width: 135px;
  /* icon 最大寬度 135px */
}

/* 【修改】讓 SVG 響應式縮放 */
/* deep selector 確保能選到 component 渲染出的 svg */
:deep(.cata-icon-wrapper svg) {
  width: 100%;
  /* 寬度 100%，填滿 wrapper */
  height: auto;
  aspect-ratio: 1 / 1;
  /* 維持 1:1 的比例 */
  transition: color 0.3s ease;
}

.cata:hover {
  background-color: var(--color-blue-500);
  color: var(--color-white-base);
  --svg-color: var(--color-white-base);
}


/* 專門控制「公益與志工」換行的樣式 */

/* 預設狀態 (大尺寸) 和 小尺寸 (<= 576px)：隱藏這個換行符 */
.br-tablet {
  display: none;
}

/* 中尺寸 (介於 577px 和 992px 之間)：顯示這個換行符 */
@media (min-width: 666px) and (max-width: 992px) {
  .br-tablet {
    display: initial; /* 恢復 <br> 標籤的預設行為 */
  }
}

/* 【新增】響應式斷點：平板 */
@media (max-width: 1400px) {
  .cata {
    font-size: var(--font-size-p);
    padding: 1.2rem 1rem;
  }

  :deep(.cata-icon-wrapper svg) {
    width: 100%;
    max-width: 120px;
  }
}

@media (max-width: 1200px) {
  .cata {
    font-size: 18px;
    padding: 1.2rem 1rem;
  }

  :deep(.cata-icon-wrapper svg) {
    max-width: 100px;
  }
}

/* 【新增】響應式斷點：平板 */
@media (max-width: 1100px) {
  .cata {
    font-size: 16px;
    padding: 1.2rem 1rem;
  }
}

/* 【新增】響應式斷點：平板 */
@media (max-width: 992px) {
  .cata {
    /* font-size: var(--font-size-p); */
    padding: 1.2rem 1rem;
  }

  .event-cata-icon {
    /* 在平板尺寸變為 3 欄 */
    /* grid-template-columns: repeat(3, 1fr); */
  }

  :deep(.cata-icon-wrapper svg) {
    max-width: 80px;
  }
}

@media (max-width: 666px) {
  .event-cata-icon {
  display: flex;
 flex-wrap: wrap;
 justify-content: center;
  }

  .cata {
    width: calc((100% - var(--container-padding) * 2 - var(--c-gap-20) / 3) / 3);
  }
}

@media (max-width: 521px) {
    .br-tablet {
    display: initial; /* 恢復 <br> 標籤的預設行為 */
  }
}


@media (max-width: 494px) {
  .cata {
    font-size: 14px;
  }

      :deep(.cata-icon-wrapper svg) {
    max-width: 60px;
  }
}

</style>