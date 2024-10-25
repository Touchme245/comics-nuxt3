<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <img :src="backGroundImage" alt="animeee" class="mx-auto my-7" />
      </div>
      <div class="p-7">
        <h2 class="text-4xl my-7">{{ comic.title }}</h2>
        <p class="text-xl my-7">Дата релиза - {{ comic.releaseDate }}</p>
        <p class="text-xl my-7">Жанр - {{ comic.genre }}</p>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Описание</h3>
        <p class="mb-7">{{ comic.description }}</p>
        <p
          class="btn my-4 bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          @click="showForm = true"
        >
          Оценить
        </p>
      </div>
      <div v-if="showForm" class="p-4">
        <h2 class="text-2xl font-bold mb-4">Оцените комикс</h2>

        <div class="mb-4">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="rating"
            >Оценка</label
          >
          <input
            id="rating"
            type="number"
            v-model="rating"
            min="1"
            max="5"
            placeholder="Введите оценку 1-5"
            class="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div class="mb-4">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="comment"
            >Комментарий</label
          >
          <textarea
            id="comment"
            v-model="content"
            placeholder="Введите комментарий"
            class="border border-gray-300 rounded-md p-2 w-full"
          ></textarea>
        </div>

        <div class="flex space-x-2">
          <button
            class="btn bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            @click="submitForm"
          >
            Отправить
          </button>
          <button
            class="btn bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            @click="showForm = false"
          >
            Отменить
          </button>
        </div>
      </div>
      <div v-if="successReview" class="mt-4 text-green-600">
        Вы успешно оставили отзыв
        <button
          @click="proceedSuccess"
          class="btn bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Закрыть
        </button>
      </div>
    </div>
    <div class="text-xl">{{ comic.content }}</div>
  </div>
</template>

<script setup>
const { comic } = defineProps(["comic"]);

const showForm = ref(false);
const rating = ref(null);
const content = ref("");
const createReviewUri = "http://localhost:8080/reviews";
const successReview = ref(false);

const router = useRouter();

const proceedSuccess = () => {
  successReview = false;
  showForm = false;
  router.push("comic/" + comic.id);
};

const submitForm = async () => {
  const data = {
    comicId: comic.id,
    rating: rating.value,
    content: content.value,
  };
  await createReview(data);
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const createReview = async (data) => {
  const response = await fetch(createReviewUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  this.showForm = false;
  this.rating = null;
  this.reviewContent = "";
  successReview = true;
};

const backGroundImage =
  "https://p4.wallpaperbetter.com/wallpaper/400/321/251/eromanga-sensei-anime-girls-izumi-sagiri-anime-wallpaper-preview.jpg";
</script>

<style scoped>
img {
  max-width: 400px;
}
</style>
