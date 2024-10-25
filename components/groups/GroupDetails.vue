<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <img :src="backGroundImage" alt="animeee" class="mx-auto my-7" />
      </div>

      <div class="p-7">
        <h2 class="text-4xl my-7">{{ group.name }}</h2>
        <p class="text-xl my-7">Дата создания - {{ group.creationDate }}</p>
        <p class="text-xl my-7">Автор - {{ group.creator.username }}</p>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Описание</h3>
        <p class="mb-7">{{ group.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { group } = defineProps(["group"]);
const backGroundImage =
  "https://kartinki.pics/pics/uploads/posts/2022-08/1659829707_2-kartinkin-net-p-belie-anime-oboi-krasivo-3.png";
</script>

<style lang="scss" scoped></style>
