<template>
  <div class="recording-detail mx-auto p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <div v-if="loading" role="status" class="animate-pulse space-y-4">
      <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
      <div class="h-80 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
    </div>

    <div v-else>
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Основная область -->
        <div class="w-full lg:w-2/3 space-y-6">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            🎬 {{ recording.title || 'Запись лекции' }}
          </h2>

          <!-- Видео -->
          <div class="relative rounded-lg overflow-hidden shadow-lg">
            <video
              v-if="recording.video_file_url"
              :src="recording.video_file_url"
              class="w-full aspect-video bg-black rounded"
              controls
              ref="videoRef"
            ></video>
            <div v-else class="bg-gray-200 dark:bg-gray-700 h-[400px] flex items-center justify-center text-gray-600 dark:text-gray-300">
              Видео недоступно
            </div>
          </div>

          <!-- Конспект -->
          <div class="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-md transition-all duration-300">
            <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">📓 Конспект</h3>
            <div v-if="notesLines.length" class="prose dark:prose-invert max-w-none">
              <p v-for="(line, idx) in notesLines" :key="idx" class="text-gray-700 dark:text-gray-300">{{ line }}</p>
            </div>
            <p v-else class="text-gray-600 dark:text-gray-400">Конспект недоступен.</p>
          </div>

          <!-- Инфо о владельце и дате -->
          <div class="flex flex-col gap-4">
            <div>
              <h4 class="text-lg font-medium mb-1 text-gray-900 dark:text-white">👤 Владелец</h4>
              <p class="text-gray-800 dark:text-gray-300">{{ recording.owner }}</p>
            </div>
            <div>
              <h4 class="text-lg font-medium mb-1 text-gray-900 dark:text-white">📅 Дата записи</h4>
              <p class="text-gray-800 dark:text-gray-300">{{ formattedDate }}</p>
            </div>
          </div>
        </div>

        <!-- Боковая панель: краткий пересказ -->
        <aside class="w-full lg:w-1/3 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-md space-y-4">
          <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">🧠 Краткий пересказ</h3>
          <div v-if="summaryText" class="prose dark:prose-invert max-w-none whitespace-pre-wrap text-gray-700 dark:text-gray-300">
            {{ summaryText }}
          </div>
          <p v-else class="text-gray-600 dark:text-gray-400">Пересказ недоступен.</p>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from '../api/axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const videoRef = ref(null)

const recording = ref(null)
const notes = ref('')
const summaryText = ref('')
const loading = ref(true)

const notesLines = computed(() => notes.value.split('\n').filter(line => line.trim() !== ''))

const formattedDate = computed(() => {
  if (!recording.value?.created_at) return ''
  return new Date(recording.value.created_at).toLocaleString()
})

onMounted(async () => {
  const id = route.params.id
  try {
    const { data: rec } = await axios.get(`/recordings/${id}/`)
    recording.value = rec
    notes.value = rec.notes || ''
    summaryText.value = rec.summary || ''
  } catch (err) {
    console.error('Ошибка загрузки записи:', err)
    if (err.response?.status === 404) {
      router.replace('/recordings')
    }
  } finally {
    loading.value = false
  }
})

// Функция перемотки: если в summaryText есть таймкоды в тексте в виде "MM:SS" или "HH:MM:SS", 
// можно добавить логику поиска и перемотки. Но раз summary — чистый текст, без структуры, 
// обычно не делаем seek. Если же в тексте встречаются упоминания времени, 
// можно парсить regex, но это дополнительная задача.
function seekTo(/* ... */) {
  // не используется, т.к. нет структуры списка
}
</script>

<style scoped>
/* кастомные мелкие правки, если нужны */
</style>