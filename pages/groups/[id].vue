<template>
  <div>
    <GroupDetails :group="group" />
  </div>
</template>

<script setup>
import GroupDetails from "~/components/groups/GroupDetails.vue";

const { id } = useRoute().params;

const uri = "http://localhost:8080/groups/" + id;
const { data: group } = await useFetch(uri, { key: id });

if (!group.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Группа не найден(",
    fatal: true,
  });
}
</script>

<style scoped></style>
