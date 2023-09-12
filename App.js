import { RecoilRoot } from "recoil";
import { StatusBar } from "expo-status-bar";

import Main from "./src/routes.js";

export default function App() {
  
  return (
    <RecoilRoot>
      <Main />
      <StatusBar style="auto" />
    </RecoilRoot>
  );
}
