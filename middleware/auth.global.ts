import { useUserStore } from "@/stores";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");
  const userStore = useUserStore();

  const { userInfo } = toRefs(userStore);

  if (!token.value) {
    return navigateTo("/auth");
  }

  if (!userInfo.value) {
    await userStore.getUserInfo();
    return;
  }
});
