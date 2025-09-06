<script setup>
import { ref } from 'vue';

import BaseCarousel from '@/components/base/BaseCarousel.vue';
import eventVideoData from '@/assets/data/EventVideo.json';
import VideoCard from '@/components/card/VideoCard.vue';


function getYouTubeId(url) {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

// 資料處理邏輯不變，每個 video 物件依然需要 isLoaded 狀態
const filteredVideoCards = ref(eventVideoData.filter(video => video.category === '宣導與展覽').map((video, index) => ({
    id: index,
    videoId: getYouTubeId(video.link),
    category: video.category,
    title: video.title,
    categoryUrl: '#',
    titleUrl: '#',
    learnMoreUrl: '#',
    isLoaded: false
})));

const VideoBreakpoints = {
    // 螢幕寬度 0px 到 765px
    0: {
        slidesPerView: 1,
    },
    // 螢幕寬度 766px 以上
    576: {
        slidesPerView: 2,
    }
};


function playVideo(clickedVideo) {
    // 遍歷此輪播中的所有影片
    filteredVideoCards.value.forEach(video => {
        // 如果這個影片不是被點擊的那一個，就強制關閉它
        if (video.id !== clickedVideo.id) {
            video.isLoaded = false;
        }
    });
    // 最後，只打開被點擊的影片
    clickedVideo.isLoaded = true;
}
</script>

<template>
    <BaseCarousel 
      :items="filteredVideoCards"
      :swiper-options="{ spaceBetween: 28, loop: true, breakpoints: VideoBreakpoints }"
      :show-pagination="true"
    >
        <template #default="{ item }">
            <VideoCard 
              :card-data="item" 
              :state-managed-by-parent="true" 
              @load-video="playVideo(item)"
              :category-clickable="false" 
              :full-width="true"
              :has-shadow="false" 
            />
        </template>
    </BaseCarousel>
</template>

<style scoped>
.video-carousel-wrapper {
    position: relative;
}
</style>