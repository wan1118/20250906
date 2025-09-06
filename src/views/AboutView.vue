<script setup>
import AboutBgGray from '@/components/background/about-bg-gray.vue';
import BaseButton from '@/components/button/BaseButton.vue';
// icon與簡介
import ContactInfoItem from '@/components/base/ContactInfoItem.vue';
import IconNum1 from '@/components/icons/icons-18px/num/num-1.vue';
import IconNum2 from '@/components/icons/icons-18px/num/num-2.vue';
import IconNum3 from '@/components/icons/icons-18px/num/num-3.vue';

// 匯入 Banner 組件
import Banner from '@/components/sections/Banner.vue';
// 引入「關於我們」頁面所有尺寸的 Banner 圖片
import banner1920 from '@/assets/img/banner/about-banner-1920.png';
import banner1400 from '@/assets/img/banner/about-banner-1400.png';
import banner1200 from '@/assets/img/banner/about-banner-1200.png';
import banner996 from '@/assets/img/banner/about-banner-996.png';
import banner765 from '@/assets/img/banner/about-banner-765.png';
import banner576 from '@/assets/img/banner/about-banner-576.png';

// 建立要傳遞給 Banner 元件的 sources 陣列
const aboutBannerSources = [
  { media: '(min-width: 1401px)', srcset: banner1920 },
  { media: '(min-width: 1201px)', srcset: banner1400 },
  { media: '(min-width: 997px)', srcset: banner1200 },
  { media: '(min-width: 766px)', srcset: banner996 },
  { media: '(min-width: 577px)', srcset: banner765 },
];

// 指定預設/最小尺寸的圖片
const aboutDefaultBannerSrc = banner576;

import markImg from '@/assets/img/about/AboutMark.png';
import flagImg from '@/assets/img/about/AboutFlag.png';
import peopleImg from '@/assets/img/about/AboutPeople.png';
import activityImg from '@/assets/img/about/AboutActivity.png';
import learningImg from '@/assets/img/about/AboutLearning.png';
import careImg from '@/assets/img/about/AboutCare.png';
</script>

<template>
  <div class="about-view">
    <Banner :sources="aboutBannerSources" :default-src="aboutDefaultBannerSrc" big-text="關於聯盟" small-text="About us" />

    <div class="c-flex-area container-padding section-gap">
      <!-- 聯盟起源：我們的精神與印記 -->
      <div class="c-content-1200 c-flex-row-ap-area row-area-gap">
        <div class="content-block_image">
          <img :src="markImg" alt="聯盟起源標誌" class="img-fluid content-img content-img-1">
        </div>
        <div class="content-block_text">
          <div class="rwd-text-center h1-title-pb">
            <h2 class="text-h2 mb-2">聯盟起源：我們的精神印記</h2>
            <h3 class="text-h3">用愛的網絡守護青少年成長</h3>
          </div>
          <p class="text-p">
            在這個快速變動的世界，青少年面臨著來自學業、家庭、人際、心理等多方面的挑戰。有時候，你可能不知道該找誰幫忙、去哪裡尋求協助。「少年英雄聯盟」，為了幫助每一位青少年更自信地面對成長的過程，臺中市政府整合各局處與社會資源，無論是找活動、尋求資源或傾訴，我們都在這裡。
          </p>
        </div>
      </div>
      <!-- 聯盟起源：2 -->
      <div class="c-content-1200 c-flex-row-ap-re-area row-area-gap">
        <div class="content-block_text">
          <p class="text-p">
            「少年英雄聯盟」的成立，是為了打造一個專屬於青少年的支持平台。我們相信，透過整合性的資源與服務，可以為青少年建構一個更友善、更支持的成長環境，讓每一位少年英雄都能在這裡找到方向、獲得力量。
          </p>
        </div>
        <div class="content-block_image">
          <img :src="flagImg" alt="聯盟旗幟" class="img-fluid content-img content-img-2">
        </div>
      </div>
      <!-- 宗旨-->
      <div class="c-content-1200 c-flex-row-ap-area row-area-gap section-pb-half">
        <div class="content-block_image">
          <img :src="peopleImg" alt="聯盟成員" class="img-fluid content-img content-img-3">
        </div>
        <!-- 文字區 -->
        <div class="mean">
          <div class="text-h2 rwd-text-center h1-title-pb ">宗旨</div>
          <div class="text-p c-flex-col">
            <span>少年英雄聯盟致力於：</span>
            <!-- <div>1. 激發青少年「陽光、活力、健康」的潛能。</div>
            <div>2. 提供學習、家庭、情感、人際困擾的實用協助。</div>
            <div>3. 創造交流平台，幫助你找到歸屬感與成長動力。</div> -->
            <div class="info-list w-auto">
              <ContactInfoItem :icon-component="IconNum1" label="" value="激發青少年「陽光、活力、健康」的潛能。" />
              <ContactInfoItem :icon-component="IconNum2" label="" value="提供學習、家庭、情感、人際困擾的實用協助。" />
              <ContactInfoItem :icon-component="IconNum3" label="" value="創造交流平台，幫助你找到歸屬感與成長動力。" />
            </div>
            <span>我們相信，每個人的故事都值得被書寫，這裡是你的支援。</span>
          </div>
        </div>
      </div>
    </div>

    <AboutBgGray class="c-text-gray-area" />
    <div class="objectives-section container-padding c-bg-gray-area">
      <div class="objectives-content c-content-1200">
        <h2 class="text-h2 obj-rwd-text-center h1-title-pb">理念</h2>
        <div class="c-flex-col row-area-gap">
          <div class="objective-cards-container">
            <div class="objective-card">
              <img :src="activityImg" alt="多元活動" class="img-fluid">
              <BaseButton size="large" shape="pill" variant="solid" class="mt-3">
                <router-link to="/information">
                  <span>多元活動</span>
                </router-link>
              </BaseButton>
            </div>
            <div class="objective-card">
              <img :src="learningImg" alt="學習資源" class="img-fluid">
              <BaseButton size="large" shape="pill" variant="solid" class="mt-3">
                <router-link to="/future">
                  <span>學習資源</span>
                </router-link>
              </BaseButton>
            </div>
            <div class="objective-card">
              <img :src="careImg" alt="關懷協詢" class="img-fluid">
              <BaseButton size="large" shape="pill" variant="solid" class="mt-3">
                <router-link to="/resource-map">
                  <span>關懷協詢</span>
                </router-link>
              </BaseButton>
            </div>
          </div>
          <p class="text-p">本平台提供人生旅途中的一個起點。透過多元的探索、豐富的學習，以及溫暖的關懷，找到屬於自己的方向，勇敢地邁出前進的步伐。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.content-block_image,
.content-block_text {
  flex: 1;
}

.rwd-text-center {
  text-align: left;
}

h2.mb-3 {
  margin-bottom: 20px !important;
}

h3.mb-5 {
  margin-bottom: 53px !important;
}

.objectives-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 【刪除】此樣式已由 c-content-1200 取代 */
/*
.objectives-content {
  max-width: 1200px;
}
*/

/* 【新增】卡片容器的樣式 */
.objective-cards-container {
  display: flex;
  gap: 2rem;
  /* 設定卡片之間的間距 */
}

.objective-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  /* 讓三張卡片平均分配寬度 */
}

.objective-card img {
  width: 100%;
  max-width: 324px;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  border-radius: 1.5rem;
}

.info-list :deep(.info-icon) {
  width: 1.125rem !important;
  height: 1.125rem !important;
}


/* RWD位子 */

@media (max-width: 950px) {
  .mean .c-flex-col {
    align-items: center;
  }

  .objectives-section {
    padding-top: calc(var(--section-gap) / 3);
  }

  .rwd-text-center {
    text-align: center;
  }

  .content-img {
    width: 100%;
    height: auto;
    max-height: 300px;
  }

}

/* @media (max-width: 992px) {
  .objectives-section {
    padding-top: 60px;
    min-height: auto;
  }
} */

/* 【修改】此處斷點改為 767.98px，以精準對應原來的 RWD 行為 */
@media (max-width: 576px) {
  .objectives-section {
    padding-top: calc(var(--section-gap) / 2);
  }

  .objective-cards-container {
    flex-direction: column;
    /* 垂直排列 */
    align-items: center;
    /* 置中對齊 */
    gap: 2.5rem;
    /* 調整垂直間距 */
  }


  .objectives-section .c-flex-col {
    flex-direction: column-reverse;
  }

  .obj-rwd-text-center {
    text-align: center;
  }
}

/* @media (max-width: 484px) {
  .mean .c-flex-col {
    align-items: start;
  }
} */
</style>