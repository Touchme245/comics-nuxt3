<template>
  <h2>Главная</h2>

  <p>Платформа для увлекательного чтения</p>
  <div v-if="userInfo.role == 'ADMIN'"><AdminMakeUserAuthorForm /></div>
  <div v-if="userInfo.role == 'ADMIN'"><AdminCreateDump /></div>
</template>

<script setup>
import { useUserStore } from "@/stores";

const { userInfo } = toRefs(useUserStore());
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
