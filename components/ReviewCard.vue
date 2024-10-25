<template>
  <div class="card text-center review-card">
    <p class="font-bold text-gray-500 m-2 truncate">
      {{ review.user.username }}
    </p>
    <p class="text-gray-500 m-2 truncate">Оценка - {{ review.rating }}</p>
    <h3 class="font-bold border-b-2 mb-2 pb-2">Комментарий</h3>
    <p class="mb-3">{{ review.content }}</p>
  </div>
</template>

<script setup>
const { review } = defineProps(["review"]);
</script>

<style scoped>
.review-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
}
</style>
