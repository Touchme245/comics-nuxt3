<template>
  <div>
    <ComicDetails :comic="comic" :refresh="refresh" />
  </div>
  <div>Отзывы</div>
  <div v-for="review in reviews">
    <ReviewCard :review="review" :userInfo="userInfo" :refresh="refresh" />
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const token = useCookie("token");
definePageMeta({
  layout: "default",
});

const uri = "http://localhost:8080/comics/" + id;
const { data: comic } = await useFetch(uri, { key: id });

if (!comic.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Комикс не найден(",
    fatal: true,
  });
}

const reviewsUri = "http://localhost:8080/reviews/" + id;
const { data: reviews, refresh } = await useFetch(reviewsUri, {
  key: new Date().toString(),
});

const userInfoUri = "http://localhost:8080/users";
const { data: userInfo } = await useFetch(userInfoUri, {
  key: new Date().toString() + "check",
  headers: {
    Authorization: "Bearer " + token.value,
  },
});

console.log(reviews.value, comic.value);
</script>

<style lang="scss" scoped></style>
