<!-- 電腦3格尺寸grid -->
<script setup>
// This component does not require any script logic.
</script>

<template>
  <div class="responsive-card-grid c-shadow-filter-soft">
    <slot></slot>
  </div>
</template>

<style scoped>
.responsive-card-grid {
  display: grid;
  /* 統一 gap，這裡我們選用 InformationView 的 41px 29px 作為標準 */
  gap: var(--c-gap-41) var(--c-gap-28);
  grid-template-columns: repeat(3, 1fr);
}

/* 統一 RWD 斷點 */
@media (max-width: 1150px) {
  .responsive-card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .responsive-card-grid {
    grid-template-columns: 1fr;
    /* 參考 VideoView 在手機版加上此屬性，讓卡片置中，通常在單欄佈局下視覺效果較好 */
    justify-items: center;
  }
}
</style>