import { atom } from "recoil";

export const authState = atom({
  key: "authEstado",
  default: {
    loggedIn: false,
    access: "",
    refresh: "",
  },
});
