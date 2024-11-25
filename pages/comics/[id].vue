<template>
  <div>
    <ComicDetails :comic="comic" :refresh="refresh" />
  </div>
  <div>Отзывы</div>
  <div v-for="review in reviews">
    <ReviewCard :review="review" :userInfo="userInfo" :refresh="refresh" />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores";

const { id } = useRoute().params;
const token = useCookie("token");
definePageMeta({
  layout: "default",
});

const { userInfo } = toRefs(useUserStore());

const uri = "http://localhost:8080/comics/" + id;
const { data: comic } = await useFetch(uri, { key: id.toString() });

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
</script>

<style lang="scss" scoped></style>
