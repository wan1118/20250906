<script setup>
import { ref, computed, watch, nextTick } from 'vue';
// 匯入banner元件及圖片
import Banner from '@/components/sections/Banner.vue';
import banner1920 from '@/assets/img/banner/resource-map-banner-1920.png';
import banner1400 from '@/assets/img/banner/resource-map-banner-1400.png';
import banner1200 from '@/assets/img/banner/resource-map-banner-1200.png';
import banner996 from '@/assets/img/banner/resource-map-banner-996.png';
import banner765 from '@/assets/img/banner/resource-map-banner-765.png';
import banner576 from '@/assets/img/banner/resource-map-banner-576.png';

const resourceMapBannerSources = [
  { media: '(min-width: 1401px)', srcset: banner1920 },
  { media: '(min-width: 1201px)', srcset: banner1400 },
  { media: '(min-width: 997px)', srcset: banner1200 },
  { media: '(min-width: 766px)', srcset: banner996 },
  { media: '(min-width: 577px)', srcset: banner765 },
];

const resourceMapDefaultBannerSrc = banner576;

import ContactCard from '@/components/card/ContactCard.vue';
// 匯入JSON 檔案
import unitsData from '@/assets/data/resourceMap.json';
// 匯入新的元件
import PaginatedView from '@/components/base/PaginatedView.vue';

// 響應式menu元件
import ResponsiveFilterGroup from '@/components/menu/ResponsiveFilterGroup.vue';

// [修改] 匯入新的 CardListView 共用元件
import CardListView from '@/components/base/CardListView.vue';

const filterButtons = ref([
  '全部分類', '家庭與成長支援', '安全與保護', '健康與防治', '就業與職涯', '社區參與', '政府與資源平台'
]);

const activeCategory = ref('全部分類');

// 【步驟1.1】宣告一個 ref 用於滾動定位
const scrollTarget = ref(null);

const allCards = ref(unitsData.map(unit => {
  return {
    id: unit.id,
    website: unit.website || '#',
    imageUrl: new URL(`../assets/img/resourcemap/${unit.img.full_size}`, import.meta.url).href,
    categories: unit.categories,
    title: unit.name,
    phone: unit.phone,
    email: unit.email,
    address: unit.address,
    // 直接傳遞原始的 socials 陣列
    socials: unit.socials || []
  };
}));

const filteredCards = computed(() => {
  if (activeCategory.value === '全部分類') {
    return allCards.value;
  }
  return allCards.value.filter(card =>
    card.categories.includes(activeCategory.value)
  );
});

function setCategoryFromCard(category) {
  // 呼叫我們已經寫好的、包含滾動邏輯的函式
  handleCategoryUpdate(category);
}


// 【步驟1.2】建立處理分類更新並滾動的函式
function handleCategoryUpdate(category) {
  activeCategory.value = category;
  // 使用 nextTick 確保在 DOM 更新後再執行滾動
  nextTick(() => {
    if (scrollTarget.value) {
      const elementPosition = scrollTarget.value.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 120; // 減去 Nav 高度
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
}
</script>

<template>
  <div class="c-flex-area">
    <Banner :sources="resourceMapBannerSources" :default-src="resourceMapDefaultBannerSrc" bigText="資源地圖"
      smallText="Support Map" />
        <div class="c-flex-area c-bg-wave c-bg-gray-area w-100">
    <div class="container-padding">
      <div ref="scrollTarget" class="c-content-1400 c-flex-col h1-title-gap">
        <!-- <h1 class="text-h1">資源地圖</h1> -->
        <div class="c-flex-col">
          <ResponsiveFilterGroup :buttons="filterButtons" :activeCategory="activeCategory"
            @update:activeCategory="handleCategoryUpdate" class="menu-cardlist-mb" />
          <PaginatedView :items="filteredCards" :initial-show="8" :items-per-load="8">
            <template #default="{ items }">
              <CardListView>
                <ContactCard v-for="card in items" :key="card.id" :card-data="card" :has-shadow="false"
                  @category-clicked="setCategoryFromCard" />
              </CardListView>
            </template>
            <template #empty>
              <p>找不到符合條件的資源單位</p>
            </template>
          </PaginatedView>
        </div>
      </div>
    </div></div>
  </div>
</template>