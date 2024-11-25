<template>
  <header
    class="shadow-sm py-4 flex w-full container mx-auto items-center justify-between bg-white"
  >
    <NuxtLink to="/" class="font-bold text-2xl">KuertovComics</NuxtLink>

    <nav class="flex justify-between gap-6 items-center">
      <NuxtLink class="text-lg font-semibold" to="/">Главная</NuxtLink>
      <NuxtLink class="text-lg font-semibold" to="/about">О нас</NuxtLink>
      <NuxtLink class="text-lg font-semibold" to="/groups">Группы</NuxtLink>
      <NuxtLink class="text-lg font-semibold" to="/auth"
        >Вход/Регистрация</NuxtLink
      >
      <NuxtLink class="text-lg font-semibold btn" to="/comics"
        >Комиксы</NuxtLink
      >
    </nav>
  </header>
</template>
