<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import FuAwBgGray from '@/components/background/future/future-bg-gray-awareness.vue';
import FuBgOrangeBtm from '@/components/background/future/future-bg-orange-bottom.vue';
// 匯入banner元件及圖片 
import Banner from '@/components/sections/Banner.vue';

// 引入「未來研究室」頁面所有尺寸的 Banner 圖片
import banner1920 from '@/assets/img/banner/future-banner-1920.png';
import banner1400 from '@/assets/img/banner/future-banner-1400.png';
import banner1200 from '@/assets/img/banner/future-banner-1200.png';
import banner996 from '@/assets/img/banner/future-banner-996.png';
import banner765 from '@/assets/img/banner/future-banner-765.png';
import banner576 from '@/assets/img/banner/future-banner-576.png';

// 建立要傳遞給 Banner 元件的 sources 陣列
const futureBannerSources = [
    { media: '(min-width: 1401px)', srcset: banner1920 },
    { media: '(min-width: 1201px)', srcset: banner1400 },
    { media: '(min-width: 997px)', srcset: banner1200 },
    { media: '(min-width: 766px)', srcset: banner996 },
    { media: '(min-width: 577px)', srcset: banner765 },
];

// 指定預設/最小尺寸的圖片
const futureDefaultBannerSrc = banner576;

// 匯入宣導輪播元件及圖片、json資料
import CaseCardCarousel from '@/components/pagesections/future/CaseCardCarousel.vue';
import AwarenessData from '@/assets/data/future_awareness.json';
import PostLightbox from '@/components/modal/PostLightbox.vue'; // 1. 引入燈箱元件

// 匯入影音輪播元件
import VideoCarousel from '@/components/pagesections/future/VideoCarousel.vue';

// 匯入測驗輪播元件、橘色按鈕元件、JSON 資料
import InfoCardCarousel from '@/components/pagesections/future/LearningCarousel.vue';
// 將 CategoryButton 替換為 FilterButton
import FilterButton from '@/components/button/FilterButton.vue';
import InfoData from '@/assets/data/future_test.json';

// 匯入相關連結元件
import LearningAll from '@/components/pagesections/future/InfoAll.vue';


// 宣導區塊-----------------------------------------------
// // 1. 建立一個 ref 來追蹤視窗寬度
// const windowWidth = ref(window.innerWidth);

// // 2. 建立一個 computed 屬性來決定標題文字
// //    您可以自行調整 768 這個斷點
// const awarenessTitle = computed(() => {
//     if (windowWidth.value <= 576) {
//         return '教育宣導'; // <--- 請替換成您想要的小尺寸標題
//     } else {
//         return '別覺得自己不會遇到！實際上都在身邊發生！';
//     }
// });

// // 3. 建立更新視窗寬度的函式
// const handleResize = () => {
//     windowWidth.value = window.innerWidth;
// };

// // 4. 在元件掛載時加上監聽器，在卸載時移除
// onMounted(() => {
//     window.addEventListener('resize', handleResize);
// });

// onUnmounted(() => {
//     window.removeEventListener('resize', handleResize);
// });

// 了解自己區塊--------------------------------------------
// 定義一個響應式變數來追蹤目前選取的類別
const activeCategory = ref('全部');
// 從 JSON 中提取所有不重複的類別
const categories = ['全部', ...new Set(InfoData.flatMap(section => section.items.map(item => item.category)))];

// 定義一個亂數排序的函式
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};


// 燈箱-------------------------------------------------

// 3. 新增管理燈箱狀態的變數
const isLightboxVisible = ref(false);
const selectedCaseItems = ref([]); // <-- 從 selectedCaseData (物件) 改為 selectedCaseItems (陣列)
const lightboxStartIndex = ref(0);

// 4. 新增打開燈箱的函式
const openLightbox = (clickedItem) => {
    // 將完整的資料陣列傳給燈箱，讓它可以輪播
    selectedCaseItems.value = AwarenessData;

    // 找到被點擊的項目在完整陣列中的索引
    const clickedIndex = AwarenessData.findIndex(item => item.id === clickedItem.id);
    lightboxStartIndex.value = clickedIndex >= 0 ? clickedIndex : 0;

    isLightboxVisible.value = true;
};

// 5. 新增關閉燈箱的函式
const closeLightbox = () => {
    isLightboxVisible.value = false;
    // 延遲清空是個好習慣，但非必須
    setTimeout(() => {
        selectedCaseItems.value = [];
    }, 400);
};

// 使用 computed 屬性來動態篩選卡片
const filteredCards = computed(() => {
    // 將所有卡片整合成一個一維陣列
    const allCards = InfoData.flatMap(section =>
        section.items.map(item => ({
            ...item,
            sectionTitle: section.sectionTitle,
        }))
    );
    // 如果 activeCategory 是 '全部'，則回傳所有亂數排序後的卡片
    if (activeCategory.value === '全部') {
        return shuffleArray(allCards);
    }
    // 否則，只回傳符合目前 activeCategory 的卡片（不亂數排序，因為分類後通常希望順序固定）
    return allCards.filter(card => card.category === activeCategory.value);
});

// 處理按鈕點擊事件
const selectCategory = (category) => {
    activeCategory.value = category;
};
</script>

<template>
    <Banner :sources="futureBannerSources" :default-src="futureDefaultBannerSrc" bigText="未來研究室"
        smallText="NextGen Lab" />

    <!-- 簡介 -->
    <div class="c-flex-area container-padding">
        <div class="about c-content-1300 c-flex-row-area row-area-gap">
            <div class="about-text-area c-flex-col h1-title-gap">
                <div class="text-h1">關於未來研究室</div>
                <div class="text-p">你的專屬成長實驗室，整合各種資訊網站，<br class="mobile-break">帶你探索自我的無限可能。</div>
            </div>
            <div class="about-img">
                <img src="@/assets/img/future/future-draw.png" alt="">
            </div>
        </div>
    </div>
    <FuAwBgGray class="c-text-gray-area " />

    <!-- 宣導 -->
    <div class="c-bg-gray-area c-flex-col ">
        <div class="c-flex-area container-padding">
            <div class="c-content-1400 case-text">
                <!-- <div class="text-h1 h1-title-pb">{{ awarenessTitle }}</div> -->
                <div class="text-h1">別覺得自己不會遇到！實際上都在身邊發生！</div>
                <!-- <div class="go-left-info col-12 col-xl-2 text-p pt-3 text-end mb-5 c-text-gray-icon">← 向左拉動查看</div> -->
            </div>
        </div>
        <CaseCardCarousel class="case-swipper-area" :awarenessData="AwarenessData" @show-details="openLightbox" />

        <PostLightbox :show="isLightboxVisible" :items="selectedCaseItems" :start-index="lightboxStartIndex"
            @close="closeLightbox" />
    </div>

    <!-- 影音 -->
    <div class="c-flex-area container-padding c-bg-gray-area section-pt">
        <div class="c-content-1400 c-flex-col h1-title-gap">
            <div class="text-h1">影音酷搜</div>
            <div class="video-carousel-wrapper">
                <VideoCarousel />
            </div>
        </div>
    </div>

    <!-- 了解自己 top -->
    <div class="c-flex-area c-bg-gray-area fu-bg-orange-top-area container-padding">
        <div class="c-content-1400 c-flex-col h1-title-gap">
            <div class="text-h1 understand-title c-text-white-base">了解你自己</div>
            <div class="tag-area categories">
                <FilterButton v-for="category in categories" :key="category" :text="category"
                    @click="selectCategory(category)" :is-active="activeCategory === category" />
            </div>
        </div>
    </div>

    <!-- 了解自己 btm -->
    <div class="understand c-bg-orange-500 d-flex flex-column justify-content-center">
        <div class="under-content c-flex-area container-padding">
            <div class="c-content-1400">
                <div class="text-p c-text-white-base">
                    <div class="test"></div>
                    <div>我是誰？未來適合做什麼？測測看就知道！ </div>
                    <div>提供多種有趣的心理測驗，從興趣、性向到職能特質，幫你一步步釐清自我，發掘潛力！</div>
                </div>
            </div>
        </div>
        <InfoCardCarousel :cards="filteredCards" />
    </div>
    <FuBgOrangeBtm class="c-text-orange-500 c-bg-gray-area section-pb-half" />

    <!-- 相關資源 -->
    <div class="c-flex-area container-padding c-bg-gray-area">
        <div class="c-content-1400 c-flex-col h1-title-gap pb-5">
            <div class="text-h1">相關資源連結</div>
            <LearningAll />
        </div>
    </div>
</template>

<style scoped>
/* .text-h1 {
    margin-bottom: var(--c-gap-32);
} */

/* 簡介 */
.about {
    /* gap: var(--c-gap-62); */
}

.about-text-area {
    max-width: 26.8125rem;
    min-width: 26.8125rem;
}

.mobile-break {
    display: none;
}

.about-img {
    width: auto;
    display: block;
}

.about-img img {
    width: 100%;
}

/* .space-area {
    height: 250px;
    background-image: url(@/assets/img/future/future-awareness/bg-gray.svg);
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
} */

.case-swipper-area {
    overflow-x: hidden;
}

/* 了解自己 ------------------------- */

.fu-bg-orange-top-area {
    aspect-ratio: 1920 / 456;
    min-height: auto;
    background-image: url(@/assets/img/future/future-bg-orange-top.svg);

    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    justify-content: end;
}

.understand-title {
    padding-top: var(--radius-56);
}

/* 相關連結 ---------------------------- */

.tag-area {
    margin-bottom: 24px;
}

/* 使用 :deep() 選擇器覆寫 FilterButton 樣式，達到反轉效果 */
/* 預設狀態 (反轉為 FilterButton 的 active 狀態) */
.tag-area :deep(.filter-button) {
    background-color: var(--color-orange-500);
    color: var(--color-white-base);
    border-color: var(--color-orange-light);
}

/* 啟用(active)與懸停(hover)狀態 (反轉為 FilterButton 的預設狀態，並使用指定的淡橘色邊框) */
.tag-area :deep(.filter-button.active),
.tag-area :deep(.filter-button:hover) {
    background-color: var(--color-white-base);
    color: var(--color-orange-500);
    border-color: var(--color-white-base);
}

@media (max-width: 1000px) {
    .about {
        padding: 0 0 50px;
    }

    .about-text-area {
        max-width: unset;
        min-width: 22rem;
    }

    .fu-bg-orange-top-area {
        aspect-ratio: unset;
        /* background-image: unset; */

        background-image: url(@/assets/img/future/bg-orange-point.svg);
        background-position: center 1px;
        background-color: var(--color-gray-area);
    }

    .video-carousel-wrapper {
        padding-bottom: 40px;
    }

    .understand-title {
        padding-top: 100px;
    }
}

@media (max-width: 865px) {
    .video-carousel-wrapper {
        padding-bottom: 30px;
    }

    .understand-title {
        padding-top: var(--radius-80);
    }

    .case-text {
        padding-top: var(--c-gap-28);
    }
}

@media (max-width: 576px) {
    .about {
        /* flex-direction: column; */
        padding-bottom: 30px;
    }

    .about-text-area {
        /* 429px = 26.8125rem */
        min-width: 26.8125rem;
        text-align: center;
    }

    .mobile-break {
        display: block;
        content: '';
    }

    .about-img {
        display: flex;
        justify-content: center;
    }

    .about-img img {
        max-width: 500px;
        width: 80%;
    }
}
</style>