<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="comic in comics">
        <ComicsCard :comic="comic" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "comics",
});

const { data: comics } = await useFetch("http://localhost:8080/comics");
</script>

<style lang="scss" scoped></style>
