<template>
  <form @submit.prevent="submitForm" class="form-container">
    <h2 class="form-title">Выдача полномочий автора</h2>
    <label for="userId" class="form-label"
      >Введите username пользователя:</label
    >
    <input
      v-model="userId"
      type="text"
      id="userId"
      placeholder="username пользователя"
      required
      class="form-input"
    />

    <button type="submit" class="btn">Сделать пользователя автором</button>
  </form>
</template>

<script setup>
const userId = ref(null);
const token = useCookie("token");
console.log(userId.value);
const { data: refresh } = defineProps("refresh");

const submitForm = async () => {
  const makeUserAuthorUri = "http://localhost:8080/admin/" + userId.value;
  const response = await fetch(makeUserAuthorUri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.value,
    },
  });
  // await refresh();
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
}

.form-title {
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #333;
}

.form-label {
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.form-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

.btn {
  background-color: #28a745; /* Зеленый цвет */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #218838; /* Темнее зеленый при наведении */
}
</style>
