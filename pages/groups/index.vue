<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="group in groups">
        <GroupCard :group="group" />
      </div>
    </div>
  </div>
</template>

<script setup>
import GroupCard from "~/components/groups/GroupCard.vue";
const { data: groups } = await useFetch("http://localhost:8080/groups");
</script>

<style scoped></style>
