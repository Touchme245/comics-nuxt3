<template>
  <form @submit.prevent="submitForm" class="form-container">
    <input
      v-model="username"
      type="text"
      placeholder="Имя пользователя"
      required
      class="form-input"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Пароль"
      required
      class="form-input"
    />
    <button type="submit" class="btn">Войти</button>
  </form>
</template>

<script setup>
const token = useCookie("token");
const username = ref("");
const password = ref("");
const router = useRouter();

const loginUri = "http://localhost:8080/auth/login";

const submitForm = async () => {
  const data = {
    username: username.value,
    password: password.value,
  };
  await handleLogin(data);
};

const handleLogin = async (data) => {
  const response = await fetch(loginUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (result.status == "BAD_REQUEST") {
    throw createError({
      statusCode: 400,
      message: response.message,
      statusMessage: response.message,
      fatal: true,
    });
  }
  token.value = result.accessToken;
  console.log(result);
  await router.push("/");
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.form-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #12b488;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #09edb0;
}
</style>
