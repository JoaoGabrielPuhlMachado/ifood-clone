import { RecoilRoot } from "recoil";
import { StatusBar } from "expo-status-bar";

import Routes from "./src/routes";

export default function App() {
  return (
    <RecoilRoot>
      <StatusBar style="auto" />
      <Routes />
    </RecoilRoot>
  );
}
