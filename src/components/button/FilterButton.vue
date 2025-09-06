<!-- 大分類按鈕 -->
<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  // text: 按鈕上要顯示的文字
  text: {
    type: String,
    required: true
  },
  // isActive: 決定按鈕是否處於啟用狀態，預設為 false
  isActive: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'orange' // 預設為橘色
  },
  // fontSize: 控制字體大小
  fontSize: {
    type: String,
    default: 'h4', // 預設為 'p' (對應 text-p)
    validator: (value) => ['h3', 'h4', 'p'].includes(value)
  },
  // paddingStyle: 控制 padding 大小
  paddingStyle: {
    type: String,
    default: 'normal', // 預設為 'normal'
    validator: (value) => ['normal', 'compact'].includes(value)
  }
});

// 定義元件可以發出的事件
defineEmits(['click']);
</script>

<template>
  <button type="button" class="filter-button fw-bold ui-radius-999" :class="[
    `filter-button--${color}`,
    `text-${fontSize}`,
    `padding--${paddingStyle}`,
    { active: isActive }
  ]" @click="$emit('click')">
    {{ text }}
  </button>
</template>

/* FilterButton.vue */

<style scoped>
/* 基礎按鈕樣式 (所有顏色共用) */
.filter-button {
  background-color: var(--color-white-base);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  border-width: 2px;
  border-style: solid;
  /* 移除固定的 font-size，由 text- class 控制 */
}

/* --- Padding 樣式 --- */
.padding--normal {
  /* 12px 26px */
  padding: 0.75rem 1.625rem;
}

.padding--compact {
  /* 12px 22px */
  padding: 0.75rem 1.375rem;
}


/* --- 橘色主題 --- */
.filter-button--orange {
  border-color: var(--color-orange-500);
}

.filter-button--orange:hover,
.filter-button--orange.active {
  background-color: var(--color-orange-500);
  color: var(--color-white-base);
  border-color: var(--color-orange-500);
}

/* --- 藍色主題 --- */
.filter-button--blue {
  border-color: var(--color-blue-500);
}

.filter-button--blue:hover,
.filter-button--blue.active {
  background-color: var(--color-blue-500);
  color: var(--color-white-base);
  border-color: var(--color-blue-500);
}

/* --- 響應式樣式 --- */
@media (max-width: 820px) {
  .padding--normal {
    padding: 0.65rem 1.3rem;
  }

  .padding--compact {
    padding: 0.5rem 1rem;
  }
}
</style>