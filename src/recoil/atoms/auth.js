import { atom, useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export const authState = atom({
  key: "authEstado",
  default: {
    token: "",
    isAdmin: false,
    isLogged: false,
    userId: "",
  },
});

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export function useAuth() {
  const [auth, setAuth] = useRecoilState(authState);

  const setToken = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);

      const splittedToken = parseJwt(token);
      setAuth({
        token,
        isAdmin: splittedToken.isAdmin,
        isLogged: true,
        userId: splittedToken.user_id,
      });
    } catch (error) {
      console.error("Erro ao armazenar o token:", error);
    }
  };

  const getTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.error("Erro ao recuperar o token:", error);
      return null;
    }
  };

  return { auth, setToken, getTokenFromStorage };
}
