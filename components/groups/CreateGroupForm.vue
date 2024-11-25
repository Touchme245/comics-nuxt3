<template>
  <div class="card">
    <form v-if="newGroup" @submit.prevent="submitForm" class="form-container">
      <label for="groupName" class="form-label">Название группы</label>
      <input
        id="groupName"
        v-model="name"
        type="text"
        placeholder="Введите название группы"
        required
        class="form-input"
      />

      <label for="groupDescription" class="form-label">Описание</label>
      <input
        id="groupDescription"
        v-model="description"
        type="text"
        placeholder="Введите описание"
        required
        class="form-input"
      />

      <div class="button-container">
        <button type="submit" class="btn create-btn">Создать</button>
        <button type="button" class="btn cancel-btn" @click="newGroup = false">
          Отменить
        </button>
      </div>
    </form>

    <div v-if="!newGroup">
      Не нашли нужную группу - создайте собственную
      <p v-if="!newGroup" class="btn" @click="newGroup = true">Создать</p>
    </div>
  </div>
</template>

<script setup>
const newGroup = ref(false);
const name = ref("");
const description = ref("");
const token = useCookie("token");
const createGroupUri = "http://localhost:8080/groups";

const { refresh } = defineProps(["refresh"]);

const submitForm = async () => {
  const data = {
    name: name.value,
    description: description.value,
  };

  await createGroup(data);
};

const createGroup = async (data) => {
  const response = await fetch(createGroupUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.value,
    },
    body: JSON.stringify(data),
  });
  newGroup.value = false;
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
  max-width: 400px;
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
