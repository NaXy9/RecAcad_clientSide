import axios from 'axios'
import router from '../router'    // чтобы редиректить на /login

// ——————————————————
// Создаём экземпляр с базовым URL
// ——————————————————
const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: { 'Content-Type': 'application/json' },
})

// ——————————————————
// Флаги для «очереди» запросов на время рефреша
// ——————————————————
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else      prom.resolve(token)
  })
  failedQueue = []
}

// ——————————————————
// Интерцептор «на запрос» — ставим access
// ——————————————————
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ——————————————————
// Интерцептор «на ответ» — ловим просрочку
// ——————————————————
api.interceptors.response.use(
  res => res,
  err => {
    const originalRequest = err.config

    // если это уже был retry — отваливаем
    if (originalRequest._retry) {
      return Promise.reject(err)
    }

    // статус может быть 401 или 403, смотрим код в теле
    const status = err.response?.status
    const data   = err.response?.data || {}

    if (
      (status === 401 || status === 403) &&
      data.code === 'token_not_valid'
    ) {
      // ставим флаг повторного запуска
      originalRequest._retry = true

      if (isRefreshing) {
        // если уже рефрешим — очередь
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
        .then(token => {
          originalRequest.headers.Authorization = 'Bearer ' + token
          return api(originalRequest)
        })
        .catch(e => Promise.reject(e))
      }

      isRefreshing = true
      const refreshToken = localStorage.getItem('refresh')

      return new Promise((resolve, reject) => {
        api.post('/users/token/refresh/', { refresh: refreshToken })
          .then(({ data: tokens }) => {
            // сохраняем новые токены
            localStorage.setItem('access',  tokens.access)
            localStorage.setItem('refresh', tokens.refresh)
            // обновляем заголовок по умолчанию
            api.defaults.headers.common.Authorization = 'Bearer ' + tokens.access
            // отдаем очередь
            processQueue(null, tokens.access)
            // повторяем исходный запрос
            originalRequest.headers.Authorization = 'Bearer ' + tokens.access
            resolve(api(originalRequest))
          })
          .catch(refreshError => {
            // рефреш не прошел — откатываем всё
            processQueue(refreshError, null)
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            // редирект на логин
            router.push('/login')
            reject(refreshError)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }

    // не наша кейс — дальше по цепочке
    return Promise.reject(err)
  }
)

export default api
