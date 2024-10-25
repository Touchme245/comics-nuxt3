<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto flex justify-between">
        <NuxtLink to="/" class="font-bold">kuertov comics</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/comics" class="btn">Comics</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
</script>

<style scoped>
.router-link-exact-active {
  color: #282;
}
</style>
