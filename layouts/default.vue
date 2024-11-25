<template>
  <div v-if="token">
    <CommonHeader />
    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
  <div v-else>
    <AuthError />
  </div>
</template>

<script setup>
const token = useCookie("token");
</script>

<style lang="scss">
.router-link-exact-active {
  color: #282;
}
</style>
