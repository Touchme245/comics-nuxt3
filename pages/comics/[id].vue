<template>
  <div>
    <ComicDetails :comic="comic" />
  </div>
  <div>Отзывы</div>
  <!-- <div v-for="review in reviews">
    <ReviewCard :review="review" />
  </div> -->
</template>

<script setup>
const { id } = useRoute().params;

definePageMeta({
  layout: "comics",
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

// const reviewsUri = "http://localhost:8080/reviews/" + id;
// const { data: reviews } = await useFetch(reviewsUri, { key: id });
</script>

<style lang="scss" scoped></style>
