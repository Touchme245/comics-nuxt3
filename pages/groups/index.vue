<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="group in groups">
        <GroupCard :group="group" />
      </div>
      <div>
        <CreateGroupForm :refresh="refresh" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CreateGroupForm from "~/components/groups/CreateGroupForm.vue";
import GroupCard from "~/components/groups/GroupCard.vue";
const { data: groups, refresh } = await useFetch(
  "http://localhost:8080/groups"
);
</script>

<style scoped></style>
