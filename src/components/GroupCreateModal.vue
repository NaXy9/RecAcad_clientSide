<!-- src/components/GroupCreateModal.vue -->
<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50"
      @click.self="onClose"
      @keyup.escape.window="onClose"
    >
      <div class="relative w-full max-w-md p-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Создать новую группу</h3>
            <button
              type="button"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
              @click="onClose"
            >
              <span class="sr-only">Закрыть</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-4 space-y-4">
            <div>
              <label for="group-title" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Название группы
              </label>
              <input
                id="group-title"
                ref="titleInput"
                v-model.trim="title"
                type="text"
                placeholder="Введите название"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <p v-if="error" class="text-sm text-red-600 bg-red-50 dark:bg-gray-800 dark:text-red-400 p-2 rounded">
              {{ error }}
            </p>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 rounded"
              @click="onClose"
              :disabled="loading"
            >
              Отмена
            </button>
            <button
              type="button"
              class="ml-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 flex items-center"
              @click="createGroup"
              :disabled="loading"
            >
              <svg
                v-if="loading"
                class="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span>{{ loading ? 'Создание...' : 'Создать' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { createGroup as apiCreateGroup } from '../api/groups'

const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['close', 'created'])

const title = ref('')
const loading = ref(false)
const error = ref('')
const titleInput = ref(null)

// При открытии модалки — сброс полей и автофокус
watch(() => props.visible, async (newVal) => {
  if (newVal) {
    title.value = ''
    error.value = ''
    await nextTick()
    titleInput.value?.focus()
  }
})

// Закрытие модалки
function onClose() {
  if (loading.value) return
  emit('close')
}

// Валидация и вызов API для создания
async function createGroup() {
  error.value = ''
  if (!title.value) {
    error.value = 'Название не может быть пустым'
    return
  }
  loading.value = true
  try {
    // вызываем API
    const { data } = await apiCreateGroup(title.value)
    // успешное создание
    emit('created', data)
    // глобальное событие для обновления списков
    window.dispatchEvent(new CustomEvent('groups-updated'))
    // закрываем
    emit('close')
  } catch (err) {
    console.error('GroupCreateModal: create error', err)
    // предположим, что err.response.data.detail или err.message
    error.value = err.response?.data?.detail || 'Ошибка при создании группы'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
