import type { IUser } from "~/@types/user";

export const USER_NAMESPACE = "user-store-namespace";

export const fetchUserBaseUri = "http://localhost:8080/users";

export const useUserStore = defineStore(USER_NAMESPACE, () => {
  const userInfo: Ref<IUser | null> = ref(null);
  const token = useCookie("token");

  const getUserInfo = async () => {
    if (token.value) {
      console.log(token.value);
      const { data } = await useFetch(fetchUserBaseUri, {
        key: new Date().toString() + "check",
        headers: {
          Authorization: "Bearer " + token.value,
        },
      });

      userInfo.value = data as unknown as IUser;
    }
  };

  watch(token, async () => {
    await getUserInfo();
  });

  return {
    userInfo,
    getUserInfo,
  };
});
