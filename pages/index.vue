<template>
  <h2>Главная</h2>

  <p>Платформа для увлекательного чтения</p>
  <AdminMakeUserAuthorForm />
</template>

<script setup>
const token = useCookie("token");
const userInfoUri = "http://localhost:8080/users";

const { data: userInfo, refresh } = await useFetch(userInfoUri, {
  key: new Date().toString() + "check",
  headers: {
    Authorization: "Bearer " + token.value,
  },
});
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  font-size: 36px;
}
p {
  margin: 20px 0;
}
</style>
