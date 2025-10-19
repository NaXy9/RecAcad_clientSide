<!-- src/components/StartSessionModal.vue -->
<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50"
      @click.self="onClose"
      @keyup.escape="onClose"
    >
      <div class="relative w-full max-w-md p-4">
        <!-- Остальное содержимое модального окна остается без изменений -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Новая лекция
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="onClose"
            >
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
        
          <!-- Modal body -->
          <div class="p-4 space-y-4">
            <div>
              <label for="conference-link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ссылка на конференцию
              </label>
              <input
                id="conference-link"
                ref="linkInput"
                v-model.trim="link"
                type="url"
                placeholder="https://salutejazz.ru/..."
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                @keyup.enter="start"
              >
            </div>
            
            <div>
              <label for="group-select" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Группа
              </label>
              <select
                id="group-select"
                v-model="selectedGroup"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option v-for="group in groups" :key="group.id" :value="group.id">
                  {{ group.title }}
                </option>
              </select>
            </div>

            <!-- Status messages -->
            <div v-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {{ error }}
            </div>
            <div v-if="success" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
              Запись успешно запущена
            </div>
          </div>
          
          <!-- Modal footer -->
          <div class="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              @click="onClose"
            >
              Отмена
            </button>
            <button
              type="button"
              class="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              :disabled="loading"
              @click="start"
            >
              <span v-if="loading">
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                Запуск...
              </span>
              <span v-else>Начать запись</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { getGroups } from '../api/groups'
import { startSession } from '../api/sessions'

const props = defineProps({ 
  visible: Boolean 
})
const emit = defineEmits(['close'])

const link = ref('')
const selectedGroup = ref(null)
const groups = ref([])
const error = ref('')
const success = ref(false)
const loading = ref(false)
const linkInput = ref(null)

// Загрузка списка групп
onMounted(async () => {
  try {
    const { data } = await getGroups()
    groups.value = data
    if (data.length > 0) selectedGroup.value = data[0].id
  } catch (err) {
    error.value = 'Ошибка загрузки групп'
    console.error('Error loading groups:', err)
  }
})

// Автофокус при открытии модалки
watch(() => props.visible, async (newVal) => {
  if (!newVal) {
    reset()
  } else {
    await nextTick()
    linkInput.value?.focus()
  }
})

function reset() {
  link.value = ''
  selectedGroup.value = groups.value?.[0]?.id || null
  error.value = ''
  success.value = false
  loading.value = false
}

function validateUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

async function start() {
  error.value = ''
  success.value = false

  if (!link.value) {
    error.value = 'Пожалуйста, введите ссылку'
    return
  }

  if (!validateUrl(link.value)) {
    error.value = 'Пожалуйста, введите корректный URL (начинается с http:// или https://)'
    return
  }

  if (!selectedGroup.value) {
    error.value = 'Пожалуйста, выберите группу'
    return
  }

  loading.value = true
  try {
    await startSession(link.value, selectedGroup.value)
    success.value = true
    setTimeout(onClose, 2000)
  } catch (err) {
    console.error('Error starting session:', err)
    error.value = err.response?.data?.detail || 'Не удалось запустить запись'
  } finally {
    loading.value = false
  }
}

function onClose() {
  emit('close')
}
</script>