<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Banner from '@/components/sections/Banner.vue';
import banner1920 from '@/assets/img/banner/information-banner-1920.png';
import banner1400 from '@/assets/img/banner/information-banner-1400.png';
import banner1200 from '@/assets/img/banner/information-banner-1200.png';
import banner996 from '@/assets/img/banner/information-banner-996.png';
import banner765 from '@/assets/img/banner/information-banner-765.png';
import banner576 from '@/assets/img/banner/information-banner-576.png';
const infoBannerSources = [
  { media: '(min-width: 1401px)', srcset: banner1920 },
  { media: '(min-width: 1201px)', srcset: banner1400 },
  { media: '(min-width: 997px)', srcset: banner1200 },
  { media: '(min-width: 766px)', srcset: banner996 },
  { media: '(min-width: 577px)', srcset: banner765 },
];

const infoDefaultBannerSrc = banner576;
import ActivityCard from '@/components/card/ActivityCard.vue';
import CollapsibleFilterPanel from '@/components/menu/CollapsibleFilterPanel.vue';
import allActivitiesRaw from '@/assets/data/EventList.json';
import PaginatedView from '@/components/base/PaginatedView.vue';
// 匯入 FilterButton 元件 (請確認您的專案路徑是否正確)
import FilterButton from '@/components/button/FilterButton.vue';
import ResponsiveCardGrid from '@/components/base/ResponsiveCardGrid.vue';


const router = useRouter();
const route = useRoute();
const activeCategory = ref('全部類型');
const activeTags = ref([]);
const allActivities = ref([]);
const categoryButtons = ref([
  '全部類型', '休閒娛樂', '競賽與體育', '學習與成長', '宣導與展覽', '公益與志工服務'
]);

const tagButtons = ref(['青少年', '全年齡', '開放報名', '報名截止']);

// 【步驟3.1】宣告一個 ref 用於滾動定位
const scrollTarget = ref(null);

const rocToGregorian = (rocDateString) => {
  if (!rocDateString) return null;
  const match = rocDateString.match(/(?:(\d{2,3})年)?(\d{1,2})月(\d{1,2})日/);
  if (match) {
    const year = match[1] ? parseInt(match[1], 10) + 1911 : new Date().getFullYear();
    const month = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);
    return new Date(year, month, day);
  }
  return null;
};

const getRegistrationStatus = (activity) => {
  const now = new Date();
  const notes = activity.notes || '';
  const registration = activity.registration || '';
  const dateTime = activity.dateTime || '';
  if (registration.includes('額滿') || notes.includes('額滿') || registration.includes('報名截止')) {
    return '報名截止';
  }
  const sourceString = `${notes} ${dateTime}`;
  const endDateMatch = sourceString.match(/(?:至|止於|截止於|止)\s*(\d{2,3}年?\d{1,2}月\d{1,2}日)/);
  if (endDateMatch) {
    const endDate = rocToGregorian(endDateMatch[1]);
    if (endDate && now > endDate) {
      return '報名截止';
    }
  }
  return '開放報名';
};

const getDefaultImage = (category) => {
  try {
    switch (category) {
      case '休閒娛樂': return new URL('@/assets/img/event/default-cover/leisure_and_entertainment.png', import.meta.url).href;
      case '競賽與體育': return new URL('@/assets/img/event/default-cover/sports_and_competitions.png', import.meta.url).href;
      case '學習與成長': return new URL('@/assets/img/event/default-cover/learning_and_development.png', import.meta.url).href;
      case '宣導與展覽': return new URL('@/assets/img/event/default-cover/promotion_and_exhibition.png', import.meta.url).href;
      case '公益與志工服務': return new URL('@/assets/img/event/default-cover/public_welfare_and_volunteer_service.png', import.meta.url).href;
      default: return `https://placehold.co/447x333/cccccc/FFFFFF?text=無圖片`;
    }
  } catch (error) {
    console.error("Error getting default image URL:", error);
    return `https://placehold.co/447x333/cccccc/FFFFFF?text=圖片錯誤`;
  }
};

onMounted(() => {
  allActivities.value = allActivitiesRaw.map(activity => {
    const registrationStatus = getRegistrationStatus(activity);
    let audienceTag = '其他';
    if (activity.targetAudience.includes('青少年')) audienceTag = '青少年';
    else if (activity.targetAudience.includes('全年齡')) audienceTag = '全年齡';
    const displayTags = [];
    if (audienceTag !== '其他') displayTags.push({ text: audienceTag });
    displayTags.push({ text: registrationStatus });
    return {
      id: activity.id,
      imageUrl: activity.imageUrl ? new URL(`../assets/img/event/information/${activity.imageUrl}`, import.meta.url).href : getDefaultImage(activity.category), category: activity.category,
      title: activity.title,
      eventTime: (activity.dateTime || '').replace(/時間:\s*/, ''),
      location: (activity.location || '').replace(/地點:\s*/, ''),
      tags: displayTags,
      _registrationStatus: registrationStatus,
      _targetAudience: audienceTag
    };
  });
});

const setFiltersFromRoute = (query) => {
  const categoryFromQuery = query.category;
  if (categoryFromQuery && categoryButtons.value.includes(categoryFromQuery)) {
    activeCategory.value = categoryFromQuery;
  } else { activeCategory.value = '全部類型'; }
  const tagFromQuery = query.tag;
  if (tagFromQuery && tagButtons.value.includes(tagFromQuery)) {
    activeTags.value = [tagFromQuery];
  } else { activeTags.value = []; }

  // 【關鍵修改】在處理完 URL 參數後，立即呼叫滾動函式
  nextTick(scrollToTargetWithOffset);
};

watch(() => route.query, (newQuery) => { setFiltersFromRoute(newQuery); }, { immediate: true });

const filteredActivities = computed(() => {
  let activities = allActivities.value;
  if (activeCategory.value !== '全部類型') {
    activities = activities.filter(activity => activity.category === activeCategory.value);
  }
  if (activeTags.value.length > 0) {
    activities = activities.filter(activity => {
      return activeTags.value.every(tag => {
        switch (tag) {
          case '青少年': case '全年齡': return activity._targetAudience === tag;
          case '開放報名': case '報名截止': return activity._registrationStatus === tag;
          default: return false;
        }
      });
    });
  }
  return activities;
});

const handleCardClick = (activity) => {
  router.push({ name: 'EventDetail', params: { id: activity.id } });
};

// 建立一個可重複使用的滾動函式
function scrollToTargetWithOffset() {
  if (scrollTarget.value) {
    const elementPosition = scrollTarget.value.getBoundingClientRect().top + window.scrollY;
    // 根據您網站導航列的實際高度微調這個 120px 的數值
    const offsetPosition = elementPosition - 120;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

const selectCategory = (category) => {
  activeCategory.value = category;
  nextTick(scrollToTargetWithOffset);
};

const selectTag = (tag) => {
  const conflictingPairs = {
    '青少年': '全年齡', '全年齡': '青少年',
    '開放報名': '報名截止', '報名截止': '開放報名'
  };
  const newTags = [...activeTags.value];
  const clickedTagIndex = newTags.indexOf(tag);
  if (clickedTagIndex !== -1) {
    newTags.splice(clickedTagIndex, 1);
  } else {
    const conflictingTag = conflictingPairs[tag];
    if (conflictingTag) {
      const conflictingTagIndex = newTags.indexOf(conflictingTag);
      if (conflictingTagIndex !== -1) {
        newTags.splice(conflictingTagIndex, 1);
      }
    }
    newTags.push(tag);
  }
  activeTags.value = newTags;
  nextTick(scrollToTargetWithOffset);
};
</script>

<template>
  <div class="">
    <Banner :sources="infoBannerSources" :default-src="infoDefaultBannerSrc" bigText="活動訊息" smallText="Event List" />
    <section class="container-padding c-bg-wave c-bg-gray-area">
      <div ref="scrollTarget" class="content-container">

        <div class="desktop-filters">
          <div class="filter-group category-group">
            <FilterButton v-for="btnText in categoryButtons" :key="btnText" :text="btnText"
              :is-active="activeCategory === btnText" @click="selectCategory(btnText)" />
          </div>
          <div class="filter-group menu-cardlist-mb">
            <span class="tag-label">Tag：</span>

            <FilterButton v-for="btnText in tagButtons" :key="btnText" :text="btnText" font-size="p"
    padding-style="compact"
              :is-active="activeTags.includes(btnText)" color="blue" @click="selectTag(btnText)" />

          </div>
        </div>

        <div class="mobile-filters">
          <CollapsibleFilterPanel :categories="categoryButtons" v-model:activeCategory="activeCategory"
            :tags="tagButtons" v-model:activeTags="activeTags" class="menu-cardlist-mb" />
        </div>

        <PaginatedView :items="filteredActivities" :initial-show="6" :items-per-load="6">
          <template #default="{ items }">
            <ResponsiveCardGrid>
              <ActivityCard v-for="card in items" :key="card.id" :card-data="card" :has-shadow="false"
                @details-click="handleCardClick(card)" @category-clicked="selectCategory" @tag-clicked="selectTag" />
            </ResponsiveCardGrid>
          </template>

          <template #empty>
            <p>找不到符合條件的活動，請嘗試更換篩選條件。</p>
          </template>
        </PaginatedView>

      </div>
    </section>
  </div>
</template>

<style scoped>
/* --- 手機版/電腦版篩選器切換 --- */
.desktop-filters {
  display: block;
}

.mobile-filters {
  display: none;
}

@media (max-width: 769px) {
  .desktop-filters {
    display: none;
  }

  .mobile-filters {
    display: block;
  }
}

/* --- 原有樣式 --- */
.content-container {
  max-width: 1400px;
  margin: 0 auto;
  /* 【步驟 3】移除 card-grid 相關的樣式，因為已經移至共用元件 */
  /* min-height 樣式若為頁面所需，可保留並應用於 content-container 或 PaginatedView 的外層 */
}

.filter-group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.category-group {
  margin-bottom: 40px;
}

.tag-label {
  font-size: 24px;
  font-weight: 700;
  color: #2C3E50;
  margin-right: 16px;
}

.activity-card {
  cursor: pointer;
}

@media (max-width: 769px) {

  .tag-label {
    font-size: 18px;
  }
}
</style>