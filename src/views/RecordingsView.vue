<template>
  <div class="recordings">
    <h2>Мои записи</h2>

    <ul v-if="recordings.length">
      <li v-for="recording in recordings" :key="recording.id" class="recording-item">
        <video
          v-if="recording.video_file"
          :src="getVideoUrl(recording.video_file)"
          width="300"
          controls
        ></video>
        <p><strong>Группа:</strong> {{ recording.group_title || '—' }}</p>
        <p><strong>Дата:</strong> {{ formatDate(recording.created_at) }}</p>
        <p><strong>Статус:</strong> {{ recording.status || '—' }}</p>
        <router-link :to="`/recordings/${recording.id}`">▶ Подробнее</router-link>
      </li>
    </ul>

    <p v-else>Нет доступных записей.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../api/axios'

const recordings = ref([])

function getVideoUrl(path) {
  return `http://localhost:8000${path}`
}

function formatDate(datetime) {
  return new Date(datetime).toLocaleString('ru-RU')
}

async function loadRecordings() {
  try {
    const { data } = await axios.get('/recordings/')
    recordings.value = data
  } catch (e) {
    console.error('Ошибка при загрузке записей', e)
  }
}

onMounted(loadRecordings)
</script>

<style scoped>
.recordings {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}
.recording-item {
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
}
</style>
