<template>
  <div class="form-wrapper">
    <form @submit.prevent="submitForm" class="form-container">
      <input
        v-model="text"
        type="text"
        placeholder="Введите текст"
        required
        class="form-input"
      />
      <button type="submit" class="btn bg-[#12b488]">Изменить</button>
    </form>
  </div>
</template>

<script setup>
const { discussion, refresh } = defineProps(["discussion", "refresh"]);
const token = useCookie("token");
const text = ref("");

const updateDiscussionUri = "http://localhost:8080/discussions";

const submitForm = async () => {
  const data = {
    text: text.value,
    id: discussion.id,
  };
  await updateDiscussion(data);
};

const updateDiscussion = async (data) => {
  const response = useFetch(updateDiscussionUri, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.value,
    },
    body: JSON.stringify(data),
  });

  if (!response) {
    console.log(response);
    throw createError({
      statusCode: 450,
      statusMessage: "что то пошло не так(",
      fatal: true,
    });
  }
  console.log(JSON.stringify(refresh));

  await refresh();
};
</script>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
}

.form-title {
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
}

.btn {
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: rgb(29, 201, 107);
}
</style>
