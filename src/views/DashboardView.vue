<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-6">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Ваши записи лекций
        </h1>
        <button @click="handleLogout"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >Выйти</button>
      </div>

      <div class="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <!-- Первая карточка: запуск новой записи -->
        <div @click="showModal = true"
          class="flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg h-40 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <span class="text-4xl text-gray-500 dark:text-gray-400">+</span>
        </div>

        <!-- Карточки записей -->
        <div v-for="rec in recordings" :key="rec.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
        >
          <div class="relative">
            <img v-if="rec.thumbnailUrl" :src="rec.thumbnailUrl" alt=""
              class="w-full h-32 object-cover group-hover:opacity-90 transition">
            <div v-else class="w-full h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span class="text-gray-500 dark:text-gray-400">Видео</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
              {{ rec.group_title || '—' }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ formatDate(rec.created_at) }}
            </p>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Статус: <span class="font-medium">{{ rec.status || '—' }}</span>
            </p>
            <router-link
              :to="`/recordings/${rec.id}`"
              class="inline-block mt-3 text-indigo-600 hover:underline text-sm"
            >Подробнее ▶</router-link>
          </div>
        </div>
      </div>
    </div>

    <StartSessionModal
      v-model:visible="showModal"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'
import { logout } from '../utils/auth'
import StartSessionModal from '../components/StartSessionModal.vue'

const user = ref(null)
const recordings = ref([])
const showModal = ref(false)
const router = useRouter()

async function loadUser() {
  try {
    const { data } = await api.get('/users/me/')
    user.value = data
  } catch {
    router.push('/login')
  }
}

async function loadRecordings() {
  try {
    const { data } = await api.get('/recordings/')
    recordings.value = data
  } catch (e) {
    console.error(e)
  }
}

function formatDate(dt) {
  return new Date(dt).toLocaleDateString('ru-RU', { year:'numeric', month:'short', day:'numeric' })
}

function handleLogout() {
  logout()
  router.push('/')
}

onMounted(async () => {
  await loadUser()
  await loadRecordings()
})
</script>
