import { atom, useRecoilState } from "recoil";
import { AsyncStorage } from "react-native";
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
    token: null,
    isAdmin: false,
    isLogged: false,
    userId: "",
  },
});

export const setToken = async (newToken) => {
  const [auth, setAuth] = useRecoilState(authState);

  // Função para extrair o payload do token e obter o userId
  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.user_id || "";
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return "";
    }
  };

  // Calcular o userId
  const userId = getUserIdFromToken(newToken);

  setAuth({
    ...auth,
    token: newToken,
    isAdmin: newToken ? getUserIdFromToken(newToken).isAdmin : false,
    isLogged: !!newToken,
    userId: userId,
  });

  try {
    await AsyncStorage.setItem("token", newToken);
  } catch (error) {
    console.error("Erro ao salvar o token:", error);
  }
};
