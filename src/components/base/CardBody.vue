<script setup>
import { defineProps, useSlots } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  titleInteractive: {
    type: Boolean,
    default: true
  },
  spacing: {
    type: String,
    validator: (value) => ['compact', 'normal', 'loose'].includes(value),
    default: 'normal'
  },
  footerAlign: {
    type: String,
    validator: (value) => ['left', 'right', 'center'].includes(value),
    default: 'left'
  },
  lineClamp: {
    type: [Number, Boolean],
    default: 2,
    validator: (value) => value === false || [1, 2].includes(value)
  },
  footerMode: {
    type: String,
    // 'distant' 表示推到底部, 'adjacent' 表示緊鄰內容
    default: 'distant',
    validator: (value) => ['distant', 'adjacent'].includes(value)
  }
});

const slots = useSlots();
</script>

<template>
  <div class="card-body-container" :class="`spacing-${spacing}`">
    <div v-if="slots.header" class="header-slot">
      <slot name="header"></slot>
    </div>

    <div class="main-content-wrapper">
      <div class="card-title-wrapper" :class="{
        'u-interactive-link-hover': titleInteractive,
        'truncate-title': lineClamp !== false
      }" :style="{ '--truncate-lines': lineClamp }">
        <slot name="title" :titleText="title">
          <h3 class="card-title text-h3">{{ title }}</h3>
        </slot>
      </div>

      <div v-if="slots.default" class="content-slot">
        <slot></slot>
      </div>
    </div>

    <div v-if="slots.footer" class="footer-slot" :class="[`align-${footerAlign}`, `footer-${footerMode}`]">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.card-body-container {
  padding: var(--card-body-padding);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;
  /* gap: 32px; */

}

.title-slot,
.header-slot,
.content-slot,
.footer-slot {
  margin: 0;
}

.content-slot {
  display: flex;
  /* 1. 讓插槽容器自己也成為一個 Flex 容器 */
  flex-direction: column;
  /* 2. 讓它的子元素垂直排列 */
  flex-grow: 1;
  /* 3. 讓它去佔滿 .main-content-wrapper 的剩餘空間 */
  min-height: 0;
  /* 4. 允許其內容在需要時進行滾動 */
  gap: 1rem;
}

.footer-slot.footer-distant {
  margin-top: auto;
}

.main-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* gap: 24px; */

  flex-grow: 1;
  /* 讓這個區塊填滿 CardBody 容器的剩餘垂直空間 */
  min-height: 0;
  /* 在 Flexbox 中，這是讓內部元素能夠正確滾動的關鍵 */

}

/* 【重點修改】使用 :deep() 選擇器來統一控制插槽內容的樣式 */
.card-title-wrapper :deep(h3),
.card-title-wrapper :deep(a) {
  /* 這些是應用於父元件傳入內容的「預設樣式」 */
  /* color: var(--color-text-primary); */

  /* 讓a標籤也可以套用H3，之後可以看怎優化比較好 */
  font-size: var(--font-size-h3);
  line-height: 140%;
  font-weight: 700;
}


/* 當 wrapper 帶有 .truncate-title class 時，對內部的 h3 或 a 標籤套用截斷樣式 */
.card-title-wrapper.truncate-title :deep(h3),
.card-title-wrapper.truncate-title :deep(a) {
  display: -webkit-box;
  -webkit-line-clamp: var(--truncate-lines);
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}


.footer-slot.align-right {
  display: flex;
  justify-content: flex-end;
}

.footer-slot.align-center {
  display: flex;
  justify-content: center;
}

.footer-slot.align-left {
  display: flex;
  justify-content: flex-start;
}
</style>