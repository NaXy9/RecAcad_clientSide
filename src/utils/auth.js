import axios from '../api/axios'

// Авторизация (получение токенов)
export function login(credentials) {
  return axios.post('/users/token/', credentials)
}

// Выход (удаление токенов и данных пользователя)
export function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('user')
}

// Проверка, авторизован ли пользователь
export function isAuthenticated() {
  return !!localStorage.getItem('access')
}

// Регистрация нового пользователя
export function register(data) {
  return axios.post('/users/register/', data)
}

// Получение информации о текущем пользователе
export async function getUserInfo(forceRefresh = false) {
  const cachedUser = localStorage.getItem('user')

  if (cachedUser && !forceRefresh) {
    try {
      return JSON.parse(cachedUser)
    } catch {
      localStorage.removeItem('user')
    }
  }

  try {
    const response = await axios.get('/users/me/')
    const user = response.data
    localStorage.setItem('user', JSON.stringify(user))
    return user
  } catch (err) {
    console.error('Не удалось получить данные пользователя:', err)
    throw err
  }
}
