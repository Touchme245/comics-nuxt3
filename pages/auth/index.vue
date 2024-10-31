<template>
  <div class="auth-container">
    <h2 class="font-bold mb-2">Выберите действие</h2>
    <div class="button-group">
      <button @click="showLogin" class="btn">Логин</button>
      <button @click="showRegister" class="btn">Регистрация</button>
    </div>
    <div v-if="isLogin">
      <LoginForm @submit="handleLogin" />
    </div>
    <div v-else-if="isRegister">
      <RegisterForm @submit="handleRegister" />
    </div>
  </div>
</template>

<script setup>
import LoginForm from "~/components/auth/LoginForm.vue";
import RegisterForm from "~/components/auth/RegisterForm.vue";

definePageMeta({
  layout: "auth",
});

const isLogin = ref(true);
const isRegister = ref(false);

const showLogin = () => {
  isLogin.value = true;
  isRegister.value = false;
};

const showRegister = () => {
  isLogin.value = false;
  isRegister.value = true;
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
.button-group {
  margin: 20px 0;
}
.btn {
  margin: 0 10px;
}
</style>
