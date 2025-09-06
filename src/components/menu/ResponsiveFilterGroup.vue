<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import FilterButton from '@/components/button/FilterButton.vue';
import IconDown from '@/components/icons/direction/down.vue';
import IconUp from '@/components/icons/direction/up.vue';

// 增加一個新的 prop 'sticky'，並設定預設值為 true
const props = defineProps({
  buttons: { type: Array, required: true },
  activeCategory: { type: String, required: true },
  sticky: { type: Boolean, default: true }, //陰影
  align: {
    type: String,
    default: 'start', // 預設靠左 (start)
    validator: (value) => ['start', 'center'].includes(value)
  }
});

const emit = defineEmits(['update:activeCategory']);
const buttonTexts = computed(() => {
  if (props.buttons.length > 0 && typeof props.buttons[0] === 'object') {
    return props.buttons.map(btn => btn.text);
  }
  return props.buttons;
});

const isDropdownOpen = ref(false);
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function selectCategory(category) {
  emit('update:activeCategory', category);
  isDropdownOpen.value = false;
}

const filterRef = ref(null);
const isSticky = ref(false);
let initialTop = 0;

const handleScroll = () => {
  if (window.innerWidth <= 769 && filterRef.value) {
    if (window.scrollY > initialTop) {
      isSticky.value = true;
    } else {
      isSticky.value = false;
    }
  } else {
    isSticky.value = false;
  }
};

onMounted(() => {
  // --- 【修改 2】: 只有在 sticky 功能開啟時，才加入滾動監聽 ---
  if (props.sticky) {
    if (filterRef.value) {
      initialTop = filterRef.value.offsetTop;
    }
    window.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  // --- 【修改 3】: 同樣地，只有在 sticky 功能開啟時，才需要移除監聽 ---
  if (props.sticky) {
    window.removeEventListener('scroll', handleScroll);
  }
  // 【新增】確保元件卸載時，也移除點擊事件監聽器
  document.removeEventListener('click', handleClickOutside);
});

// 處理點擊外部區域的函式
function handleClickOutside(event) {
  // 檢查 filterRef.value 是否存在，並且被點擊的目標(event.target)是否不在 filterRef.value 的內部
  if (filterRef.value && !filterRef.value.contains(event.target)) {
    isDropdownOpen.value = false; // 如果是，就關閉下拉選單
  }
}

// 監聽 isDropdownOpen 的變化，來新增或移除全域點擊事件
watch(isDropdownOpen, (isOpen) => {
  if (isOpen) {
    // 當下拉選單打開時，在 document 上新增點擊監聽
    document.addEventListener('click', handleClickOutside);
  } else {
    // 當下拉選單關閉時，從 document 上移除點擊監聽
    document.removeEventListener('click', handleClickOutside);
  }
});
</script>

<template>
  <div ref="filterRef" class="filter-group-wrapper" :class="{ 'is-sticky': isSticky && sticky }">
<div class="desktop-filters" :class="{ 'justify-center': align === 'center' }">
  <FilterButton v-for="btnText in buttonTexts" :key="btnText" :text="btnText"
    :is-active="activeCategory === btnText" @click="selectCategory(btnText)" />
</div>
    <div class="mobile-filter">
      <button type="button" class="mobile-filter-toggle" :class="{ active: isDropdownOpen }" @click="toggleDropdown">
        <span class="pe-3">{{ activeCategory }}</span>
        <IconUp v-if="isDropdownOpen" class="c-icon-size-16" />
        <IconDown v-else class="c-icon-size-16" />
      </button>
      <transition name="fade">
        <ul v-if="isDropdownOpen" class="mobile-filter-dropdown">
          <li v-for="btnText in buttonTexts" :key="btnText" @click="selectCategory(btnText)"
            :class="{ active: activeCategory === btnText }">
            {{ btnText }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.filter-group-wrapper {
  padding-top: var(--sticky-placeholder-height, 0);
}

.filter-group-wrapper.is-sticky .mobile-filter {
  position: fixed;
  top: var(--nav-height);
  /* 100px */
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  background-color: var(--color-white-base);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  --sticky-placeholder-height: 62px;
  border-bottom: 1px solid var(--color-gray-line);
}

/* --- 固定與非固定狀態的樣式切換 --- */
.filter-group-wrapper.is-sticky .mobile-filter-toggle {
  border-radius: 0;
  border: none;
  /* color: var(--color-orange-500); */
  border-bottom: 2px solid var(--color-orange-500);
  color: var(--color-orange-500);
}

.filter-group-wrapper:not(.is-sticky) .mobile-filter-toggle {
  border-radius: var(--radius-999);
  border: 2px solid var(--color-orange-500);
}

.filter-group-wrapper.is-sticky .mobile-filter-dropdown {
  top: 100%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.filter-group-wrapper:not(.is-sticky) .mobile-filter-dropdown {
  top: calc(100% + 8px);
  border-radius: 16px;
}


.desktop-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.desktop-filters.justify-center {
  justify-content: center;
}

.mobile-filter {
  display: none;
}

@media (max-width: 769px) {
  .desktop-filters {
    display: none;
  }

  .mobile-filter {
    display: block;
    position: relative;
    width: 100%;
    padding: 0;
  }

  .mobile-filter-toggle {
    width: 100%;
    padding: 1rem var(--container-padding);
  }
}

/* --- 手機版下拉選單按鈕樣式 --- */
.mobile-filter-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  /* color: var(--color-orange-500); */
  background-color: var(--color-white-base);
  cursor: pointer;
}

.mobile-filter .mobile-filter-toggle.active {
  background-color: var(--color-orange-500);
  color: var(--color-white-base);
}

/* --- 手機版下拉選單本體樣式 --- */
.mobile-filter-dropdown {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background-color: var(--color-white-base);
  border: 1px solid var(--color-gray-line);
  box-shadow: var(--c-shadow-soft);
  z-index: 10;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
}

.mobile-filter-dropdown li {
  padding: 12px calc(var(--container-padding) + 1rem);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.mobile-filter-dropdown li:hover {
  background-color: var(--color-gray-area);
}

.mobile-filter-dropdown li.active {
  background-color: var(--color-orange-light);
  color: var(--color-text-primary);
  font-weight: 700;
}

/* --- 選單出現/消失的動畫 --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>