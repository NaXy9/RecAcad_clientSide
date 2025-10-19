import axios from '../api/axios'

export function getGroups() {
  return axios.get('/groups/')
}

export function createGroup(title) {
  return axios.post('/groups/create/', { title })
}

// Приглашаем пользователя
export function inviteUser(groupId, username) {
  return axios.post(`/groups/${groupId}/add-member/`, { username })
}

// Удаляем (самого себя) из группы
export function leaveGroup(groupId, username /* если понадобится */) {
  return axios.post(`/groups/${groupId}/remove-member/`, { username })
}

// Если вам также нужен вызов на удаление группы (owner only):
export function deleteGroup(groupId) {
  return axios.delete(`/groups/${groupId}/delete/`)
}
