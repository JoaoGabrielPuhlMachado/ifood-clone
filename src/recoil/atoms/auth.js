import { atom } from "recoil";

export const atualizarState = atom({
  key: "atualizar",
  default: {
    isLoading: true,
    loggedIn: false,
    access_token: null,
    refresh_token: null,
    categorias: [],
    marcas: [],
    produtos: [],
  },
});
