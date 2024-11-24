<template>
  <div
    class="card text-left review-card"
    style="
      border-radius: 10px;
      background-color: #f9f9f9;
      padding: 15px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    "
  >
    <p class="font-bold m-2 truncate">
      {{ review.user.username }}
    </p>
    <p class="font-bold text-gray-500 m-2 truncate">
      Оценка: {{ review.rating }}
    </p>
    <h3 class="font-bold text-gray-500 pb-2">Комментарий:</h3>
    <p class="mb-3">{{ review.comment }}</p>
    <button
      v-if="
        (userInfo.role == 'ADMIN' ||
          userInfo.username == review.user.username) &&
        !isUpdate
      "
      class="btn"
      @click="isUpdate = true"
    >
      редактировать
    </button>
    <div v-if="isUpdate">
      <UpdateReviewForm :review="review" :refresh="refresh" />
    </div>
    <button
      v-if="
        (userInfo.role == 'ADMIN' ||
          userInfo.username == review.user.username) &&
        isUpdate
      "
      class="btnd btn-cancel"
      @click="isUpdate = false"
    >
      отмена
    </button>
    <button
      v-if="
        (userInfo.role == 'ADMIN' ||
          userInfo.username == review.user.username) &&
        isUpdate
      "
      class="btnd btn-cancel"
      @click="deleteReview"
    >
      удалить
    </button>
  </div>
</template>

<script setup>
import UpdateReviewForm from "./reviews/UpdateReviewForm.vue";
import { useUserStore } from "@/stores";

const isUpdate = ref(false);
const token = useCookie("token");

const { review, refresh } = defineProps(["review", "refresh"]);

const { userInfo } = toRefs(useUserStore());
const deleteReviewUri = "http://localhost:8080/reviews/" + review.id;
const deleteReview = async () => {
  const response = await useFetch(deleteReviewUri, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.value,
    },
  });

  await refresh();
};
</script>

<style scoped>
.review-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
}

.btnd {
  color: white;
  border: none;
  padding: 20px 20; /* Отступы для кнопки */
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s;
  width: 100%; /* Задаем ширину кнопки */
  max-width: 170px; /* Максимальная ширина кнопки */
  display: block;
  margin-bottom: 10px;
}

.btn-cancel {
  background-color: #dc3545; /* Красный цвет для кнопки отмены */
}
</style>
