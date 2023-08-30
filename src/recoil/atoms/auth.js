import { atom } from "recoil";

export const authState = atom({
  key: "authEstado",
  default: {
    loggedIn: false,
    access_token: "",
    refresh_token: "",
  },
});
