<template>
  <div class="form-wrapper">
    <form @submit.prevent="submitForm" class="form-container">
      <div class="form-group">
        <label for="rating" class="form-label">Оценка (1-5):</label>
        <input
          id="rating"
          v-model="rating"
          type="number"
          min="1"
          max="5"
          required
          class="form-input"
        />
      </div>
      <div class="form-group">
        <p for="comment" class="form-label">Комментарий:</p>
        <textarea
          id="comment"
          v-model="comment"
          placeholder="Введите комментарий"
          class="form-textarea"
        ></textarea>
      </div>
      <button type="submit" class="btn bg-[#12b488]">Изменить</button>
    </form>
  </div>
</template>

<script setup>
const rating = ref(null);
const comment = ref("");

const { review, refresh } = defineProps(["review", "refresh"]);

const updateReviewUri = "http://localhost:8080/reviews";

const token = useCookie("token");

const submitForm = async () => {
  const data = {
    reviewId: review.id,
    rating: rating.value,
    comment: comment.value,
  };

  await updateReview(data);
};

const updateReview = async (data) => {
  const response = useFetch(updateReviewUri, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.value,
    },
    body: JSON.stringify(data),
  });

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
