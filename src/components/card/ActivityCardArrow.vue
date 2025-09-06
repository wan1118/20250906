<script setup>
import { useRouter, useRoute } from 'vue-router';
import CategoryButton from '@/components/button/CategoryButton.vue';
import LearnMoreButton from '@/components/button/LearnMoreButton.vue';
import CardBody from '@/components/base/CardBody.vue';

const props = defineProps({
  cardData: {
    type: Object,
    required: true,
    default: () => ({
      imageUrl: 'https://placehold.co/447x333/EFEFEF/333?text=Image',
      category: { text: '分類', url: '#' },
      title: { text: '活動標題', url: '#' },
      moreUrl: '#'
    })
  },
  hasShadow: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['image-click', 'category-click']);

const router = useRouter();
const route = useRoute();

function handleCardClick() {
  emit('image-click');
}

function handleCategoryClick() {
  // 檢查是否已經在目標頁面
  if (route.path === '/video') {
    // 如果是，就只發送事件，讓父層處理滾動
    emit('category-click', props.cardData.category.text);
  } else {
    // 如果不是，才執行頁面導航
    router.push({ path: '/video', query: { category: props.cardData.category.text } });
  }
}
</script>

<template>
  <div class="activity-card c-bg-white-base c-text-primary c-card-border ui-radius-80" :class="{ 'no-shadow': !hasShadow }"
>
    <img :src="cardData.imageUrl" class="card-img-top" alt="活動圖片" @click="handleCardClick" style="cursor: pointer;">

    <CardBody :title="cardData.title.text" @click="handleCardClick" style="cursor: pointer;" footer-align="right">

      <template #header>
        <div class="card-category">
          <CategoryButton :text="cardData.category.text" @click.stop="handleCategoryClick" />
        </div>
      </template>

      <template #footer>
        <div class="footer-wrapper">
          <LearnMoreButton :to="cardData.moreUrl" text="查看全部" />
        </div>
      </template>

    </CardBody>
  </div>
</template>

<style scoped>
.card-category a {
  text-decoration: none;
  display: inline-block;
}

.activity-card {
  width: 100%;
  background-color: var(--color-white-base);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  box-shadow: var(--c-shadow-soft);
}

/* 【no-shadow 規則來移除陰影 */
.activity-card.no-shadow {
  box-shadow: none;
}

/* 【步驟三】確保無陰影狀態下 hover 也沒有陰影 */
.activity-card:not(.no-shadow):hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

/* 當整個卡片被 hover 時，觸發 LearnMoreButton 內部圖示的 hover 動畫 */
.activity-card:hover :deep(.learn-more .icon) {
  transform: translateX(5px);
}

.activity-card .card-img-top {
  aspect-ratio: var(--aspect-ratio-custom);
  width: 100%;
  /* height: 333px; */
  object-fit: cover;
}

@media (max-width: 576px) {
.activity-card .card-img-top {
  max-height: 250px;
}
}
</style>