<script setup>
import { ref, computed } from 'vue';

// defineProps 用於定義父元件可以傳遞給此元件的屬性
const props = defineProps({
  // 控制背景顏色, 預設為 'transparent' (透明)
  background: {
    type: String,
    default: 'transparent',
    // 驗證傳入的值是否為 'transparent' 或 'gray'
    validator: (value) => ['transparent', 'gray'].includes(value),
  },
  // 控制整個元件的 padding-top 大小，預設不套用任何間距
  paddingSize: {
    type: String,
    default: 'small', // 可選值: 'small', 'medium', 'large'
    validator: (value) => ['', 'small', 'medium', 'large'].includes(value),
  }
});

// 根據 props.background 的值，動態計算要套用的背景 class
const backgroundClass = computed(() => {
  return props.background === 'gray' ? 'c-bg-gray-area' : '';
});

// 根據 props.paddingSize 的值，動態計算要套用的 padding class
const paddingClass = computed(() => {
  // 如果 props.paddingSize 有值 (small, medium, large)，則回傳對應的 class 名稱
  return props.paddingSize ? `pt-${props.paddingSize}` : '';
});


// 定義元件的響應式資料
const currentUpdateDate = ref('2025.08.31');

import ContactInfoItem from '@/components/base/ContactInfoItem.vue';

// ContactInfoItem 區要套用的icon
// 政府行政機關辦公日曆表
import IconDate from '@/components/icons/icons-18px/date.vue';
// 辦公時間
import IconTime from '@/components/icons/icons-18px/time.vue';
// 中午休息
import IconRestTime from '@/components/icons/icons-18px/rest-time.vue';
// 瀏覽人次
import IconPepole from '@/components/icons/icons-18px/pepole.vue';
// 更新日期
import IconRenew from '@/components/icons/icons-18px/renew.vue';

// 建議使用以下瀏覽器
import IconChrome from '@/components/icons/icons-34px-footer/chrome.vue';
import IconEdge from '@/components/icons/icons-34px-footer/edge.vue';
import IconFirefox from '@/components/icons/icons-34px-footer/firefox.vue';
import IconSafari from '@/components/icons/icons-34px-footer/safari.vue';
</script>

<template>
  <footer class="custom-footer" :class="[backgroundClass, paddingClass]">
    <div class="wave-container">
      <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 200" preserveAspectRatio="none">
        <path
          d="M0 13.72C0 3.64 9.46 7.54 117.85.98C226.23-5.58 400.73 21.33 553.5 61.46C706.26 101.6 841.02 132.09 993.78 118.71C1146.55 105.33 1259.49 55.61 1488.02 58.87C1716.55 62.12 1845.81 123.69 1920 179.17V200H0Z"
          class="wave-fill"></path>
      </svg>
    </div>

    <div class="content c-bg-blue-500 c-text-white-base">
      <div class="container-padding">
        <div class="footer-content-container gap-80">

          <div class="footer-info-group gap-80">
            <div class="info-block">
              <div class="text-h4 title-margin">少年英雄聯盟</div>
              <div class="info-list text-p">
                <ContactInfoItem :icon-component="IconDate" label="" value="政府行政機關辦公日曆表"
                  href="https://www.dgpa.gov.tw/information?uid=30&pid=12572" />
                <ContactInfoItem :icon-component="IconTime" label="辦公時間：" value="08:00-17:00" />
                <ContactInfoItem :icon-component="IconRestTime" label="中午休息：" value="12:00-13:00" />
              </div>
            </div>

            <div class="info-block">
              <div class="text-h4 title-margin">網站資訊</div>
              <div class="info-list text-p">
                <ContactInfoItem :icon-component="IconPepole" label="瀏覽人次：" value="117,459" />
                <ContactInfoItem :icon-component="IconRenew" label="更新日期：" :value="currentUpdateDate" />
              </div>
            </div>
          </div>
          <div class="browser-info-set">
            <div class="browser-info">
              <div class="text-h4 title-media-margin">建議使用以下瀏覽器</div>
              <div class="browser-icon-list text-small">
                <div class="browser-icon-item">
                  <IconChrome />
                  <p>Chrome</p>
                </div>
                <div class="browser-icon-item">
                  <IconFirefox />
                  <p>FireFox</p>
                </div>
                <div class="browser-icon-item">
                  <IconEdge />
                  <p>Edge</p>
                </div>
                <div class="browser-icon-item">
                  <IconSafari />
                  <p>Safari</p>
                </div>
              </div>
            </div>
            <div class="go-top-area"></div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

.custom-footer.pt-small {
  padding-top: calc(var(--section-gap) / 2);
}
.custom-footer.pt-medium {
  padding-top: var(--section-gap);
}
.custom-footer.pt-large {
  padding-top: calc(var(--section-gap) * 1.5);
}


.custom-footer {
  width: 100%;
  line-height: 1.2;
}

.wave-container {
  bottom: 100%;
  left: 0;
  width: 100%;
  margin-bottom: -1px;
}

.wave {
  display: block;
  width: 100%;
}

.wave-fill {
  fill: var(--color-blue-500);
}

.content {
  padding-bottom: var(--container-padding);
}

.title-margin {
  margin-bottom: 0.75rem;
  /* 12px */
}

.title-media-margin {
    /* 15px */
  margin-bottom: 0.9375rem;
}

.footer-content-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.footer-info-group {
  /* 這是左側兩個資訊區塊的容器 */
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}

.browser-info-set {
  display: flex;
  gap: calc(2.375rem + 1rem);
}

.browser-icon-list {
  /* 瀏覽器圖示列表 */
  display: flex;
  gap: 2.375rem;
  /* 38px，精準控制圖示間距 */
}

.browser-icon-item {
  /* 單一圖示+名稱的組合 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.go-top-area {
  display: none;
}

.gap-80 {
  gap: 5rem;
  /* 80px */
}

/* 針對 Footer 中的 ContactInfoItem 連結進行樣式覆寫
  :deep() 可以穿透 scoped 的限制，選取到子元件內的 class
*/
.custom-footer .info-list :deep(a.info-text:hover) {
  color: inherit; /* 維持父層級的顏色(此處為白色)，不變色 */
  text-decoration: underline; /* 只保留底線效果 */
}


@media (max-width: 1745px) {
  .go-top-area {
    display: block;

  }
}

@media (max-width: 1660px) {
  .go-top-area {
    display: block;
    width: var(--go-top-size);
    height: var(--go-top-size);
  }
}

@media (max-width: 1000px) {
  .content {
    padding-top: 1rem;
  }
    .gap-80 {
  gap: var(--c-gap-62);
}
}

@media (max-width: 700px) {

  .footer-info-group {
    flex-direction: column;
    align-items: start;
  }

  .footer-content-container {
    flex-wrap: wrap;
  }
}

@media (max-width:576px) {
  .content {
    padding-top: 2rem;
    padding-bottom: calc(var(--container-padding) + var(--container-padding));
  }
}
</style>