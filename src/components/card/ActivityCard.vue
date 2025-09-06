<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import CategoryButton from '@/components/button/CategoryButton.vue';
import CardBody from '@/components/base/CardBody.vue';
import BaseTag from '@/components/base/BaseTag.vue';
import ContactInfoItem from '@/components/base/ContactInfoItem.vue';
import IconTime from '@/components/icons/icons-18px/time.vue';
import IconLoca from '@/components/icons/icons-18px/loca.vue';

const props = defineProps({
  cardData: {
    type: Object,
    required: true
  },
  hasShadow: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['category-clicked', 'tag-clicked', 'details-click']);

const mapLink = computed(() => {
  if (!props.cardData.location) return null;
  const encodedLocation = encodeURIComponent(props.cardData.location);
  return `https://www.google.com/maps?q=${encodedLocation}`;
});

function onCategoryClick(category) {
  emit('category-clicked', category);
}

function onTagClick(tag) {
  emit('tag-clicked', tag);
}
</script>

<template>
  <div class="activity-card c-bg-white-base c-text-primary c-card-border ui-radius-80"
       :class="{ 'no-shadow': !hasShadow }"
       @click="emit('details-click')">
    <img :src="cardData.imageUrl" class="card-img-top" alt="活動圖片">

    <CardBody content-spacing="normal" :line-clamp="2">

      <template #title>
        <h3 class="card-title u-interactive-link-hover">
          {{ cardData.title }}
        </h3>
      </template>

      <template #header>
        <CategoryButton :text="cardData.category" @click.stop="onCategoryClick(cardData.category)" />
      </template>

      <div class="info-list">
        <ContactInfoItem v-if="cardData.eventTime" :icon-component="IconTime" label="" :value="cardData.eventTime"
          :truncate="true" />

        <ContactInfoItem v-if="cardData.location" :icon-component="IconLoca" label="" :value="cardData.location"
          :href="mapLink" :truncate="true" @click.stop />
      </div>

      <template #footer>
        <div class="tags-list">
          <div v-for="tag in cardData.tags" :key="tag.text" class="tag-wrapper" @click.stop="onTagClick(tag.text)">
            <BaseTag :text="tag.text" :clickable="true" />
          </div>
        </div>
      </template>

    </CardBody>
  </div>
</template>


<style scoped>
.activity-card {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  box-shadow: var(--c-shadow-soft);
  cursor: pointer; /* 【修改】讓整張卡片顯示為可點擊狀態 */
}
/* 【no-shadow 規則來移除陰影 */
.activity-card.no-shadow {
  box-shadow: none;
}

/* 【步驟三】確保無陰影狀態下 hover 也沒有陰影 */
.activity-card:not(.no-shadow):hover {
  transform: translateY(-5px);
  box-shadow: var(--c-shadow-hover);
}

.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--c-shadow-hover);
}

.card-img-top {
  aspect-ratio: var(--aspect-ratio-custom);
  width: 100%;
  object-fit: cover;
  display: block;
}

/* 【修改】讓標題不再需要單獨設定點擊狀態 */
.card-title {
  /* 根據設計稿或 CardBody 原始樣式可能需要微調 */
  font-size: var(--font-size-h3);
  /* 假設標題是 h3 等級，可根據實際情況調整 */
  font-weight: var(--font-weight-bold);
  line-height: 1.4;
}

/* 【新增樣式】讓包裹層的滑鼠游標顯示為可點擊狀態 */
.tag-wrapper {
  cursor: pointer;
}

@media (max-width: 576px) {
  .card-img-top {
    max-height: 200px;
  }
}
</style>