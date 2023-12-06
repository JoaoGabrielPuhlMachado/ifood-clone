import { atom, useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

export const authState = atom({
  key: "authEstado",
  default: {
    token: "",
    isLogged: false,
    refresh: "",
    userId: "",
    tipo_usuario: "",
  },
});

export function useAuth() {
  const [auth, setAuth] = useRecoilState(authState);
  const setToken = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);

      const decodedToken = jwt_decode(token);

      if (decodedToken) {
        const { user_id } = decodedToken;
        const { tipo_usuario } = decodedToken;
        // console.log(decodedToken)
        setAuth({
          token,
          isLogged: true,
          userId: user_id,
          tipo_Usuario: tipo_usuario,
        });
      } else {
        console.error("Erro ao decodificar o token.");
      }
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
