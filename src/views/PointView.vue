<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Banner from '@/components/sections/Banner.vue';

// icon與簡介
import ContactInfoItem from '@/components/base/ContactInfoItem.vue';
// 地點
import IconLoca from '@/components/icons/icons-18px/loca.vue';
// 徽章
import iconMedal1 from '@/components/icons/icons-18px/about-and-point/medal-1.vue';
import iconMedal2 from '@/components/icons/icons-18px/about-and-point/medal-2.vue';
// 禮物
import IconGift from '@/components/icons/icons-18px/about-and-point/gift.vue';
// 注意
import IconWarn from '@/components/icons/icons-18px/about-and-point/warn.vue';



import PointBgTop from '@/components/background/point/point-bg-blue-top.vue';
import PointBgBtm from '@/components/background/point/point-bg-blue-btm.vue';
import AboutBgGray from '@/components/background/about-bg-gray.vue';


// 引入「集點活動」頁面所有尺寸的 Banner 圖片
import banner1920 from '@/assets/img/banner/point-banner-1920.png';
import banner1400 from '@/assets/img/banner/point-banner-1400.png';
import banner1200 from '@/assets/img/banner/point-banner-1200.png';
import banner996 from '@/assets/img/banner/point-banner-996.png';
import banner765 from '@/assets/img/banner/point-banner-765.png';
import banner576 from '@/assets/img/banner/point-banner-576.png';

// 建立要傳遞給 Banner 元件的 sources 陣列
const pointBannerSources = [
  { media: '(min-width: 1401px)', srcset: banner1920 },
  { media: '(min-width: 1201px)', srcset: banner1400 },
  { media: '(min-width: 997px)', srcset: banner1200 },
  { media: '(min-width: 766px)', srcset: banner996 },
  { media: '(min-width: 577px)', srcset: banner765 },
];

// 指定預設/最小尺寸的圖片
const pointDefaultBannerSrc = banner576;

// Banner換行邏輯
const TABLET_BREAKPOINT = 1273;
const windowWidth = ref(window.innerWidth);

const dynamicBigText = computed(() => {
  if (windowWidth.value < TABLET_BREAKPOINT) {
    return '聯盟象徵\n與集點活動';
  }
  return '聯盟象徵與集點活動';
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="point-view-page">
    <Banner :sources="pointBannerSources" :default-src="pointDefaultBannerSrc" :bigText="dynamicBigText"
      smallText="Badge & Points" />
    <!-- 勳章介紹驅 -->
    <div class="c-flex-area  container-padding">
      <!-- 聯盟標章：參與累積的印記 -->
      <div class="c-content-1200 c-flex-area section-gap-half">
        <div class="c-flex-row-ap-area row-area-gap">
          <div class="medal-image">
            <img src="@/assets/img/about/PointMark.png" alt="聯盟標章">
          </div>
          <div class="medal-text-1">
            <div class="text-content c-flex-col h1-title-gap">
              <h1 class="text-h2">聯盟標章：參與累積的印記</h1>
              <p class="text-p me-t-content">
                聯盟標章是「少年英雄聯盟」活動的基礎，也是您參與活動的證明。<br class="br-rwd">
                只要認真參與聯盟實體活動，即可獲得一枚聯盟標章。<br class="br-rwd">
                每枚標章同時代表1點，可用於後續的集點活動兌換精美禮品。
              </p>
            </div>
          </div>
        </div>
        <!-- 聯盟徽章：榮譽認同的印記 -->
        <div class="c-flex-row-ap-re-area row-area-gap me-pb">
          <div class="medal-text-2 text-content c-flex-col h1-title-gap">
            <div class="text-h2">聯盟徽章：榮譽認同的印記</div>
            <p class="text-p me-t-content">
              聯盟徽章（LJH = League of Juvenile Heroes），<br class="br-rwd-sp">
              藍色象徵青空萬里、白色代表純潔正義，
              表彰肯定在活動中的優異表現、成就、貢獻與參與的榮譽標誌，
              並響應我們聯盟的宗旨「陽光、活力、健康」，激勵每位佩戴者積極向上，共同為未來的願景努力，是精神上的承載。
            </p>
          </div>
          <div class="medal-image medal-image-2">
            <img src="@/assets/img/about/PointBadge.png" alt="聯盟徽章">
          </div>
        </div>
      </div>
    </div>

    <!-- 集點說明 -->
    <PointBgTop class="c-text-blu-500" />
    <div class="activity-section c-flex-area c-bg-blue-500">
      <div class="container-padding">
        <div class="c-content-1200 c-flex-row-area row-area-gap row-area-gap c-bg-blue-500">
          <!-- 字 -->
          <div class="ac-intr-text-area c-flex-col h1-title-gap c-text-white-base">
            <div class="text-h1">榮譽集點活動 活動辦法</div>
            <p class="text-p">參加活動 ➜ 收集標章 ➜ 集點換好禮！</p>
          </div>
          <!-- 圖 -->
          <div class="activity-pic">
            <img src="@/assets/img/about/PointInfo.png" alt="榮譽集點活動辦法">
          </div>
        </div>
      </div>
    </div>
    <PointBgBtm class="c-text-blu-500" />

    <!-- 活動詳細說明 -->
    <div class="c-flex-area container-padding section-pt section-pb-half">
      <!-- 如何獲得聯盟標章及徽章？ -->
      <div class="c-content-1200 c-flex-area section-gap">
        <div class="c-flex-row-ap-area row-area-gap intr-w-change">
          <div class="intr-image">
            <img src="@/assets/img/about/PointHow.png" alt="如何獲得聯盟標章">
          </div>
          <div class="intr-text-1 text-content c-flex-col h1-title-gap">
            <h1 class="text-h2">如何獲得聯盟標章及徽章？</h1>
            <div class="info-list w-auto">
              <ContactInfoItem :icon-component="iconMedal1" label="" value="標章：參加一個活動即可獲得1個標章。" />
              <ContactInfoItem :icon-component="iconMedal2" label="" value="一級徽章： 收集5個「聯盟標章」可換得。" />
              <ContactInfoItem :icon-component="iconMedal2" label="" value="特級徽章： 收集15個「聯盟標章」或對聯盟有特殊貢獻者。" />
              <ContactInfoItem :icon-component="IconLoca" label="" value="領取： 活動現場主辦單位服務處。" />
              <ContactInfoItem :icon-component="IconWarn" label="" value="注意： 同一活動標章不可重複領取。" />
            </div>
          </div>
        </div>
        <!-- 累積標章換好禮 -->
        <div class="c-flex-row-ap-re-area row-area-gap intr-w-change">
          <div class="intr-text-2 text-content c-flex-col h1-title-gap">
            <div class="text-h2">累積標章換好禮</div>
            <div class="div">
              <p class="text-p">
                收集標章可兌換精美禮品：</p>
              <div class="info-list w-auto">
                <ContactInfoItem :icon-component="iconMedal1" label="" value="2點： 動物造型酒精噴瓶1個。" />
                <ContactInfoItem :icon-component="iconMedal1" label="" value="4點： 英國熊鏡面伸縮手機架1個。" />
                <ContactInfoItem :icon-component="iconMedal1" label="" value="6點： 英國熊自動開收摺疊傘1把。" />
                <ContactInfoItem :icon-component="iconMedal1" label="" value="8點： LOU露小熊法蘭絨毯1個。" />

              </div>
            </div>
          </div>

          <div class="intr-image">
            <img src="@/assets/img/about/Pointgift.png" alt="標章換好禮">
          </div>
        </div>
      </div>
    </div>

    <AboutBgGray class="c-text-gray-area" />
    <!-- 兌換與領取地點總覽 -->
    <div class="location-section-bg c-bg-gray-area c-flex-area container-padding">
      <!-- 兌換與領取地點總覽 -->
      <div class="c-content-1200 c-flex-row-ap-area row-area-gap">
        <div class="intr-image text-center">
          <img src="@/assets/img/about/PointMap.png" alt="兌換領取地圖">
        </div>
        <div class="intr-text-3 text-content c-flex-col h1-title-gap">
          <h1 class="text-h2">兌換與領取地點總覽</h1>
          <div class="info-list w-auto">
            <ContactInfoItem :icon-component="iconMedal1" label="" value="標章/徽章： 活動現場主辦單位服務處。" />
            <ContactInfoItem :icon-component="IconGift" label="" value="集點禮品：臺中市少年輔導委員會或臺中市政府警察局少年警察隊。" />
            <ContactInfoItem :icon-component="IconLoca" label="" value="地址： 408 臺中市南屯區干城街2號" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* 背景-------------------------------------------- */
.point-view-page {
  overflow-x: hidden;
  background-color: var(--color-white-base);
}

img {
  width: 100%;
}

.info-list {
  text-align: start;
}

/* 聯盟標章：參與累積的印記-------------------------------------------- */
.medal-text-1 {
  max-width: 578px;
  min-width: 27.2rem;
}

.medal-text-2 {
  max-width: 578px;
  min-width: 27.2rem;
}

.medal-image-2 {
  min-width: 300px;
}

/* 榮譽集點活動 活動辦法 ------------------------------------------ */
.ac-intr-text-area {
  min-width: 27.5rem;
}

  .activity-pic {
max-width: 450px;
  }

/* 活動詳情區-------------------------------------------------------- */
.intr-image {
  max-width: 100%;
  min-width: none;
}

.intr-text-1 {
  max-width: 35rem;
  min-width: 28rem;
}

.intr-text-2 {
  min-width: 28rem;
}

.intr-text-3 {
  min-width: 28rem;
}

@media (max-width: 1184px) {
  .br-rwd-sp {
    display: none;
  }
}

@media (max-width: 1200px) {
  .me-pb {
    padding-bottom: calc(var(--section-gap) / 3);
  }
}

@media (max-width: 992px) {
  .me-pb {
    padding-bottom: calc(var(--section-gap) / 2);
  }
}

/* 【修改】統一響應式斷點 */
@media (max-width: 950px) {
  .intr-w-change {
    width: 100%;
  }

  .medal-image,
  .intr-image {
    max-width: 65%;
  }

  .text-content {
    text-align: center;
  }


.intr-text-1 ,.intr-text-2,.intr-text-3 {
  min-width: unset;
  max-width: unset;
}


  .activity-section {
    min-height: auto;
    padding: 60px 0;
  }

  .activity-section h1 {
    font-size: var(--font-size-h2, 2.1875rem);
  }

  .activity-section p {
    font-size: var(--font-size-h4, 1.5rem);
  }

  .location-section-bg {
    height: auto;
    padding-top: calc(var(--section-gap) / 2);
  }

  .br-rwd-sp {
    display: block;
  }
}


/* 獎章區特殊換行和對齊 */
@media (max-width: 590px) {
  .br-rwd {
    display: none;
  }

  .br-rwd-sp {
    display: none;
  }

  .me-t-content {
    text-align: start;
  }
}

@media (max-width: 576px) {
  .activity-pic {
    width: auto;
    height: auto;
  }

  .activity-pic img {
    max-height: unset;
    width: auto;
    height: 100%;
    max-height: 300px;
  }

  .activity-section {
    text-align: center;
  }


  .intr-image {
    max-width: 80%;
  }
}
</style>