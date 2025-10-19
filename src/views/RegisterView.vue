<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      
      <div class="text-center">
        <img class="mx-auto h-12 w-auto" src="../icons/logo.png" alt="Logo">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Создать аккаунт
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
          или <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">войти</router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Логин</label>
            <input v-model.trim="username" id="username" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border 
              border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 
              text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:outline-none 
              focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Логин">
          </div>
          <div>
            <label for="email" class="sr-only">Email</label>
            <input v-model.trim="email" id="email" type="email" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border 
              border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 
              text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:outline-none 
              focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email">
          </div>
          <div>
            <label for="password" class="sr-only">Пароль</label>
            <input v-model="password" id="password" type="password" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border 
              border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 
              text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:outline-none 
              focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Пароль">
          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium 
            rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span v-if="loading" class="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            Зарегистрироваться
          </button>
        </div>
      </form>

      <p v-if="error" class="mt-4 text-center text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../api/axios'

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

async function handleRegister() {
  loading.value = true
  error.value = ''
  try {
    await axios.post('/users/register/', { username: username.value, email: email.value, password: password.value })
    router.push('/login')
  } catch {
    error.value = 'Ошибка регистрации. Проверьте данные'
  } finally {
    loading.value = false
  }
}
</script>
