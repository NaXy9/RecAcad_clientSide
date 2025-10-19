// src/api/sessions.js
import api from 'axios'

export function startSession(link, groupId) {
  // поле "group" должно совпадать с тем, что ожидает DRF-вью
  return api.post('/sessions/start/', {
    link: link,
    group: groupId
  })
}

// если понадобится ещё stop-endpoint:
export function stopSession(sessionId) {
  return api.post(`/sessions/${sessionId}/stop/`)
}
