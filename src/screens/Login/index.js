import { useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useSetRecoilState } from "recoil";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";

import { dadosState } from "../../recoil/atoms/dados.js";

export default function Login() {
  const setUser = useSetRecoilState(dadosState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const login = async () => {
    try {
      const data = await axios.post("http://191.52.55.168:19003/api/token/");
      setUser({
        loggedIn: true,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
      await SecureStore.setItemAsync("access_token", data.access_token);
    } catch (error) {
      setUser({ loggedIn: false, access_token: null, refresh_token: null });
      setErrorMsg("Usuário ou senha inválidos!");
      await SecureStore.deleteItemAsync("access_token");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => login()} />
      <Text>{errorMsg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
