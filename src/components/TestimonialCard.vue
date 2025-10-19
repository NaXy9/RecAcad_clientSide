<!-- src/components/TestimonialCard.vue -->
<template>
  <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow flex items-center space-x-4">
    <img :src="avatar" alt="" class="w-12 h-12 rounded-full object-cover" />
    <div>
      <p class="italic text-gray-800 dark:text-gray-100">“{{ quote }}”</p>
      <p class="mt-2 font-semibold text-gray-700 dark:text-gray-300">— {{ name }}</p>
    </div>
  </div>
</template>
<script setup>
defineProps({
  avatar: String,
  name: String,
  quote: String
})
</script>
