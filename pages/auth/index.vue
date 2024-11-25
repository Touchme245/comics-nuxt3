<template>
  <div class="w-1/4 mx-auto flex flex-col gap-4">
    <h2 class="font-bold text-2xl">Выберите действие</h2>
    <div class="flex items-center gap-3">
      <button @click="showLogin" class="btn">Логин</button>
      <button @click="showRegister" class="btn">Регистрация</button>
    </div>
    <div v-if="isLogin">
      <AuthLoginForm />
    </div>
    <div v-else>
      <AuthRegisterForm />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});

const isLogin = ref(true);

const showLogin = () => {
  isLogin.value = true;
};

const showRegister = () => {
  isLogin.value = false;
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
</style>
