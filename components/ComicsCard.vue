<template>
  <div class="card text-center">
    <img :src="backGroundImage" alt="anime stuff you know" class="thumb" />
    <p class="font-bold text-gray-500 m-4 truncate">{{ comic.title }}</p>
    <NuxtLink :to="`/comics/${comic.id}`">
      <p class="btn my-4">Read</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const { comic } = defineProps(["comic"]);

const backGroundImage =
  "https://p4.wallpaperbetter.com/wallpaper/400/321/251/eromanga-sensei-anime-girls-izumi-sagiri-anime-wallpaper-preview.jpg";
</script>

<style scoped>
.thumb {
  max-height: 120px;
  max-width: 70%;
  margin: 0 auto;
}
</style>
