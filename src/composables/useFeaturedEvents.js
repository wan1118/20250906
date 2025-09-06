import { computed } from 'vue';
import eventListData from '@/assets/data/EventList.json';

/**
 * Composable 函式，專門用來處理精選活動的資料邏輯。
 */
export function useFeaturedEvents() {
  // 取得圖片 URL 的輔助函式
  const getBannerImageUrl = (name) => {
    return new URL(`../assets/img/event/information/${name}`, import.meta.url).href;
  };

  // 指定精選活動的 ID 順序
  const featuredEventOrder = ['d05_results', 'e01_old', 'c04_ability', 'e02_eye', 'c09_teenager', 'c03_dream'];

  // 處理精選活動資料的計算屬性
  const featuredEvents = computed(() => {
    const eventMap = new Map(eventListData.map(event => [event.id, event]));
    return featuredEventOrder.map(id => {
      const event = eventMap.get(id);
      if (!event || !event.imageBannerUrl) {
        console.warn(`精選活動 ID '${id}' 在 EventList.json 中找不到，或缺少 imageBannerUrl。`);
        return null;
      }

      const eventTime = event.dateTime.startsWith('時間:') ? event.dateTime.substring(3).trim() : event.dateTime;
      const locationText = event.location.startsWith('地點:') ? event.location.substring(3).trim() : event.location;

      const dynamicTags = [];
      const audience = event.targetAudience || '';

      if (audience.includes('青少年')) {
        dynamicTags.push({
          text: '青少年',
          link: `/information?tag=青少年`
        });
      } else if (audience.includes('全年齡')) {
        dynamicTags.push({
          text: '全年齡',
          link: `/information?tag=全年齡`
        });
      }

      return {
        id: event.id,
        category: {
          text: event.category,
          url: `/information?category=${encodeURIComponent(event.category)}`
        },
        title: event.title,
        eventTime: eventTime,
        location: { text: locationText, url: "#" },
        imageUrl: getBannerImageUrl(event.imageBannerUrl),
        tags: dynamicTags,
      };
    }).filter(event => event !== null);
  });

  // 將最終計算好的資料回傳出去
  return {
    featuredEvents
  };
}