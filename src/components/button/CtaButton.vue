<script setup>
import { computed } from 'vue';
import BaseButton from '@/components/button/BaseButton.vue';
import IconRight from '@/components/icons/direction/right.vue';
import IconDown from '@/components/icons/direction/down.vue';

const props = defineProps({
  // 按鈕要連結到的路徑
  to: {
    type: [String, Object],
    required: true
  },
  // 'right' 或 'down'，決定顯示哪個圖示和動畫
  icon: {
    type: String,
    default: 'right',
    validator: (value) => ['right', 'down'].includes(value)
  }
});

// 根據傳入的 icon prop，動態決定要使用哪個 Icon 元件
const iconComponent = computed(() => {
  return props.icon === 'down' ? IconDown : IconRight;
});

// 根據 icon prop，動態決定要套用哪個 hover 動畫 class
const iconClass = computed(() => {
  return {
    'c-icon-size-16': true,
    'c-transition-transform': true,
    'icon-right-on-hover': props.icon === 'right',
    'icon-down-on-hover': props.icon === 'down',
  };
});
</script>

<template>
  <BaseButton size="large" shape="pill" variant="solid" v-bind="$attrs">
    <router-link :to="to">
      <span>
        <slot></slot> </span>
      <component :is="iconComponent" :class="iconClass" />
    </router-link>
  </BaseButton>
</template>

<style scoped>
/* 我們可以讓這個元件預設寬度 fit-content，讓它更有彈性 */
.base-button {
  width: fit-content;
}
</style>