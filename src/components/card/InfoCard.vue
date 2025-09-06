<!-- 相關資源連結 -->
<script setup>
import { defineProps, defineEmits } from 'vue';
import CardBody from '@/components/base/CardBody.vue';
import CategoryButton from '@/components/button/CategoryButton.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import IconExternal from '@/components/icons/external.vue';

// 定義元件從父元件接收的資料
defineProps({
  unit: {
    type: Object,
    required: true
  },
  hasShadow: {
    type: Boolean,
    default: true
  }
});

// 定義元件向父元件發送的事件
const emit = defineEmits(['category-click']);

// 從原檔案搬移過來的圖片路徑處理函式
function getImageUrl(name) {
  return new URL(`../../assets/img/future/future-links/${name}`, import.meta.url).href;
}

// 當卡片內的分類按鈕被點擊時，通知父元件
function selectCategoryInCard(category) {
  emit('category-click', category);
}
</script>

<template>
  <div class="learning-unit-card c-bg-white-base c-text-primary c-card-border ui-radius-56" :class="{ 'no-shadow': !hasShadow }">
    <div class="row g-0 h-100">
      <div class="col-md-5 card-img-content">
        <img :src="getImageUrl(unit.imageUrl)" class="learning-unit-img" :alt="unit.title">
      </div>
      <div class="col-md-7 d-flex align-items-center">
        <CardBody :title="unit.title" footer-align="right" class="card-body-right">

          <template #header>
            <div class="categories">
              <CategoryButton :text="unit.category" class="card-category-button"
                @click="selectCategoryInCard(unit.category)" />
            </div>
          </template>

          <template #title>
            <a :href="unit.link" target="_blank" rel="noopener noreferrer">
              {{ unit.title }}
            </a>
          </template>

          <p class="text-p">
            {{ unit.description }}
          </p>

          <template #footer>
            <BaseButton size="medium" shape="pill" variant="solid">
              <a :href="unit.link" target="_blank" rel="noopener noreferrer">
                <span>前往查看</span>
                <IconExternal class="c-icon-size-18 c-transition-transform icon-scale-on-hover" />
              </a>
            </BaseButton>
          </template>

        </CardBody>
      </div>
    </div>
  </div>
</template>

<style scoped>
.learning-unit-card {
  max-width: 1400px;
  height: auto;
  overflow: hidden;
  margin: auto;
   box-shadow: var(--c-shadow-soft);
}

/* no-shadow 規則來移除陰影 */
.learning-unit-card.no-shadow {
  box-shadow: none;
}

.learning-unit-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-body-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.card-img-content {
  object-fit: contain;
  padding: var(--card-body-padding);
  padding-right: 1.8125rem;
  /* 29px */
}

.stretched-link-custom::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  content: "";
}

@media (max-width: 767.98px) {
  .card-img-content {
    padding-right: var(--card-body-padding);
    padding-bottom: 4px;
  }
}
</style>