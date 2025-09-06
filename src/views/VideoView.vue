<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';

import Banner from '@/components/sections/Banner.vue';
import banner1920 from '@/assets/img/banner/video-banner-1920.png';
import banner1400 from '@/assets/img/banner/video-banner-1400.png';
import banner1200 from '@/assets/img/banner/video-banner-1200.png';
import banner996 from '@/assets/img/banner/video-banner-996.png';
import banner765 from '@/assets/img/banner/video-banner-765.png';
import banner576 from '@/assets/img/banner/video-banner-576.png';

const videoBannerSources = [
  { media: '(min-width: 1401px)', srcset: banner1920 },
  { media: '(min-width: 1201px)', srcset: banner1400 },
  { media: '(min-width: 997px)', srcset: banner1200 },
  { media: '(min-width: 766px)', srcset: banner996 },
  { media: '(min-width: 577px)', srcset: banner765 },
];
const videoDefaultBannerSrc = banner576;

import ResponsiveFilterGroup from '@/components/menu/ResponsiveFilterGroup.vue';
import ActivityCardArrow from '@/components/card/ActivityCardArrow.vue';
import FullBleedCarousel from '@/components/base/FullBleedCarousel.vue'
import VideoCard from '@/components/card/VideoCard.vue';
import ImageLightbox from '@/components/modal/ImageLightbox.vue';
// 匯入新的元件
import PaginatedView from '@/components/base/PaginatedView.vue';
import eventPhotoData from '@/assets/data/EventPhotos.json';
import eventVideoData from '@/assets/data/EventVideo.json';
import ResponsiveCardGrid from '@/components/base/ResponsiveCardGrid.vue';


const route = useRoute();
const isLightboxVisible = ref(false);
const lightboxStartIndex = ref(0);
// 用來存放「當前被點擊活動」的所有圖片
const lightboxImages = ref([]);
const orangeButtons = ref([
  { text: '全部類型' },
  { text: '休閒娛樂' },
  { text: '競賽與體育' },
  { text: '學習與成長' },
  { text: '宣導與展覽' },
  { text: '公益與志工' },
]);

const activeCategory = ref('全部類型');

// 【步驟2.1】宣告一個 ref 用於滾動定位
const scrollTarget = ref(null);

function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// 處理 JSON 資料時，額外保存 allPhotos 和 fullTitle
const allActivityCards = ref(eventPhotoData.map(event => {
  let category = event.category;
  if (category === '公益與志工服務') {
    category = '公益與志工';
  }
  return {
    id: event.id,
    // 卡片封面圖仍然使用第一張照片
    imageUrl: new URL(`../assets/img/eventphotos/${event.photos[0]}`, import.meta.url).href,
    category: { text: category, url: '#' },
    title: { text: event.title, url: '#' },
    moreUrl: '#',
    // 【新增】將原始的 photos 陣列和 title 保存起來，以供燈箱使用
    allPhotos: event.photos, // 保存所有照片檔名
    fullTitle: event.title // 保存完整標題
  };
}));

const allVideoCards = ref(eventVideoData.map((video, index) => ({
  id: index,
  videoId: getYouTubeId(video.link),
  category: video.category,
  title: video.title,
  categoryUrl: '#',
  titleUrl: '#',
  learnMoreUrl: '#',
  isLoaded: false // <-- 讓父層來追蹤狀態
})));

const filteredActivityCards = computed(() => {
  if (activeCategory.value === '全部類型') {
    return allActivityCards.value;
  }
  return allActivityCards.value.filter(card => card.category.text === activeCategory.value);
});

const filteredVideoCards = computed(() => {
  if (activeCategory.value === '全部類型') {
    return allVideoCards.value;
  }
  return allVideoCards.value.filter(video => video.category === activeCategory.value);
});

const openLightbox = (clickedCardId) => {
  // 從所有活動卡片中，找到被點擊的那一張
  const clickedCard = allActivityCards.value.find(card => card.id === clickedCardId);
  if (clickedCard && clickedCard.allPhotos) {
    // 將該活動的所有照片檔名，轉換成 ImageLightbox 元件需要的格式
    lightboxImages.value = clickedCard.allPhotos.map((photoName, index) => ({
      id: `${clickedCard.id}-${index}`, // 建立一個唯一的 key
      imageUrl: new URL(`../assets/img/eventphotos/${photoName}`, import.meta.url).href,
      title: { text: clickedCard.fullTitle } // 標題對所有照片都一樣
    }));

    // 設定從第一張圖片開始顯示
    lightboxStartIndex.value = 0;
    // 顯示
    isLightboxVisible.value = true;
  }
};

// 關閉時，清空圖片陣列
const closeLightbox = () => {
  isLightboxVisible.value = false;
  lightboxImages.value = []; // 清空陣列是個好習慣
};

function updateCategoryFromRoute(categoryName) {
  const targetCategory = categoryName || '全部類型';
  const isValidCategory = orangeButtons.value.some(btn => btn.text === targetCategory);
  if (isValidCategory) {
    activeCategory.value = targetCategory;
  }
}

watch(
  () => route.query.category,
  (newCategory) => {
    updateCategoryFromRoute(newCategory);
  }
);

onMounted(() => {
  updateCategoryFromRoute(route.query.category);
});

function setCategoryFromCard(category) {
  handleCategoryUpdate(category);
}

// 單獨撥放一個影片
function playVideo(clickedVideo) {
  // 指揮家對所有樂手說：先全部安靜
  allVideoCards.value.forEach(video => {
    // 如果這個樂手不是等下要獨奏的那位
    if (video.id !== clickedVideo.id) {
      // 就告訴他不要演奏
      video.isLoaded = false;
    }
  });
  // 指揮家指向被點擊的那位樂手：換你演奏了
  clickedVideo.isLoaded = true;
}

function handleCategoryUpdate(category) {
  activeCategory.value = category;
  nextTick(() => {
    if (scrollTarget.value) {
      const elementPosition = scrollTarget.value.getBoundingClientRect().top + window.scrollY;
      // 根據您網站導航列的實際高度微調這個 120px 的數值
      const offsetPosition = elementPosition - 120;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
}
</script>

<template>
  <div class="video-view">
    <Banner :sources="videoBannerSources" :default-src="videoDefaultBannerSrc" bigText="活動影音" smallText="Event Video" />
    <main class="c-bg-wave c-bg-gray-area w-100">
      <!-- 照片 -->
      <section ref="scrollTarget" class="c-flex-area container-padding">
        <div class="c-content-1400 c-flex-area">
          <ResponsiveFilterGroup :buttons="orangeButtons" align="center" :activeCategory="activeCategory"
            @update:activeCategory="handleCategoryUpdate"
            class="d-flex justify-content-center w-100 menu-cardlist-mb" />
          <div class="section-title text-h1 h1-title-pb">活動照片</div>

          <PaginatedView :items="filteredActivityCards" :initial-show="6" :items-per-load="6">
            <template #default="{ items }">
              <ResponsiveCardGrid>
                <ActivityCardArrow v-for="card in items" :key="card.id" :card-data="card" :has-shadow="false"
                  @image-click="openLightbox(card.id)" @category-click="setCategoryFromCard" />
              </ResponsiveCardGrid>
            </template>
            <template #empty>
              <p>找不到符合條件的照片</p>
            </template>
          </PaginatedView>

        </div>
      </section>
      <!-- 影片 -->
      <section v-if="filteredVideoCards.length > 0" class="video-section-wrapper section-pt pb-5">
        <div class="video-title-container">
          <div class="text-h1 h1-title-pb text-center">活動影片</div>
        </div>
        <!-- 電腦版影片SWIPER -->
        <div class="desktop-video-view">
          <FullBleedCarousel :items="filteredVideoCards">
            <template #default="{ item }">
              <VideoCard :card-data="item" :state-managed-by-parent="true" @category-click="setCategoryFromCard"
                :has-shadow="false" @load-video="playVideo(item)" />
            </template>
          </FullBleedCarousel>
        </div>
        <!-- 手機版影片GRID -->
        <div class="mobile-video-view">
          <ResponsiveCardGrid>
            <VideoCard v-for="item in filteredVideoCards" :key="item.id" :card-data="item"
              :state-managed-by-parent="true" :fullWidth="true" @category-click="setCategoryFromCard"
              :has-shadow="false" @load-video="playVideo(item)" />
          </ResponsiveCardGrid>
        </div>
      </section>
      <!-- 無影片 -->
      <section v-else class="video-section-wrapper section-pt">
        <div class="video-title-container">
          <div class="text-h1 h1-title-pb text-center">活動影片</div>
        </div>
        <div class="empty-state-container">
          <p>找不到符合條件的影片</p>
        </div>
      </section>
      <!--  -->
      <ImageLightbox :items="lightboxImages" :start-index="lightboxStartIndex" :show="isLightboxVisible"
        @close="closeLightbox" />
    </main>
  </div>

</template>

<style scoped>
/* 這些是頁面全域或照片區塊的樣式，應予保留 */
.video-view {
  color: var(--color-text-primary);
  overflow-x: hidden;
}

.button-group {
  justify-content: center;
}

.blue-button-container {
  text-align: center;
  margin-top: 50px;
}

.video-title-container {
  max-width: 1400px;
  margin: 0 auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}

/* 影片區塊的空狀態樣式 */
.empty-state-container {
  text-align: center;
  color: #888;
  padding: 80px 0;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* --- 新增：響應式影片區塊樣式 --- */
.mobile-video-view {
  display: none;
}

@media (max-width: 576px) {
  .desktop-video-view {
    display: none;
  }

  .mobile-video-view {
    display: block;
    /* 讓網格與其他內容的邊距對齊 */
    padding: 0 var(--container-padding);
    /* 增加底部間距 */
  }
}
</style>