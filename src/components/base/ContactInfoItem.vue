<script setup>
import { defineProps } from 'vue';

defineProps({
  iconComponent: {
    type: Object,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  href: {
    type: String,
    default: null
  },
  truncate: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <p class="contact-item text-p" v-if="value && value !== '無'">
  <div>
    <component :is="iconComponent" class="info-icon c-icon-size-18" />
  </div>

  <a v-if="href" :href="href" :title="value" class="info-text u-interactive-link-hover"
    :class="{ 'truncate': truncate }" target="_blank" rel="noopener noreferrer">
    <span>{{ label }}{{ value }}</span>
  </a>

  <span v-else class="info-text" :class="{ 'truncate': truncate }">
    {{ label }}{{ value }}
  </span>
  </p>
</template>

<style scoped>
.contact-item {
  display: flex;
  /* align-items: center; */
  gap: 0.5rem;
  /* gap: 1rem;  */
}

.info-icon {
  flex-shrink: 0;
  /* margin-top: calc((var(--font-size-p) - var(--c-icon-size-18)) / 2); */
}

.info-text {
  /* color: inherit; */
  /* text-decoration: none; */
  min-width: 0;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>