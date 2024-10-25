<template>
  <div class="mt-7 max-w-sm mx-auto text-center card">
    <p class="mt-7 text-7xl font-bold">{{ error?.statusCode || "Ошибка" }}</p>
    <p class="mt-7 text-6xl full-width-text">Что-то пошло не так...</p>
    <p class="mt-7">{{ error?.message || "Неизвестная и пугающая ошибка" }}</p>
    <button class="btn my-7" @click="handleClearError">На главную</button>
  </div>
</template>

<script setup>
defineProps(["error"]);

const handleClearError = () => clearError({ redirect: "/" });
</script>

<style scoped>
.full-width-text {
  width: 100%; /* Растягивает блок на всю ширину */
  text-align: center; /* Выравнивает текст по центру */
  padding: 20px; /* Добавляет отступы для лучшего восприятия */
  box-sizing: border-box; /* Учитывает отступы в ширине */
}
</style>
