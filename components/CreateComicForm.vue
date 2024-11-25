<template>
  <div class="card">
    <form v-if="newComic" @submit.prevent="submitForm" class="form-container">
      <label for="title" class="form-label">Название комикса</label>
      <input
        id="title"
        v-model="title"
        type="text"
        placeholder="Введите название комикса"
        required
        class="form-input"
      />
      <p>Заполните информацию о авторе</p>

      <label for="firstName" class="form-label">Имя</label>
      <input
        id="firstName"
        v-model="firstName"
        type="text"
        placeholder="Введите имя"
        required
        class="form-input"
      />

      <label for="lastName" class="form-label">Фамилия</label>
      <input
        id="lastName"
        v-model="lastName"
        type="text"
        placeholder="Введите фамилию"
        required
        class="form-input"
      />

      <label for="pseudonym" class="form-label">Псевдоним</label>
      <input
        id="pseudonym"
        v-model="pseudonym"
        type="text"
        placeholder="Введите псевдоним"
        required
        class="form-input"
      />

      <label for="biography" class="form-label">Биография</label>
      <input
        id="biography"
        v-model="biography"
        type="text"
        placeholder="Введите биографию"
        required
        class="form-input"
      />

      <label for="genre" class="form-label">Жанр</label>
      <input
        id="genre"
        v-model="genre"
        type="text"
        placeholder="Введите жанр"
        required
        class="form-input"
      />

      <label for="releaseDate" class="form-label">Дата создания</label>
      <input
        id="releaseDate"
        v-model="releaseDate"
        type="date"
        placeholder="Введите дату создания"
        required
        class="form-input"
      />

      <label for="description" class="form-label">Описание</label>
      <input
        id="description"
        v-model="description"
        type="text"
        placeholder="Введите описание"
        required
        class="form-input"
      />

      <label for="content" class="form-label">Содержание</label>
      <textarea
        id="content"
        v-model="content"
        placeholder="Введите содержание"
        required
        class="form-input"
        rows="5"
      ></textarea>

      <div class="button-container">
        <button type="submit" class="btn create-btn">Создать</button>
        <button type="button" class="btn cancel-btn" @click="newComic = false">
          Отменить
        </button>
      </div>
    </form>

    <div v-if="!newComic">
      Создайте свой собственный комикс - порадуйте людей
      <p v-if="!newComic" class="btn" @click="newComic = true">Создать</p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores";
const { refresh } = defineProps(["refresh"]);
const token = useCookie("token");
const { userInfo } = toRefs(useUserStore());
const title = ref("");
const firstName = ref("");
const lastName = ref("");
const pseudonym = ref("");
const biography = ref("");
const genre = ref("");
const releaseDate = ref(null);
const description = ref("");
const content = ref("");
const newComic = ref(false);

const submitForm = async () => {
  const data = {
    title: title.value,
    author: {
      firstName: firstName.value,
      lastName: lastName.value,
      pseudonym: pseudonym.value,
      biography: biography.value,
    },
    genre: genre.value,
    releaseDate: releaseDate.value,
    description: description.value,
    content: content.value,
  };
  await createComic(data);
};
const createComicUri = "http://localhost:8080/comics";
const createComic = async (data) => {
  const response = await useFetch(createComicUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.value,
    },
    body: JSON.stringify(data),
  });
  newComic.value = false;
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
.form-container {
  border-radius: 15px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 70%;
  margin: auto;
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
