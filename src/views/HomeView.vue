<!-- src/views/HomeView.vue -->
<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Hero -->
    <section class="pt-20 pb-12 text-center bg-gradient-to-r from-blue-900 to-indigo-900">
      <div class="container mx-auto px-6 lg:px-20">
        <img src="../icons/logo.png" alt="РекАкад" class="mx-auto mb-6 w-32 rounded-full shadow-lg" />
        <h1 class="text-4xl font-extrabold text-white mb-4">Добро пожаловать в РекАкад</h1>
        <p class="text-lg text-blue-100 mb-8">
          Автоматизированная запись, транскрипция и конспектирование лекций и встреч на русском языке.
        </p>
        <div class="flex justify-center space-x-4">
          <router-link
            to="/login"
            class="px-6 py-3 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition"
            >Войти</router-link
          >
          <router-link
            to="/register"
            class="px-6 py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
            >Регистрация</router-link
          >
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16">
      <div class="container mx-auto px-6 lg:px-20">
        <h2 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">Почему РекАкад?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <feature-card
            icon="🎙️"
            title="Точная транскрипция"
            description="Мощные модели ASR распознают русскую речь до 1.5 часа записи."
          />
          <feature-card
            icon="🕒"
            title="Тайм‑коды и конспекты"
            description="Автоматическая разбивка по секциям и структурированные конспекты."
          />
          <feature-card
            icon="🔒"
            title="Конфиденциальность"
            description="Все данные хранятся в вашей инфраструктуре, полностью под вашим контролем."
          />
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-6 lg:px-20">
        <h2 class="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Отзывы пользователей</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <testimonial-card
            avatar="/user1.jpg"
            name="Анна И."
            quote="С помощью РекАкад я экономлю часы на ручной расшифровке лекций — теперь всё готово после пары нажатий."
          />
          <testimonial-card
            avatar="/user2.jpg"
            name="Иван П."
            quote="Функция конспектирования — просто находка! Студенты в восторге."
          />
        </div>
      </div>
    </section>

    <!-- Call To Action -->
    <section class="py-16 text-center">
      <div class="container mx-auto px-6 lg:px-20">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Готовы начать?</h2>
        <router-link
          to="/register"
          class="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition"
          >Создать аккаунт бесплатно</router-link
        >
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 bg-gray-200 dark:bg-gray-900">
      <div class="container mx-auto px-6 lg:px-20 text-center text-gray-600 dark:text-gray-400">
        © 2025 РекАкад. Все права защищены.
      </div>
    </footer>
  </div>
</template>

<script setup>
import FeatureCard from '../components/FeatureCard.vue'
import TestimonialCard from '../components/TestimonialCard.vue'
</script>
