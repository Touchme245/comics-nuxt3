<template>
  <div class="container">
    <h1>Добро пожаловать на нашу платформу!</h1>
    <p>
      Пожалуйста, войдите в свою учетную запись, чтобы получить доступ ко всем
      функциям.
    </p>
    <NuxtLink to="/auth" class="login-button">Войти</NuxtLink>
  </div>
</template>

<script setup>
// Здесь можно добавить логику, если это необходимо
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Занимает всю высоту экрана */
  background-color: #f0f4f8; /* Светлый фон */
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #333; /* Темный цвет текста */
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  color: #666; /* Более светлый цвет текста */
  margin-bottom: 30px;
}

.login-button {
  padding: 10px 20px;
  font-size: 1.2rem;
  color: #fff; /* Белый текст */
  background-color: #06bd3d; /* Синий фон */
  border: none;
  border-radius: 5px;
  text-decoration: none; /* Убираем подчеркивание */
  transition: background-color 0.3s; /* Плавный переход цвета фона */
}

.login-button:hover {
  background-color: #2a9104; /* Темнее при наведении */
}
</style>
