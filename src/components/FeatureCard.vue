<!-- src/components/FeatureCard.vue -->
<template>
  <div class="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
    <div class="text-4xl mb-4">{{ icon }}</div>
    <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100">{{ title }}</h3>
    <p class="mt-2 text-gray-600 dark:text-gray-300">{{ description }}</p>
  </div>
</template>
<script setup>
defineProps({
  icon: String,
  title: String,
  description: String
})
</script>
