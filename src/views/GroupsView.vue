<template>
  <div class="groups">
    <h2>Мои группы</h2>

    <ul>
      <li v-for="group in groups" :key="group.id">
        <strong>{{ group.title }}</strong>
        <p>Участники: {{ group.members.join(', ') }}</p>
        <input v-model="invites[group.id]" placeholder="Логин для приглашения" />
        <button @click="sendInvite(group.id)">Пригласить</button>
        <button @click="leave(group.id)">Выйти из группы</button>
      </li>
    </ul>

    <h3>Создать группу</h3>
    <input v-model="newGroupTitle" placeholder="Название группы" />
    <button @click="createNewGroup">Создать</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getGroups, createGroup, inviteUser, leaveGroup } from '../api/groups'
import { getUserInfo } from '../utils/auth'

const groups = ref([])
const newGroupTitle = ref('')
const invites = ref({})
const currentUser = ref(null)

onMounted(async () => {
  try {
    currentUser.value = await getUserInfo()
  } catch (err) {
    console.error('Ошибка при получении пользователя', err)
  }
})

async function loadGroups() {
  try {
    const { data } = await getGroups()
    groups.value = data
    // Инициализируем invites
    invites.value = Object.fromEntries(data.map(g => [g.id, '']))
  } catch (e) {
    console.error('Ошибка при загрузке групп', e)
  }
}

async function createNewGroup() {
  if (!newGroupTitle.value) return
  try {
    await createGroup(newGroupTitle.value)
    newGroupTitle.value = ''
    await loadGroups()
  } catch (e) {
    console.error('Не удалось создать группу', e)
  }
}

async function sendInvite(groupId) {
  const username = invites.value[groupId]
  if (!username) return
  try {
    await inviteUser(groupId, username)
    invites.value[groupId] = ''
    await loadGroups()
  } catch (e) {
    console.error('Не удалось пригласить', e)
  }
}

async function leave(groupId) {
  try {
    if (!currentUser.value) {
      currentUser.value = await getUserInfo()
    }
    await leaveGroup(groupId, currentUser.value.username)
    await loadGroups()
  } catch (e) {
    console.error('Не удалось выйти из группы', e)
  }
}


onMounted(loadGroups)
</script>
