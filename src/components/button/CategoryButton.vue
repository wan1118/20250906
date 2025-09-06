<!-- 橘色按鈕 -->
<script setup>
defineProps({
  // 按鈕上顯示的文字
  text: {
    type: String,
    required: true 
  },
  isClickable: {
    type: Boolean,
    default: true // 預設為可點擊，這樣才不會影響到其他已經在使用的地方
  }
});
</script>

<template>
  <component 
    :is="isClickable ? 'button' : 'span'"
    type="button" 
    class="category-button c-bg-orange-500 c-text-white-base text-p"
    :class="{ 'non-clickable': !isClickable }"
  >
    {{ text }}
  </component>
</template>

<style scoped>
.category-button {
  padding: 8px 18px;
  border-radius: 18px;
  /* 依字體的寬高去做延伸 (Hug) */
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* 移除按鈕預設邊框並設定游標樣式 */
  border: none;
  transition: opacity 0.3s ease;
}

.category-button:not(.non-clickable) {
  cursor: pointer;
}
.category-button:not(.non-clickable):hover {
  opacity: 0.9;
}
</style>
