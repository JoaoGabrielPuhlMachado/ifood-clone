import { atom } from "recoil";

export const dadosState = atom({
  key: "dadosEstado",
  default: {
    categorias: [],
    marcas: [],
    produtos: [],
    loggedIn: false,
    access_token: null,
    refresh_token: null,
  },
});
