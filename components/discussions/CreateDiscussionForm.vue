<template>
  <div class="discussion-container">
    <form
      v-if="newDiscussion"
      @submit.prevent="submitForm"
      class="form-container"
    >
      <label for="text" class="form-label">Текст</label>
      <input
        id="text"
        v-model="text"
        type="text"
        placeholder="Введите текст"
        required
        class="form-input"
      />

      <div class="button-container">
        <button type="submit" class="btn create-btn">Создать</button>
        <button
          type="button"
          class="btn cancel-btn"
          @click="newDiscussion = false"
        >
          Отменить
        </button>
      </div>
    </form>

    <p v-if="!newDiscussion">Создать тему</p>
    <p v-if="!newDiscussion" class="btn" @click="newDiscussion = true">
      Создать
    </p>
  </div>
</template>

<script setup>
const text = ref("");
const token = useCookie("token");
const createDiscussionUri = "http://localhost:8080/discussions";
const newDiscussion = ref(false);
const { id, refresh } = defineProps(["id", "refresh"]);

const submitForm = async () => {
  const data = {
    groupId: id,
    text: text.value,
  };
  await createDiscussion(data);
};

const createDiscussion = async (data) => {
  const response = await fetch(createDiscussionUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.value,
    },
    body: JSON.stringify(data),
  });
  newDiscussion.value = false;

  if (!response) {
    throw createError({
      statusCode: 450,
      statusMessage: "что то пошло не так(",
      fatal: true,
    });
  }

  await refresh();
};
</script>

<style scoped>
.discussion-container {
  margin-top: 20px; /* Отступ сверху для контейнера */
  text-align: left; /* Выравнивание текста по левому краю */
}

.form-container {
  border-radius: 15px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px; /* Максимальная ширина формы */
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #007bff;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-btn {
  background-color: #28a745;
  color: white;
}

.create-btn:hover {
  background-color: #218838;
}

.cancel-btn {
  background-color: red;
  color: white;
}

.cancel-btn:hover {
  background-color: darkred;
}
</style>
