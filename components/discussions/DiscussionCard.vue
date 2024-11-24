<template>
  <div
    class="card text-left discussion-card"
    style="
      border-radius: 10px;
      background-color: #f9f9f9;
      padding: 15px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    "
  >
    <p class="font-bold m-2 truncate">
      {{ discussion.creator.username }}
    </p>
    <h3 class="font-bold text-gray-500 pb-2">Тема:</h3>
    <p class="mb-3">{{ discussion.text }}</p>
    <button
      v-if="
        (userInfo.role == 'ADMIN' ||
          userInfo.username == discussion.creator.username) &&
        !isUpdate
      "
      class="btn"
      @click="isUpdate = true"
    >
      редактировать
    </button>

    <div v-if="isUpdate">
      <UpdateDiscussionForm :discussion="discussion" :refresh="refresh" />
    </div>
    <button
      v-if="
        (userInfo.role == 'ADMIN' ||
          userInfo.username == discussion.creator.username) &&
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
          userInfo.username == discussion.creator.username) &&
        isUpdate
      "
      class="btnd btn-cancel"
      @click="deleteDiscussion"
    >
      удалить
    </button>
  </div>
</template>

<script setup>
import UpdateDiscussionForm from "./UpdateDiscussionForm.vue";
import { useUserStore } from "@/stores";
const token = useCookie("token");
const { discussion, refresh } = defineProps(["discussion", "refresh"]);
const { userInfo } = toRefs(useUserStore());
console.log(userInfo.role);

const isUpdate = ref(false);

const deleteDiscussionUri =
  "http://localhost:8080/discussions/" + discussion.id;
const deleteDiscussion = async () => {
  const response = await useFetch(deleteDiscussionUri, {
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
.discussion-card {
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
  max-width: 200px; /* Максимальная ширина кнопки */
  display: block;
  margin-bottom: 10px;
}

.btn-cancel {
  background-color: #dc3545; /* Красный цвет для кнопки отмены */
}

.btn-cancel:hover {
  background-color: #c82333; /* Темно-красный цвет при наведении */
}
</style>
