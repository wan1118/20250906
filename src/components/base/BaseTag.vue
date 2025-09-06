<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  // 標籤顯示的文字
  text: {
    type: String,
    required: true
  },
  // 控制標籤是否可以點擊
  clickable: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

function handleClick() {
  // 只有在 clickable 為 true 時才觸發 click 事件
  if (props.clickable) {
    emit('click');
  }
}
</script>

<template>
  <span 
    class="base-tag text-p" 
    :class="{ 'is-clickable': clickable }"
    @click="handleClick"
  >
    <span class="hash">#</span>{{ text }}
  </span>
</template>

<style scoped>
.base-tag {
  /* 從 ActivityCard 搬過來的基礎樣式 */
  color: var(--color-blue-500);
  text-decoration: none;
  transition: text-decoration 0.3s; /* 將 transition 目標改為 text-decoration */
}

/* 當標籤可點擊時，套用這些樣式 */
.is-clickable {
  cursor: pointer;
}

/* 根據您的新需求：hover 效果增加底線，而不是變色 */
.is-clickable:hover {
  text-decoration: underline;
}

.hash {
  margin-right: 4px;
}
</style>