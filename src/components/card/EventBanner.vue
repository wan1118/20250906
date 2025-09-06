<script setup>
import { defineProps, computed } from 'vue';

import CategoryButton from '@/components/button/CategoryButton.vue';
// 【新增】引入我們需要的共用元件
import CardBody from '@/components/base/CardBody.vue';
import ContactInfoItem from '@/components/base/ContactInfoItem.vue';
import BaseTag from '@/components/base/BaseTag.vue';
import IconTime from '@/components/icons/icons-18px/time.vue'; // 假設您有這個 Icon 元件
import IconLoca from '@/components/icons/icons-18px/loca.vue';

const props = defineProps({
    eventData: {
        type: Object,
        required: true
    },
    hasShadow: {
        type: Boolean,
        default: true // 預設為 true (有陰影)
    }
});

// 建立前往 Google Maps 的 computed link
const mapLink = computed(() => {
    // 先確保 eventData.location 和 eventData.location.text 存在
    if (!props.eventData.location || !props.eventData.location.text) {
        return null;
    }
    // 將地點文字進行 URL 編碼，避免特殊字元問題
    const encodedLocation = encodeURIComponent(props.eventData.location.text);
    // 組合成一個有效的 Google Maps 搜尋連結
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
});
</script>

<template>
    <div class="event-banner c-bg-white-base c-text-primary c-card-border ui-radius-80"
        :class="{ 'no-shadow': !hasShadow }">
        <div class="event-info my-auto">

            <CardBody :title="eventData.title" footer-mode="adjacent">

                <template #header>
                    <router-link :to="eventData.category.url" style="text-decoration: none;">
                        <CategoryButton :text="eventData.category.text" />
                    </router-link>
                </template>

                <template #title>
                    <router-link :to="{ name: 'EventDetail', params: { id: eventData.id } }"
                        class="text-h3 event-banner-title">
                        {{ eventData.title }}
                    </router-link>
                </template>

                <div class="info-list">
                    <ContactInfoItem :icon-component="IconTime" label="" :value="eventData.eventTime"
                        :truncate="true" />
                    <ContactInfoItem :icon-component="IconLoca" label="" :value="eventData.location.text"
                        :href="mapLink" :truncate="true" />
                </div>

                <template #footer>
                    <div class="tags-list">
                        <router-link v-for="tag in eventData.tags" :key="tag.text" :to="tag.link">
                            <BaseTag :text="tag.text" :clickable="true" />
                        </router-link>
                    </div>
                </template>
            </CardBody>
        </div>

        <router-link :to="{ name: 'EventDetail', params: { id: eventData.id } }" class="event-image-link">
            <img :src="eventData.imageUrl" alt="活動圖片" class="event-image">
        </router-link>
    </div>
</template>

<style scoped>
.event-banner {
    width: 100%;
    max-width: 1400px;
    max-height: 34.1875rem;
    height: auto;

    overflow: hidden;
    display: flex;
    flex-direction: row;
    box-shadow: var(--c-shadow-soft);
}

/* 覆寫並移除陰影 */
.event-banner.no-shadow {
    box-shadow: none;
}

/* 左側資訊區 */
.event-info {
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    min-width: 0;
}

/* 右側圖片區 */
.event-image-link {
    display: block;
    width: 65%;
    height: 100%;
}

.event-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
}

img {
    width: 100%;
}

/* 響應式樣式 */
@media (max-width: 1500px) {
    .event-info {
        width: 45%;
    }

    .event-image-link {
        width: 55%;
    }
}


@media (max-width: 576px) {
    .event-banner {
        flex-direction: column-reverse;
        height: auto;
        max-height: unset;
        min-height: 34.1875rem;
    }

    .event-image-link {
        width: 100%;
        max-height: 200px;
        aspect-ratio: var(--aspect-ratio-custom);
    }

    .event-info {
        width: 100%;
    }

    .event-banner-title {
        /* 為了讓 overflow 和 text-overflow 生效，
     我們最好將 display 設為 block 或 inline-block */
        display: block;
        width: 100%;
        /* 確保它會填滿可用寬度 */

        /* --- 實現單行文字省略的關鍵三兄弟 --- */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>