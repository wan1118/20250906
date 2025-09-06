<script setup>
import { ref, shallowRef, computed } from 'vue';
import Banner from '@/components/sections/Banner.vue';

// 關於換圖
import intrImage1 from '@/assets/img/index/index-intr-1.png';
import intrImage2 from '@/assets/img/index/index-intr-2.png';
import intrImage3 from '@/assets/img/index/index-intr-3.png';
import intrImage4 from '@/assets/img/index/index-intr-4.png';

import labImage1 from '@/assets/img/index/index-lab-1.png';
import labImage2 from '@/assets/img/index/index-lab-2.png';
import labImage3 from '@/assets/img/index/index-lab-3.png';
import labImage4 from '@/assets/img/index/index-lab-4.png';

// 精選活動元件
import FeaturedEventCarousel from '@/components/pagesections/home/FeaturedEventCarousel.vue';
import { useFeaturedEvents } from '@/composables/useFeaturedEvents.js';

// 活動分類元件
import EventCategoryGrid from '@/components/pagesections/home/EventCategoryGrid.vue';
import ResourceGrid from '@/components/pagesections/home/ResourceGrid.vue';

// Button
import CtaButton from '@/components/button/CtaButton.vue';

// 未來研究所背景
import HomeBgOrangeTop from '@/components/background/home/home-bg-orange-top.vue';
import HomeBgOrangeBtm from '@/components/background/home/home-bg-orange-btm.vue';

// banner圖片
import banner1920 from '@/assets/img/banner/home-banner-1920.png';
import banner1400 from '@/assets/img/banner/home-banner-1400.png';
import banner1200 from '@/assets/img/banner/home-banner-1200.png';
import banner996 from '@/assets/img/banner/home-banner-996.png';
import banner765 from '@/assets/img/banner/home-banner-765.png';
import banner576 from '@/assets/img/banner/home-banner-576.png';

// 建立符合 Banner 元件 props 格式的資料
const bannerSources = [
  // 當螢幕寬度大於等於 1401px 時，使用 1920 的圖
  { media: '(min-width: 1401px)', srcset: banner1920 },
  // 當螢幕寬度大於等於 1201px 時，使用 1400 的圖
  { media: '(min-width: 1201px)', srcset: banner1400 },
  // 當螢幕寬度大於等於 997px 時，使用 1200 的圖
  { media: '(min-width: 997px)', srcset: banner1200 },
  // 當螢幕寬度大於等於 766px 時，使用 996 的圖
  { media: '(min-width: 766px)', srcset: banner996 },
  // 當螢幕寬度大於等於 577px 時，使用 765 的圖
  { media: '(min-width: 577px)', srcset: banner765 },
  // 當螢幕寬度大於等於 361px 時，使用 576 的圖
];

// 指定一張預設/最小尺寸的圖片
const defaultBannerSrc = banner576;

const { featuredEvents } = useFeaturedEvents();

</script>

<template>
  <Banner :sources="bannerSources" :default-src="defaultBannerSrc" bigText="從這裡開始，
    成為自己的英雄！" smallText="找活動、學技能、交朋友，一站搞定！" />

  <div class="intr c-flex-row-re-area row-area-gap section-mb">
    <div class="pic-container">
      <CtaButton to="/about" icon="right" class="intr-pic-bluebutton">了解更多</CtaButton>
      <picture>
        <source :srcset="intrImage1" media="(max-width: 576px)">
        <source :srcset="intrImage4" media="(max-width: 629px)">
        <source :srcset="intrImage3" media="(max-width: 700px)">
        <source :srcset="intrImage2" media="(max-width: 1200px)">
        <img :src="intrImage1" alt="少年英雄聯盟簡介圖">
      </picture>
    </div>
    <div class="intr-text c-flex-col h1-title-gap">
      <div class="text-h1">少年英雄聯盟是什麼？</div>
      <div class="text-p">
        我們是一個專為臺中青少年打造的平台，集合活動資訊、學習資源和各種支援服務。
        <!-- <span class="intr-add-text">
          <br class="intr-sp-br">
          <br>想參加酷活動、探索未來方向，這裡都找得到！
        </span> -->
      </div>
      <CtaButton to="/about" icon="right" class="bluebutton">了解更多</CtaButton>
    </div>
  </div>

  <div class="event-area c-flex-area container-padding section-pb">
    <div class="c-content-1400">
      <div class="c-flex-col h1-title-gap">
        <div class="text-h1">精選活動</div>
        <FeaturedEventCarousel :events="featuredEvents" />
      </div>
    </div>
  </div>

  <div class=" c-flex-area container-padding c-bg-gray-area section-pb-half">
    <div class="c-content-1400 c-flex-col h1-title-gap">
      <div class="text-h1">活動分類</div>
      <EventCategoryGrid />
    </div>
  </div>

  <HomeBgOrangeTop class="c-bg-gray-area c-text-orange-500" />
  <div class="lab c-bg-orange-500 c-flex-row-area row-area-gap">
    <div class="lab-text-area c-text-white-base c-flex-col h1-title-gap">
      <div class="text-h1">
        對未來感到迷茫？<br>
        想更了解自己？
      </div>
      <div class="text-p">
        這裡整合各種資訊網站，<br>帶你探索自我的無限可能！
      </div>
      <CtaButton to="/future" icon="right" class="bluebutton">了解更多</CtaButton>
    </div>
    <div class="pic-container">
      <picture>
        <source :srcset="labImage4" media="(max-width: 576px)">
        <source :srcset="labImage3" media="(max-width: 666px)">
        <source :srcset="labImage2" media="(max-width: 1200px)">
        <img :src="labImage1" alt="未來研究院配圖">
      </picture>
    </div>
    <CtaButton to="/future" icon="right" class="lab-mobile-bluebutton">了解更多</CtaButton>

  </div>
  <HomeBgOrangeBtm class="c-bg-gray-area c-text-orange-500" />


  <div class="c-flex-area container-padding c-bg-gray-area section-pt-half section-pb-hal">
    <div class="c-content-1400 c-flex-col h1-title-gap">
      <div class="text-h1">資源地圖</div>
      <div class="map-grid-and-btn">
        <ResourceGrid />
        <CtaButton to="/resource-map" icon="down" class="bluebutton2 mx-auto">查看更多</CtaButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pic-container {
  width: 100%;
}

.pic-container img {
  width: 100%;
  object-fit: contain;
}

/* intr ------------------------------------- */
.intr {
  padding: 0 calc((100vw - 1400px) / 2);
}

.intr .pic-container {
  max-width: 743px;
}


.intr-text {
  /* 507px */
  max-width: 31.6875rem;
  min-width: 26.9rem;
  justify-content: center;
}

.intr-pic-bluebutton {
  display: none;
}

/* event component------------------------------------------- */
.event-area {
  background-image: url(@/assets/img/index/index-bg-gray-event.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* lab ------------------------------- */
.lab {
  padding: 2rem calc((100vw - 1400px) / 2) 0;
}

.lab-text-area {
  min-width: 25rem;
  justify-content: center;
}

.lab .pic-container {
  max-width: 48rem;
}

.bluebutton {
  align-self: flex-end;
}

.lab-mobile-bluebutton {
  display: none;
}

/* infor map-------------------------------- */
.map-grid-and-btn {
  display: flex;
  flex-direction: column;
}

/* 按鈕-------------------------------- */
.bluebutton {
  max-width: 160px;
  align-self: flex-end;
}


.bluebutton2 {
  width: fit-content;
}

/* infor map-------------------------------- */

/* RWD-------------------------------- */
@media (max-width: 1560px) {
  .intr {
    padding: 0 var(--container-padding);
  }

  .lab {
    padding: 2rem var(--container-padding) 0;
  }

  /* .intr-add-text {
    display: none;
  } */
}

@media (max-width: 1388px) {
  .intr-add-text {
    display: none;
  }
}

@media (max-width: 1200px) {
  .intr {
    padding: 0 var(--container-padding) 0 0;
  }

  .lab {
    padding: 2rem 0 0 var(--container-padding);
  }


}

@media (max-width: 992px) {
  .text-h1 {
    font-size: var(--font-size-h2);
  }

  .intr-text {
    min-width: 22rem;
  }

  .lab-text-area {
    min-width: 20rem;
    padding: calc(var(--section-gap) / 2) 0 calc(var(--section-gap) / 3);
  }
}

@media (max-width: 990px) {
  .intr-text {
    min-width: 27rem;
  }
}


@media (max-width: 853px) {
  .intr-text {
    max-width: 23rem;
    min-width: 20rem;
  }
}


@media (max-width: 576px) {
  .intr {
    padding: 0 var(--container-padding);
  }

  .intr-text {
    max-width: unset;
    min-width: unset;
  }

  /* .intr-add-text {
    display: block;
  }

  .intr-sp-br {
    display: none;
  } */

  .intr .bluebutton {
    display: none;
  }

  .intr .pic-container {
    position: relative;
  }

  .intr-pic-bluebutton {
    display: block;
    position: absolute;
    right: 0;
    bottom: 1rem;
  }

  /* lab------------------------------- */
  .lab {
    padding: calc(var(--section-gap) / 2) var(--container-padding) calc(var(--section-gap) / 3);
    text-align: center;
  }

  .lab-text-area {
    padding: 0;
  }

  .lab .pic-container {
    max-width: 80%;
  }

  .lab .bluebutton {
    /* align-self: center; */
    display: none;
  }

  .lab-mobile-bluebutton {
    display: block;
  }
}
</style>