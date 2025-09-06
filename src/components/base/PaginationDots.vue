<script setup>
defineProps({
    totalItems: {
        type: Number,
        required: true
    },
    currentIndex: {
        type: Number,
        required: true
    },
    theme: {
        type: String,
        default: 'light', // 預設為 'light' (淺色圓點)
        validator: (value) => ['light', 'dark'].includes(value) // 驗證傳入的值是否合法
    }
});


const emit = defineEmits(['update:currentIndex']);

function onDotClick(index) {
    emit('update:currentIndex', index);
}
</script>

<template>
    <div class="pagination-dots" :class="`theme-${theme}`">
        <button v-for="(_, index) in totalItems" :key="index" class="dot" :class="{ 'active': index === currentIndex }"
            @click="onDotClick(index)" :aria-label="`跳至第 ${index + 1} 項`"></button>
    </div>
</template>

<style scoped>
/* PaginationDots.vue - <style scoped> */
.pagination-dots {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 15px;
}

.dot {
    padding: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
}

/* --- Light Theme (預設，用於深色背景) --- */
.theme-light .dot {
    background-color: rgba(255, 255, 255, 0.5);
}

.theme-light .dot:hover {
    background-color: rgba(255, 255, 255, 0.75);
}

/* --- Dark Theme (用於淺色背景) --- */
.theme-dark .dot {
    background-color: #e0e0e0;
}

.theme-dark .dot:hover {
    background-color: #cccccc;
}

/* --- Active 狀態的顏色 (通用) --- */
/* 不論在哪個 theme 下，active 顏色都一樣 */
.dot.active {
    background-color: var(--color-blue-500);
    /* transform: scale(1.1); */
}
</style>