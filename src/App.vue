<template>
  <div id="app-container">
    <NavBar />
    <main class="c-bg-white-base">
      <router-view />
      <GoTop/>
    </main>
    <Footer :background="footerBackground" :padding-size="footerPaddingSize" />
  </div>
</template>

<script setup>
// vvvv 從這裡開始修改/新增 vvvv
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import NavBar from './components/layout/NavBar.vue';
import Footer from './components/layout/Footer.vue';
import GoTop from './components/layout/gotop.vue';

// 1. 取得當前的路由資訊
const route = useRoute();

// 2. 建立計算屬性，動態決定 background prop 的值
const footerBackground = computed(() => {
  // 嘗試讀取 meta.footer.background，如果不存在，則回傳預設值 'transparent'
  return route.meta.footer?.background || 'transparent';
});

// 3. 建立計算屬性，動態決定 padding-size prop 的值
const footerPaddingSize = computed(() => {
  // 嘗試讀取 meta.footer.paddingSize，如果不存在，則回傳預設值 '' (空字串)
  return route.meta.footer?.paddingSize || '';
});
// ^^^^ 修改/新增到這裡為止 ^^^^
</script>

<style scoped>
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
  padding-top: var(--nav-height);
}
</style>