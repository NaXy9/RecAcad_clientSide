<template>
  <aside class="fixed top-0 left-0 w-64 h-full bg-white border-r dark:bg-gray-800 dark:border-gray-700">
    <div class="flex flex-col h-full overflow-y-auto">
      <!-- Логотип -->
      <div class="flex items-center justify-center p-4">
        <img src="../icons/logo.png" alt="Logo" class="h-10 w-auto" />
      </div>

      <!-- Аватар и имя -->
      <div class="flex items-center p-4 space-x-3">
        <div class="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
          <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="..."/>
          </svg>
        </div>
        <span class="text-gray-800 dark:text-gray-200 font-medium">{{ user?.username }}</span>
      </div>

      <hr class="border-gray-200 dark:border-gray-700" />

      <!-- Список групп -->
      <ul class="flex-1 px-2 py-4 space-y-1">
        <li v-for="group in groups" :key="group.id" class="relative group">
          <button
            class="w-full flex justify-between items-center px-3 py-2 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>{{ group.title }}</span>
            <button @click.stop="toggleMenu(group.id)">
              <svg class="h-4 w-4 text-gray-500 hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zM14 10a2 2 0 114 0 2 2 0 01-4 0z"/>
              </svg>
            </button>
          </button>

          <!-- Overflow-menu -->
          <div
            v-if="openMenu === group.id"
            class="absolute right-2 top-0 mt-10 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-10"
          >
            <button
              v-if="group.isOwner"
              class="block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              @click="deleteGroup1(group.id)"
            >Удалить группу</button>
            <button
              class="block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              @click="leaveGroup1(group.id)"
            >Выйти из группы</button>
          </div>
        </li>
      </ul>

      <div class="px-4 pb-4">
        <button
          @click="$emit('create-group')"
          class="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >Создать группу</button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getGroups, deleteGroup, leaveGroup } from '../api/groups'
import { getUserInfo } from '../utils/auth'

const props = defineProps(['user'])
const emit = defineEmits(['create-group'])

const groups = ref([])
const openMenu = ref(null)

onMounted(async () => {
  await load()
})

async function load() {
  const { data } = await getGroups()
  const user = await getUserInfo()
  groups.value = data.map(g => ({
    ...g,
    isOwner: g.ownerUsername === user.username
  }))
}

function toggleMenu(id) {
  openMenu.value = openMenu.value === id ? null : id
}

async function deleteGroup1(id) {
  await deleteGroup(id)
  openMenu.value = null
  await load()
}

async function leaveGroup1(id) {
  await leaveGroup(id)
  openMenu.value = null
  await load()
}
</script>
