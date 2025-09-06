<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import IconDown from '@/components/icons/direction/down.vue';
import IconUp from '@/components/icons/direction/up.vue';
const props = defineProps({
  categories: { type: Array, required: true },
  activeCategory: { type: String, required: true },
  tags: { type: Array, required: true },
  activeTags: { type: Array, required: true },
});
const emit = defineEmits(['update:activeCategory', 'update:activeTags']);

// --- 面板和置頂狀態的邏輯保持不變 ---
const isOpen = ref(false);
const filterContainerRef = ref(null);
const isSticky = ref(false);
let initialTop = 0;
const handleScroll = () => {
  if (window.innerWidth <= 769 && filterContainerRef.value) {
    if (initialTop > 0 && window.scrollY > initialTop) {
      isSticky.value = true;
    } else {
      isSticky.value = false;
    }
  } else {
    isSticky.value = false;
  }
};

onMounted(() => {
  if (filterContainerRef.value) {
    initialTop = filterContainerRef.value.offsetTop;
  }
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  // 【新增】確保元件卸載時，也移除點擊事件監聽器
  document.removeEventListener('click', handleClickOutside);
});


// 處理點擊外部區域的函式
function handleClickOutside(event) {
  // 檢查 filterContainerRef.value 是否存在，並且點擊目標是否不在其內部
  if (filterContainerRef.value && !filterContainerRef.value.contains(event.target)) {
    isOpen.value = false; // 關閉面板
  }
}

// 監聽 isOpen 的變化，來新增或移除全域點擊事件
watch(isOpen, (panelIsOpen) => {
  if (panelIsOpen) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

// --- 計算已選篩選數量的邏輯保持不變 ---
const activeFilterCount = computed(() => {
  let count = 0;
  if (props.activeCategory !== props.categories[0]) {
    count++;
  }
  count += props.activeTags.length;
  return count;
});

// --- 篩選函式保持不變 ---
const selectCategory = (category) => {
  emit('update:activeCategory', category);
};
const selectTag = (tag) => {
  const conflictingPairs = { '青少年': '全年齡', '全年齡': '青少年', '開放報名': '報名截止', '報名截止': '開放報名' };
  const newTags = [...props.activeTags];
  const index = newTags.indexOf(tag);

  if (index > -1) {
    newTags.splice(index, 1);
  } else {
    const conflictingTag = conflictingPairs[tag];
    if (conflictingTag && newTags.includes(conflictingTag)) {
      newTags.splice(newTags.indexOf(conflictingTag), 1);
    }
    newTags.push(tag);
  }
  emit('update:activeTags', newTags);
};
</script>

<template>
  <div ref="filterContainerRef">
    <div :style="{ height: isSticky ? '62px' : 'auto' }">
      <div class="panel-filter-wrapper" :class="{ 'is-sticky': isSticky }">
        <button @click="isOpen = !isOpen" class="panel-trigger-toggle" :class="{ active: isOpen }">
          <span class="flex items-center">
            <i class="bi bi-funnel-fill me-2"></i>
            顯示篩選條件
            <span v-if="activeFilterCount > 0" class="count-badge">{{ activeFilterCount }}</span>
          </span>
          <IconUp v-if="isOpen" class="c-icon-size-16" />
          <IconDown v-else class="c-icon-size-16" />
        </button>
        <div class="collapsible-panel" :class="{ 'is-open': isOpen, 'ui-radius-26': !isSticky }">
          <div class="filter-section">
            <h3 class="section-title">活動類型</h3>
            <div class="tags-container">
              <button
                v-for="cat in categories"
                :key="cat"
                @click="selectCategory(cat)"
                :class="['filter-tag', 'theme-orange', { active: activeCategory === cat }]"
              >
                {{ cat }}
              </button>
            </div>
          </div>
          <div class="filter-section">
            <h3 class="section-title">適用對象</h3>
            <div class="tags-container">
              <button
                v-for="tag in tags"
                :key="tag"
                @click="selectTag(tag)"
                :class="['filter-tag', 'theme-blue', { active: activeTags.includes(tag) }]"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-filter-wrapper {
  transition: all 0.3s ease;
  /* margin: 0 0 1.5rem 0; */
}
.panel-filter-wrapper.is-sticky {
  position: fixed;
  top: var(--nav-height); 
  left: 0;
  right: 0;
  z-index: 1000;
  margin: 0;
  background-color: var(--color-white-base);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
.panel-trigger-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem var(--container-padding);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  background-color: var(--color-white-base);
  cursor: pointer;
  border: 2px solid var(--color-orange-500);
  border-radius: var(--radius-999);
}
.panel-trigger-toggle.active {
  background-color: var(--color-orange-500);
  color: var(--color-white-base);
}
.panel-filter-wrapper.is-sticky .panel-trigger-toggle {
  border-radius: 0;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 2px solid var(--color-orange-500);
  color: var(--color-orange-500);
}
.panel-filter-wrapper.is-sticky .panel-trigger-toggle.active {
    color: var(--color-white-base);
}
.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color-white-base);
  color: var(--color-orange-500);
  font-size: 12px;
  margin-left: 0.5rem;
  font-weight: 700;
}
.panel-trigger-toggle.active .count-badge {
  background-color: var(--color-orange-500);
  color: var(--color-white-base);
  border: 1px solid var(--color-white-base);
}

/* 可展開面板樣式 */
.collapsible-panel {
  transition: max-height 0.3s ease-in-out, padding-bottom 0.3s ease-in-out, border-top-width 0.3s ease;
  max-height: 0;
  overflow: hidden;
  /* padding: 0 1.25rem; */
  padding: 0 var(--container-padding);
  background-color: var(--color-white-base);
}
.collapsible-panel.is-open {
  max-height: 500px;
  padding-bottom: 1.25rem;
}
/* --- Non-sticky State Adjustments --- */
.panel-filter-wrapper:not(.is-sticky) .collapsible-panel {
  background-color: transparent;
  padding-left: 1rem;
  padding-right: 1rem;
}
.panel-filter-wrapper:not(.is-sticky) .collapsible-panel.is-open {
  padding-bottom: 0;
}
.panel-filter-wrapper.is-sticky .collapsible-panel {
    border-radius: 0;
}
.filter-section {
  padding-top: 1rem;
}
.filter-section:not(:first-child) {
    border-top: 1px solid var(--color-gray-line);
    margin-top: 1rem;
}
.section-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--color-text-primary);
}
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* 內部按鈕樣式 */
.filter-tag {
  padding: 6px 14px;
  border-radius: var(--radius-999);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background-color: var(--color-white-base);
  transition: all 0.2s ease;
  border-width: 1.5px; /* 將邊框寬度統一設為 2px */
  border-style: solid;
}

/* 橘色主題按鈕 */
.filter-tag.theme-orange {
  color: var(--color-text-primary);
  border-color: var(--color-orange-500);
}
.filter-tag.theme-orange:hover {
  background-color: #fff7f2; /* A very light orange for hover */
}
.filter-tag.theme-orange.active {
  background-color: var(--color-orange-500);
  color: var(--color-white-base);
}

/* 藍色主題按鈕 */
.filter-tag.theme-blue {
  color: var(--color-text-primary);
  border-color: var(--color-blue-500);
}
.filter-tag.theme-blue:hover {
  background-color: #f0faff; /* A very light blue for hover */
}
.filter-tag.theme-blue.active {
  background-color: var(--color-blue-500);
  color: var(--color-white-base);
}
</style>