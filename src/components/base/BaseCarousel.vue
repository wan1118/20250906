<script setup>
import { ref, watch, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper/modules'; import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CarouselButton from '@/components/button/CarouselButton.vue';
import PaginationDots from '@/components/base/PaginationDots.vue';

// 這個元件需要從父層接收的資料
const props = defineProps({
    // 要顯示在輪播中的項目陣列
    items: {
        type: Array,
        required: true
    },
    // Swiper 的設定選項，讓父層可以客製化輪播行為
    swiperOptions: {
        type: Object,
        default: () => ({}) // 給一個空的預設值
    },
    // 是否顯示底部分頁圓點
    showPagination: {
        type: Boolean,
        default: true // 預設不顯示
    }, // <--- 在這裡加上逗號

    // --- 請從這裡開始貼上 ---
    // 新增：是否啟用自動播放
    autoplay: {
        type: Boolean,
        default: true // 預設為 false (關閉)
    },
    // 新增：自動播放的設定
    autoplayOptions: {
        type: Object,
        // 預設每 3 秒 (3000ms) 換一張
        default: () => ({
            delay: 3000,
            disableOnInteraction: false, // 使用者互動後，不會停止自動播放
        })
    }
});

// 根據 props 動態決定要載入哪些模組
const modules = computed(() => {
    const baseModules = [Pagination, Navigation];
    if (props.autoplay) {
        return [...baseModules, Autoplay]; // 如果 autoplay 是 true，就加入 Autoplay 模組
    }
    return baseModules; // 否則，就只使用基本模組
});

// --- 狀態與函式 ---
const swiperInstance = ref(null);
const activeIndex = ref(0);

const onSwiper = (swiper) => {
    swiperInstance.value = swiper;
};

const onSlideChange = (swiper) => {
    activeIndex.value = swiper.realIndex;
};

watch(activeIndex, (newIndex) => {
    if (swiperInstance.value && swiperInstance.value.realIndex !== newIndex) {
        swiperInstance.value.slideToLoop(newIndex);
    }
});
</script>

<template>
    <div class="base-carousel-wrapper">
        <swiper class="c-shadow-filter-soft" :modules="modules" :navigation="{ nextEl: '.carousel-button-next', prevEl: '.carousel-button-prev' }"
            :autoplay="autoplay ? autoplayOptions : false" v-bind="swiperOptions" @swiper="onSwiper"
            @slide-change="onSlideChange">
            <swiper-slide v-for="(item, index) in items" :key="index">
                <slot :item="item"></slot>
            </swiper-slide>
        </swiper>
        <CarouselButton direction="prev" class="carousel-button-prev" />
        <CarouselButton direction="next" class="carousel-button-next" />

        <PaginationDots v-if="showPagination" :total-items="items.length" v-model:currentIndex="activeIndex"
            class="custom-pagination" theme="dark" />
    </div>
</template>

<style scoped>
.base-carousel-wrapper {
    position: relative;
    width: 100%;
}

:deep(.swiper) {
    padding-bottom: 40px;
}

/* 讓 slide 內容預設為撐滿並置中 */
:deep(.swiper-slide) {
    height: auto;
    display: flex;
    justify-content: center;
}

/* --- 按鈕樣式 --- */
.carousel-button-prev,
.carousel-button-next {
    top: calc(50% - (var(--carousel-button-size)) / 2);
    transform: translateY(-50%);
}

.carousel-button-prev {
    left: calc(-1 * var(--carousel-button-size) / 2);
}

.carousel-button-next {
    right: calc(-1 * var(--carousel-button-size) / 2);
}

.custom-pagination {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
}

/* 確保 Swiper 預設的按鈕永遠不會顯示出來 */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
    display: none;
}
</style>