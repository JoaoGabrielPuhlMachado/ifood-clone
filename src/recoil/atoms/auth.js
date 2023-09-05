import { atom, useRecoilState } from "recoil";
import { AsyncStorage } from "react-native";

export const authState = atom({
  key: "authEstado",
  default: {
    token: null,
    isAdmin: false,
    isLogged: false,
    userId: "",
  },
});

export const setToken = async (newToken) => {
  const [auth, setAuth] = useRecoilState(authState);
  setAuth({
    ...auth,
    token: newToken,
    isAdmin: newToken
      ? JSON.parse(atob(newToken.split(".")[1])).isAdmin
      : false,
    isLogged: !!newToken,
    userId: newToken ? JSON.parse(atob(newToken.split(".")[1])).user_id : "",
  });
  try {
    await AsyncStorage.setItem("token", newToken);
  } catch (error) {
    console.error("Erro ao salvar o token:", error);
  }
};
