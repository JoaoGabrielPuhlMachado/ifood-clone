import { atom } from "recoil";

export const dadosState = atom({
  key: "dados",
  default: {
    categorias: [],
    marcas: [],
    produtos: [],
  },
});
