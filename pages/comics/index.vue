<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="comic in comics">
        <ComicsCard :comic="comic" />
      </div>
    </div>
    <CreateComicForm v-if="isEditor" :refresh="refresh" :userInfo="userInfo" />
  </div>
</template>

<script lang="ts" setup>
const token = useCookie("token");

const { userInfo } = storeToRefs(useUserStore());

definePageMeta({
  layout: "default",
});

const { data: comics, refresh } = await useFetch(
  "http://localhost:8080/comics"
);

const isEditor = computed(() =>
  ["ADMIN", "AUTHOR"].includes(userInfo.value.role)
);
</script>

<style lang="scss" scoped></style>
