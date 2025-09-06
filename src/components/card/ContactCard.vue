<script setup>
import { computed } from 'vue';
import CategoryButton from '@/components/button/CategoryButton.vue';
import ContactInfoItem from '@/components/base/ContactInfoItem.vue';

import CardBody from '@/components/base/CardBody.vue';

// 引入所有 Icon 元件...
import IconTelephone from '@/components/icons/icons-18px/phon.vue';
import IconEnvelope from '@/components/icons/icons-18px//mail.vue';
import IconGeoAlt from '@/components/icons/icons-18px/loca.vue';
import IconFacebook from '@/components/icons/icons-50px-resource-map/facebook.vue';
import IconInstagram from '@/components/icons/icons-50px-resource-map/instagram.vue';
import IconYoutube from '@/components/icons/icons-50px-resource-map/youtube.vue';

const emit = defineEmits(['category-clicked']);
const props = defineProps({
  cardData: {
    type: Object,
    required: true
  },
  hasShadow: {
    type: Boolean,
    default: true
  }
});


const socialIconComponents = {
  fb: IconFacebook,
  ig: IconInstagram,
  yt: IconYoutube,
};

const availableSocials = computed(() => {
  if (!Array.isArray(props.cardData.socials)) {
    return [];
  }
  return props.cardData.socials.filter(social =>
    socialIconComponents[social.type.toLowerCase()]
  );
});

function handleCategoryClick(category) {
  emit('category-clicked', category);
}

const telLink = computed(() => `tel:${props.cardData.phone.replace(/[\s()-]/g, '')}`);
const emailLink = computed(() => {
  const emailData = props.cardData.email;
  if (emailData && typeof emailData === 'object' && emailData.url) {
    return emailData.url;
  }
  if (emailData && (typeof emailData === 'object' || typeof emailData === 'string')) {
    const emailAddress = typeof emailData === 'object' ? emailData.text : emailData;
    if (emailAddress && emailAddress.includes('@')) {
      return `mailto:${emailAddress}`;
    }
  }
  return '#';
});
const emailText = computed(() => {
  const emailData = props.cardData.email;
  if (emailData && typeof emailData === 'object' && emailData.text) {
    return emailData.text;
  }
  if (emailData && typeof emailData === 'string') {
    return emailData;
  }
  return '無';
});
const mapLink = computed(() => {
  // 確保地址存在，避免產生無效連結
  if (!props.cardData.address || props.cardData.address === '無') {
    return '#'; // 如果沒有地址，返回一個安全的連結
  }
  // 使用 URL 和 ${} 語法
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.cardData.address)}`;
});</script>

<template>
  <div class="contact-card c-bg-white-base c-card-border ui-radius-56" :class="{ 'no-shadow': !hasShadow }">
    <a :href="cardData.website" target="_blank" rel="noopener noreferrer" class="card-img-link">
      <img :src="cardData.imageUrl" class="card-img-content" :alt="cardData.title">
    </a>

    <div class="card-info my-auto">

      <CardBody :title="cardData.title" :line-clamp="false" footer-mode="adjacent">
        <template #header>
          <div class="categories">
            <CategoryButton v-for="cat in cardData.categories" :key="cat" :text="cat"
              @click="handleCategoryClick(cat)" />
          </div>
        </template>

        <template #title>
          <a :href="cardData.website" target="_blank" rel="noopener noreferrer" :title="cardData.title">
            {{ cardData.title }}
          </a>
        </template>

        <div class="info-list">
          <ContactInfoItem v-if="cardData.phone && cardData.phone !== '無'" :icon-component="IconTelephone" label="電話："
            :value="cardData.phone" :href="telLink" />
          <ContactInfoItem v-if="emailText !== '無'" :icon-component="IconEnvelope" label="信箱：" :value="emailText"
            :href="emailLink" />
          <ContactInfoItem v-if="cardData.address && cardData.address !== '無'" :icon-component="IconGeoAlt" label="地址："
            :value="cardData.address" :href="mapLink" />
        </div>

        <template #footer>
          <div class="icon-block">
            <a v-for="(social, index) in availableSocials" :key="index" :href="social.url" target="_blank"
              rel="noopener noreferrer" :title="social.type">
              <component :is="socialIconComponents[social.type.toLowerCase()]"
                class="social-icon c-text-gray-icon c-icon-size-50" />
            </a>
          </div>
        </template>

      </CardBody>
    </div>
  </div>
</template>

<style scoped>
.contact-card {
  width: 100%;
  max-width: 95vw;
  height: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--c-shadow-soft);
}

/* no-shadow 規則來移除陰影 */
.contact-card.no-shadow {
  box-shadow: none;
}

.card-img-link {
  flex-shrink: 0;
  display: block;
  /* background-color: var(--color-white-base); */
  /* background-color: white; */
}

.card-img-content {
  width: 100%;
  height: 200px;
  object-fit: contain;
  object-position: center;
}

.card-info {
  flex-grow: 1;
  display: flex;

  flex-direction: column;
  min-width: 0;
}

.icon-block {
  display: flex;
  flex-direction: row;
  /* 24px */
  gap: 1.5rem;
}

.social-icon {
  transition: color 0.3s ease;
  background-color: transparent;
}

.social-icon:hover {
  color: var(--color-blue-500);
}

.card-info a {
  color: inherit;
  text-decoration: none;
}

.card-info a:hover {
  color: var(--color-blue-500);
  text-decoration: underline;
}

/* 所有 @media 響應式樣式維持不變 */
@media (min-width: 576px) {
  .contact-card {
    flex-direction: row;
  }

  .card-img-link {
    width: 42.85%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-img-content {
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    object-fit: contain;
  }

  .card-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  .icon-block {
    /* margin-top: auto; */
    flex-shrink: 0;
  }
}

@media (max-width: 576px) {

  /* 這裡的 :deep() 選擇器可以保留，因為它仍然有效 */
  .categories :deep(.category-button) {
    font-size: 14px;
    padding: 6px 14px;
    border-radius: 1rem;
  }
}
</style>