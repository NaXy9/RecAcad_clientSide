<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from './api/axios'
import Sidebar from './components/Sidebar.vue'
import GroupCreateModal from './components/GroupCreateModal.vue'
import { isAuthenticated, logout } from './utils/auth'

const router = useRouter()
const route = useRoute()

const user = ref(null)
const showGroupModal = ref(false)

// Решаем, показывать ли сайдбар: когда маршрут защищён
const showSidebar = ref(false)
watch(() => route.meta, () => {
  showSidebar.value = route.meta.requiresAuth && isAuthenticated()
}, { immediate: true })

// При монтировании, если авторизован, пытаемся получить user
onMounted(async () => {
  if (isAuthenticated()) {
    try {
      const { data } = await api.get('/users/me/')
      user.value = data
    } catch (err) {
      // токен может устареть
      user.value = null
      logout()
      router.push('/login')
    }
  }
})

// При закрытии/создании группы перезагружаем список в Sidebar
function onGroupCreated(newGroup) {
  showGroupModal.value = false
  // Сообщаем Sidebar перезагрузить (через событие)
  reloadGroupsInSidebar()
}

// пробрасываем событие
function reloadGroupsInSidebar() {
  // Здесь просто эмитим из App.vue через provide/inject или глобальный eventbus.
  // Упростим: будем использовать глобальное событие через mitt или даже window.dispatchEvent.
  window.dispatchEvent(new CustomEvent('groups-updated'))
}
</script>

<template>
  <div>
    <div v-if="showSidebar" class="flex">
      <Sidebar 
        :user="user" 
        @create-group="showGroupModal = true" 
        @group-changed="reloadGroupsInSidebar" 
      />
      <div class="flex-1 pl-64">
        <router-view />
      </div>
    </div>
    <div v-else>
      <!-- Если без сайдбара (публичные страницы) -->
      <router-view />
    </div>

    <!-- Модал создания группы -->
    <GroupCreateModal 
      v-if="showGroupModal" 
      @close="showGroupModal = false" 
      @created="onGroupCreated"
    />
  </div>
</template>

<style scoped>

</style>
