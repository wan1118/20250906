<script setup>
import BaseButton from '@/components/button/BaseButton.vue';

defineProps({
  // 按鈕上顯示的文字
  text: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  // icon 屬性保留，以備未來擴充
  icon: {
    type: String,
    default: null
  }
});
</script>

<template>
  <BaseButton 
    size="medium" 
    shape="pill" 
    variant="solid"
    class="text-small text-sm-p fw-bold"
  >
    <router-link :to="to">
      <span>{{ text }}</span>
      <i v-if="icon" :class="['bi', `bi-${icon}`]"></i>
    </router-link>
  </BaseButton>
</template>

<style scoped>
/* 所有樣式現在都由 BaseButton 控制，這裡幾乎不需要自訂樣式了 */
/* 如果需要微調，可以針對特定情況添加 */
/* 例如，調整圖示的間距 */
.base-button > :deep(a) {
  gap: 8px;
}
</style>