<template>
  <div>
    <GroupDetails :group="group" />
  </div>

  <div class="grid grid-cols-1 gap-10">
    <div>
      <DiscussionsCreateDiscussionForm :id="id" :refresh="refresh" />
    </div>
    <div v-for="discussion in discussions">
      <DiscussionCard
        :discussion="discussion"
        :userInfo="userInfo"
        :refresh="refresh"
      />
    </div>
  </div>
</template>

<script setup>
import DiscussionCard from "~/components/discussions/DiscussionCard.vue";
import GroupDetails from "~/components/groups/GroupDetails.vue";
import { useUserStore } from "@/stores";

const { id } = useRoute().params;

const uri = "http://localhost:8080/groups/" + id;
const { data: group } = await useFetch(uri, { key: id });
const token = useCookie("token");

if (!group.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Группа не найден(",
    fatal: true,
  });
}

const discussionUri = "http://localhost:8080/discussions/group/" + id;
const { data: discussions, refresh } = await useFetch(discussionUri, {
  key: new Date().toString(),
});

const { userInfo } = toRefs(useUserStore());

console.log(userInfo);
</script>

<style scoped></style>
