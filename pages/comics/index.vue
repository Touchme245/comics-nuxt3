<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="comic in comics">
        <ComicsCard :comic="comic" />
      </div>
      <div>
        <CreateComicForm :refresh="refresh" :userInfo="userInfo" />
      </div>
    </div>
  </div>
</template>

<script setup>
const token = useCookie("token");
definePageMeta({
  layout: "default",
});

const { data: comics, refresh } = await useFetch(
  "http://localhost:8080/comics"
);

const userInfoUri = "http://localhost:8080/users";

const { data: userInfo } = await useFetch(userInfoUri, {
  key: new Date().toString() + "check",
  headers: {
    Authorization: "Bearer " + token.value,
  },
});
</script>

<style lang="scss" scoped></style>
