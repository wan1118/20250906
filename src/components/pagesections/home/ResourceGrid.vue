<script setup>
import { ref } from 'vue';
import resourceMapData from '@/assets/data/resourceMap.json';

// 輔助函式：動態取得 small_size 圖片的路徑
const getSmallImageUrl = (imageName) => {
    // 假設您的圖片都放在 @/assets/img/index/informap/ 路徑下
    return new URL(`../../../assets/img/resourcemap/small_size/${imageName}`, import.meta.url).href;
};

// 輔助函式：將陣列順序隨機打亂 (Fisher-Yates shuffle)
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// 建立一個 ref 來存放最終要顯示的12個隨機資源
const randomResources = ref([]);

// --- 主要邏輯 ---
// 1. 過濾掉 JSON 中可能沒有 small_size 圖片的項目
const validResources = resourceMapData.filter(item => item.img && item.img.small_size);

// 2. 將有效的資源陣列隨機排序
const shuffledResources = shuffleArray(validResources);

// 3. 從隨機排序後的陣列中取出前 12 項，並整理成元件需要的格式
randomResources.value = shuffledResources.slice(0, 12).map(item => ({
    name: item.name,
    link: item.website,
    imageSrc: getSmallImageUrl(item.img.small_size),
}));

</script>

<template>
    <div class="connect">
        <div v-for="area in randomResources" :key="area.name" class="area">
            <a :href="area.link" class="resource-btn" target="_blank" rel="noopener noreferrer">
                <img :src="area.imageSrc" :alt="area.name">
            </a>
        </div>
    </div>
</template>

<style scoped>
/* connect, area 的樣式從 HomeView 搬移至此 */
.connect {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* 40px */
    /* gap: 2.5rem; */
    /* 20px */
    gap: 1.25rem;
    margin-bottom: 50px;
}

.area {
    display: flex;
    justify-content: center;
    align-items: center;
}

.resource-btn {
    display: block;
    width: 100%;
    aspect-ratio: 320 / 105;
    background-color: var(--color-white-base);
    border-radius: 8px;
    box-shadow: var(--c-shadow-soft);
    transition: transform 0.3s ease, opacity 0.3s ease;

}

.area img {
    width: 100%;
    height: auto;
    object-fit: cover;

}

.area a:hover {
    opacity: 0.9;
    transform: translateY(-5px);
}

/* 響應式樣式 */
@media (max-width: 992px) {
    .connect {
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }
}

@media (max-width: 600px) {
    .connect {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 400px) {
    .connect {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>