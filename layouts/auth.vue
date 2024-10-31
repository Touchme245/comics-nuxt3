<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto flex justify-between">
        <NuxtLink to="/" class="font-bold">kuertov comics</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/">Главная</NuxtLink></li>
          <li><NuxtLink to="/about">О нас</NuxtLink></li>
          <li><NuxtLink to="/groups">Группы</NuxtLink></li>
          <li><NuxtLink to="/auth">Вход/Регистрация</NuxtLink></li>
          <li><NuxtLink to="/comics" class="btn">Комиксы</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
const token = useCookie("token");

console.log(token.value);
</script>

<style scoped>
.router-link-exact-active {
  color: #282;
}
</style>
