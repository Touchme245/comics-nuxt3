<template>
  <form @submit.prevent="submitForm" class="form-container">
    <input
      v-model="userId"
      type="number"
      placeholder="id пользователя которому вы хотите выдать полномочия автора"
      required
      class="form-input"
    />

    <button type="submit" class="btn">Войти</button>
  </form>
</template>

<script setup>
const userId = ref(null);
const token = useCookie("token");
const makeUserAuthorUri = "http://localhost:8080/admin/" + userId.value;

const { data: refresh } = defineProps("refresh");

const submitForm = async () => {
  const response = await fetch(loginUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  await refresh();
};
</script>

<style lang="scss" scoped></style>
