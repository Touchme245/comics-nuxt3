<template>
  <div>
    <CommonHeader />

    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
const token = useCookie("token");
</script>

<style scoped>
.router-link-exact-active {
  color: #282;
}
</style>
