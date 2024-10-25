<template>
  <div class="card text-center">
    <img :src="backGroundImage" alt="anime stuff you know" class="thumb" />
    <p class="font-bold text-gray-500 m-4 truncate">{{ group.name }}</p>
    <NuxtLink :to="`/groups/${group.id}`">
      <p class="btn my-4">Подробнее</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const { group } = defineProps(["group"]);

const backGroundImage =
  "https://kartinki.pics/pics/uploads/posts/2022-08/1659829707_2-kartinkin-net-p-belie-anime-oboi-krasivo-3.png";
</script>

<style scoped></style>
