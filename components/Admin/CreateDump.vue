<template>
  <div class="button-container">
    <button @click="createDump" type="button" class="btn">Создать дамп</button>
    <button @click="applyDump" type="button" class="btn">Применить дамп</button>
  </div>

  <div v-if="showModal">
    <h2>Ответ</h2>
    <p>{{ createDumpResp }}</p>
    <button @click="showModal = false" class="close-btn">Закрыть</button>
  </div>

  <div v-if="showApply">
    <h2>Ответ</h2>
    <p>{{ applyDumpResp }}</p>
    <button @click="showApply = false" class="close-btn">Закрыть</button>
  </div>
</template>

<script setup>
const createDumpUri = "http://localhost:8080/admin/createDump";
const applyDumpUri = "http://localhost:8080/admin/applyDump";
const token = useCookie("token");

const showModal = ref(false);
const createDumpResp = ref("");

const showApply = ref(false);
const applyDumpResp = ref("");

const createDump = async () => {
  const response = await fetch(createDumpUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.value,
    },
  });

  if (response.ok) {
    createDumpResp.value = await response.text();
    showModal.value = true;
  } else {
    console.error("Ошибка при создании дампа:", response.statusText);
    createDumpResp.value = "Ошибка: " + response.statusText;
    showModal.value = true;
  }
};

const applyDump = async () => {
  const response = await fetch(applyDumpUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.value,
    },
  });

  if (response.ok) {
    applyDumpResp.value = await response.text();
    showApply.value = true;
  } else {
    console.error("Ошибка при создании дампа:", response.statusText);
    applyDumpResp.value = "Ошибка: " + response.statusText;
    showApply.value = true;
  }
};
</script>

<style scoped>
.button-container {
  display: flex; /* Используем Flexbox для выравнивания кнопок */
  gap: 10px; /* Отступ между кнопками */
}

.btn {
  background-color: #28a745; /* Зеленый цвет */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #218838; /* Темнее зеленый при наведении */
}

.close-btn {
  background-color: #dc3545; /* Красный цвет для кнопки закрытия */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
