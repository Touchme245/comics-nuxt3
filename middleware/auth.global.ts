import { useUserStore } from "@/stores";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");
  const userStore = useUserStore();

  const { userInfo } = storeToRefs(userStore);

  if (!token.value && to.path !== "/auth") {
    return navigateTo("/auth");
  }

  if (!userInfo.value) {
    await userStore.getUserInfo();
  }

  return;
});
