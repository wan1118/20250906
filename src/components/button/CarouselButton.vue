<script setup>
import IconRight from '@/components/icons/direction/right.vue';
import IconLeft from '@/components/icons/direction/left.vue';

defineProps({
  direction: {
    type: String,
    // 按鈕的方向，'prev' 或 'next'
    validator: (value) => ['prev', 'next'].includes(value),
    required: true
  }
});
</script>

<template>
  <div class="carousel-button">
    <component 
      :is="direction === 'prev' ? IconLeft : IconRight" 
      class="c-icon-size-16 icon-area"
      :class="{
        'icon-left-on-hover': direction === 'prev',
        'icon-right-on-hover': direction === 'next'
      }"
    />
  </div>
</template>

<style scoped>
.carousel-button {
  /* 垂直置中定位 */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  /* 外觀與大小 */
  background-color: var(--color-white-base);
  border-radius: 50%;
  width: var(--carousel-button-size);  /* 預設大小 (桌機) */
  height: var(--carousel-button-size); /* 預設大小 (桌機) */
  
  /* 內部圖片置中 */
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);;
}

.icon-area {
color: var(--color-text-primary);
}

/* 為 Icon 增加平滑的過渡效果 */
.carousel-button :deep(.c-icon-size-16) {
  transition: transform 0.3s ease;
}

/* 當滑鼠移到整個 .carousel-button 上時... */
.carousel-button:hover :deep(.icon-left-on-hover) {
  /* ...讓帶有 .icon-left-on-hover 的 Icon 向左移動 */
  transform: translateX(calc(-1 * var(--spacing-hover-shift)));
}

.carousel-button:hover :deep(.icon-right-on-hover) {
  /* ...讓帶有 .icon-right-on-hover 的 Icon 向右移動 */
  transform: translateX(var(--spacing-hover-shift));
}
</style>