<!-- 相關資源連結 -->
<script setup>
import { ref, computed, watch } from 'vue';

import IconRight from '@/components/icons/direction/right.vue';
import IconLeft from '@/components/icons/direction/left.vue';

import ResponsiveFilterGroup from '@/components/menu/ResponsiveFilterGroup.vue';

import LearningCard from '@/components/card/InfoCard.vue';
import FutureLinks from '@/assets/data/future_links.json';

// [修改] 匯入新的 CardListView 共用元件
import CardListView from '@/components/base/CardListView.vue';

defineOptions({
  name: 'LearningUnitList'
});

const learningAllRef = ref(null);
const categoryButtons = ref([
  '全部資源', '心理健康與成長', '學習資訊', '升學與職涯探索', '法律知識與權益保障'
]);

const learningUnits = ref(FutureLinks);
const selectedCategory = ref('全部資源');
const filteredLearningUnits = computed(() => {
  if (selectedCategory.value === '全部資源') {
    return learningUnits.value;
  }
  return learningUnits.value.filter(unit => unit.category === selectedCategory.value);
});

watch(selectedCategory, () => {
  if (learningAllRef.value) {
    const elementPosition = learningAllRef.value.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - 220;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
});

// 負責接收從 LearningCard 子元件傳來的事件
function selectCategory(category) {
  selectedCategory.value = category;
};
</script>

<template>
  <div ref="learningAllRef" class="c-flex-col">
    <div class="filter-buttons categories">
      <ResponsiveFilterGroup :buttons="categoryButtons" v-model:activeCategory="selectedCategory" :sticky="false" class="w-100 menu-cardlist-mb" />
    </div>
    <CardListView>
      <LearningCard v-for="unit in filteredLearningUnits" :key="unit.id" :unit="unit" :has-shadow="false"
        @category-click="selectCategory" />
    </CardListView>
  </div>
</template>