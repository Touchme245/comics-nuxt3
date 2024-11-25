<template>
  <form @submit.prevent="submitForm" class="form-container">
    <input
      v-model="firstName"
      type="text"
      placeholder="Имя"
      required
      class="form-input"
    />
    <input
      v-model="lastName"
      type="text"
      placeholder="Фамилия"
      required
      class="form-input"
    />
    <input
      v-model="email"
      type="email"
      placeholder="почта"
      required
      class="form-input"
    />
    <input
      v-model="username"
      type="text"
      placeholder="никнейм"
      required
      class="form-input"
    />
    <input
      v-model="password"
      type="password"
      placeholder="пароль"
      required
      class="form-input"
    />
    <button type="submit" class="btn">Зарегестрироваться</button>
  </form>
</template>

<script setup>
const username = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const token = useCookie("token");

const router = useRouter();
const { getUserInfo } = useUserStore();

const registerUri = "http://localhost:8080/auth/signup";

const submitForm = async () => {
  const data = {
    username: username.value,
    password: password.value,
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
  };
  await handleRegister(data);
};

const handleRegister = async (data) => {
  const response = await useFetch(registerUri, {
    key: new Date().toString() + "register",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  console.log(token.value);
  token.value = response.data.value.accessToken;
  console.log(token.value);
  await getUserInfo();
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
